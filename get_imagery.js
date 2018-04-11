// Download NYC landsat 8 data with cloud mask for 2016. Export to Google Drive.

// Load Landsat 8 surface reflectance data


// Function to cloud mask from the Fmask band of Landsat 8 SR data.
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = ee.Number(2).pow(3).int();
  var cloudsBitMask = ee.Number(2).pow(5).int();

  // Get the pixel QA band.
  var qa = image.select('pixel_qa');

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));

  // Return the masked image, scaled to [0, 1].
  return image.updateMask(mask).divide(10000);
}

// Map the function over one year of data and take the median.
var composite = l8sr.filterDate('2016-01-01', '2016-12-31')
                    .map(maskL8sr)
                    .median();

// Display the results.
Map.addLayer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.2});

// Print details to console
print(composite)

// Export the image, specifying scale and region.
Export.image.toDrive({
  image: composite,
  description: 'NYC_test',
  scale: 30,
  region: geometry2
});


