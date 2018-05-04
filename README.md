# Urban Land Use Classification From Satellite Imagery

### Team Members

- Nicholas Jones
- Gaurav Bhardwaj
- Gerardo Rodríguez Vázquez 
- Sunglyoung Kim

### Abstract

In this paper, we use machine learning to address a key challenge faced by the urban planning community: a shortage of consistent and usable information on land use patterns. Regulating land use is the raison d'être of urban planners. Through zoning regulations and long-range planning documents, they aim to shape urban growth towards favored patterns of spatial extent, density, and social or economic development.

### Modelling & Training

In this research, we evaluated several methods to acquire reference data for land-use classification of urban extent and density in the United States. We searched for existing detailed land-use maps in a fast-growing US region. A detailed land-use raster covering the greater Houston area for 2015 was acquired from the Texas GIS website. In Python, the pixel values were reclassified from the existing set of 10 categorical values (where 1-10 represented categories from open water through to dense urban areas, including varieties of non-urban land use such as wetlands and forest) to four categorical values: (1) open water; (2) urban: high density; (3) urban: low density; (4) non-urban land.

![](https://github.com/nj935/ML_proj/blob/master/images/1999_landcover.png)

Random Forest was trained on the image data for 2015. Structuring the problem as a supervised classification exercise, we trained the Random Forest using the reference image as target value (or 'label' for each pixel) and the Landsat pixel values as the feature space. We conducted a grid search to find key parameters that would optimize the classifier, specifically (i) number of trees; and (ii) maximum depth. Accuracy was found to improve with increasing numbers of trees up to 12 but tail off after then. Given limited computational budget, the team proceeded with a 12-tree Random Forest classifier.

![](https://github.com/nj935/ML_proj/blob/master/images/truth_blues.png)

We built a machine learning classifier to detect changes in urban extent and density over time, and applied this to Houston, Texas. Having applied the classifier to satellite images from 1999 to 2015, we see a pattern of expanding urban extent, particularly in the north-east suburbs. Areas such as the Highlands moved from non-urban to light urban, or light urban to dense urban.

### Results

![](https://github.com/nj935/ML_proj/blob/master/images/results.png)

The classifier achieves 76% accuracy based on a 6-fold cross validation. However, error rates are higher between certain category pairs. Water is rarely mis-categorized, as expected given its distinctive reflective signature. However, dense urban is frequently miscategorized as light urban, while light urban is frequently miscategorized as dense urban or non-urban. Our classifier performs better if the two urban categories are grouped together, restricting the task to merely distinguishing built-up area from non-built up. 