# Project3-C is for Cool

# Career Analysis: Data Science
## Project Summary
<p> As participants of the GT Data Science Bootcamp, we all have a vested interest in the demand for Data Science careers. We would like to build a dashboard that allows users to see a breakdown of the different types of job titles in the Data Science field, where these jobs are located, the range of salaries associated with these jobs, and whether the jobs require entry, mid, senior or executive level skills.</p>

## System Requirements
* Visual Studio Code
* JS Libraries
  - Sencha
* PostgreSQL/pgAdmin 
* Python dictionaries
    - csv
    - sqlalchemy
    - psycopg2
    - pandas
    - flask
* Misc. files
	- db_pw (python file - app.py with database password)

## Resources
* <p><a href="https://github.com/DavidNguyen246/Data-Science-Job-Market.git">GitHub Repository</a></p>
* Datasets:
  - <p><a href="https://www.kaggle.com/datasets/ruchi798/data-science-job-salaries">Data Science Job Science Salaries 2000-2022</a> (Static CSV)</p>
  - <p><a href="https://developers.google.com/public-data/docs/canonical/countries_csv">Country Codes, Longitudes & Latitudes</a
 


## Group Members
* Robert Benedict
* Kelly Brown
* Hector Custodio
* Angele Gueupi
* Miranda Hermes
* Kafayat Lawal
* David Nguyen
* Emmanuel Okecha
* Krishna Reddy
* William Tecchio
* Preethi Vontela

## General Tasks
* Database Setup 
  - Created with Python Flask (app.py)
  - 1 Table Created - DS_salaries 
    	- See Tables section below
  - 2 CSV files merged
    - <p><a href="https://www.kaggle.com/datasets/ruchi798/data-science-job-salaries">Data Science Job Science Salaries 2000-2  2022</a> (Static CSV)</p>
    - <p><a href="https://developers.google.com/public-data/docs/canonical/countries_csv">Country Codes, Longitudes & Latitudes</a)
  - jsonify data in table for HTML
    
* Table Creation
  - DS_salaries table created </p>
  -<img src="add png">
  -Merged csv files
  <p>For this table, the two csv files were merged. To start off, the data is extracted from data_science_jobs_salries.csv into a Pandas dataframe, and the countries.csv by matching the common data in the Country column. This allowed the country codes, longitudes, and latitudes to be added to the DS_salaries table..</p>

* Dashboard Creation

* Visualization of Data 
    - Created 6 visualizations: We created 3 angled pie charts that show the relationship between data analyst job titles and salary, based on the year the informaton was collected. We also created a horizontal bar graph to show the impact of experience level on the number of jobs available to a data analyst, followed by a donut graph to show data analyst salary by country location. Lastly, we created a front-facing pie chart to show the ratio of remote jobs by country location.
      
* Final Analysis

## Final Analysis
*  **Salary by Title and Year**:
    - In **2020**, data analysts with the title, "Director of Data Science," received the highest chunk of the data analyst salaries, at 325K in average salary. This is followed by Machine Learning Scientists, who received 260K in average salary. This suggests that Directors of Data Science and Machine Learning Scientists were the most valued positions in that year.
    - In **2021**, data analysts with the title, "Financial Data Analyst," received the highest chunk of the data analyst salaries, at 450K in average salary, followed by Principal Data Engineers, who earned an average salary of 328.33K
    - In **2022**, these positions were replaced in the salary higherarchy by "Data Analytics Lear" and "Applied Data Scientist."
* **Count of Job Titles by Experience**: The majority of data analyst jobs are for those with senior level experience. There were 280 jobs at the Senior Level, compared to just 88 jobs at the entry level. This shows that data analysis is a career path that greatly favors those with higher levels of experience and that may be difficult to enter as an entry level analyst.
* **Salary by Country Location**: The highest paid of data analystis jobs can be found in Russia, with an average salary of 157.5K USD, followed by the US, with an average salary of 144.06K USD. This suggests the the US and Russia are two of the best paid locations to begin a data analysis career.
* **Count of remote_ratio by company_location**: The vast majority of jobs with remote options are in the US. In fact, our graph shows that the US holds 58.6% of all jobs that offer remote options. This is followed by Canada with 3.1% of the world's remote option jobs for data analysis. Our findings suggest that the US is the place to work if one hopes to be employed remotely.

## Final Presentation Slides
* https://docs.google.com/presentation/d/1DBIxSaptbP6Z7S6zVQo1kIMmUOZZiQHWFz4e4vPYKsc/edit?usp=sharing
