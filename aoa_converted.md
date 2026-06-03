# Laptop Price Intelligence System

Machine Learning Prediction & Advanced Algorithm Analysis

---

## Cover

**LAPTOP PRICE INTELLIGENCE SYSTEM**

*Machine Learning Prediction & Advanced Algorithm Analysis*

**SECTION A:** Machine Learning Pipeline

**SECTION B:** Advanced Algorithms & Data Structures

**Project summary**

- Course: Advanced Algorithms and Data Structures
- Programming Language: Python 3.x (Google Colab)
- Dataset: Laptop Specifications & Prices — 1,303 Records
- Target Variable: Laptop Price (Indian Rupees)
- Algorithms Implemented: 8 (Search, Sort, Hash, B-Tree Index)
- ML Models Trained: 3 (Linear Regression, Random Forest, Gradient Boosting)
- Year: 2025

---

## Table of Contents

1. Introduction
  - 1.1 Project Title
  - 1.2 Purpose of the Project
  - 1.3 Background and Motivation
  - 1.4 Problem Statement
  - 1.5 Proposed Solution
  - 1.6 Objectives
  - 1.7 Scope of the Project
2. Dataset Description
3. Methodology and Procedure
4. Code Explanation — Section A (Machine Learning)
5. Machine Learning Algorithms — Theory & Implementation
6. Code Explanation — Section B (Advanced Algorithms)
7. Algorithm Complexity Analysis
8. Results and Discussion
9. Complete Project Summary
10. How to Run the Project
11. Conclusion
12. References

---

# CHAPTER 1: INTRODUCTION

## 1.1 Project Title

**LAPTOP PRICE INTELLIGENCE SYSTEM: A Machine Learning and Advanced Algorithm Approach to Laptop Price Prediction and Smart Search**

## 1.2 Purpose of the Project

This project designs and implements a complete, end-to-end data science and algorithm engineering solution for two tightly connected real-world problems: laptop price prediction and intelligent laptop search. The system is built on a dataset of 1,303 real laptop listings and targets both theoretical understanding and practical utility.

The project pursues two primary goals:

- To train machine learning models that accurately predict laptop prices from hardware and software specifications, enabling buyers to detect over-priced listings and sellers to set competitive prices grounded in data rather than intuition.
- To implement and rigorously analyse a rich set of classic computer science algorithms — linear search, binary search, merge sort, quick sort, a custom hash table, and a B-Tree index — applied directly to real laptop data so that complex queries can be answered in milliseconds.

Together, these goals produce a project that is simultaneously practical (it generates real predictions and answers real queries) and educational (every algorithm is studied in terms of its time complexity, space complexity, and empirical execution time on real data).

## 1.3 Background and Motivation

The global laptop market is one of the most data-rich consumer product spaces on Earth. Millions of laptops are listed, compared, and purchased every day across e-commerce platforms, manufacturer websites, and price-aggregation engines. Despite this abundance of data, both buyers and sellers face persistent challenges rooted in information asymmetry and the sheer combinatorial complexity of laptop configurations.

A buyer comparing a 15.6-inch laptop with 16GB RAM and an Intel Core i7 processor against a similarly priced model from a different brand must mentally weigh dozens of specifications simultaneously — screen technology, storage type, graphics tier, operating system, build quality, and brand reputation — to determine whether the asking price is justified. Without computational tools, this process is slow, error-prone, and emotionally exhausting.

From the seller's perspective, pricing decisions carry significant financial stakes. A price set too high reduces conversion rates; a price set too low erodes margins. A machine learning model trained on thousands of real market prices creates an objective, data-driven anchor that removes guesswork from both sides of the transaction.

Any system that stores thousands of laptop records must answer queries efficiently. At scale this difference is the boundary between a product that scales and one that collapses under load.

## 1.4 Problem Statement

**CORE PROBLEM**

Given a dataset of 1,303 real laptop listings, each described by features including brand, processor model, RAM capacity, storage configuration, screen size, GPU, operating system, and weight:

1) Can we accurately predict the price of any laptop from its specifications using machine learning regression?
2) Can we implement a suite of efficient search, sort, hash, and index algorithms to enable fast and flexible querying of the dataset at scale?

Research questions include:

- Which regression algorithm — Linear Regression, Random Forest, or Gradient Boosting — produces the most accurate price predictions (R², RMSE, MAE)?
- How does search performance scale with dataset size, and by what factor does binary search outperform linear search in practice?
- How can a custom-built hash table deliver near-constant-time brand lookups, and what is the real collision rate on this dataset?
- Can a simplified B-Tree index support price-range queries significantly faster than brute-force scanning?
- Do measured execution times match Big-O theoretical predictions?

## 1.5 Proposed Solution

### Part A — Machine Learning Pipeline

Build a complete supervised ML pipeline: cleaning, outlier removal, categorical encoding, train-test split, feature scaling, train multiple models, evaluate and visualise. Best model returns predicted price in INR for given specs.

> Business Value: Enables buyers to verify listing fairness and sellers to anchor prices to data.

### Part B — Advanced Algorithm Engine

Implement eight algorithms from scratch in Python: searching (linear, binary), sorting (merge, quick), indexing (hash table, simplified B-Tree). Benchmark across dataset sizes (100, 300, 500, 1000) and compare empirical timings with Big-O.

> Educational Value: Demonstrates concrete speedups (e.g., binary search ~100× faster than linear search at n=1000).

## 1.6 Objectives

1. Explore and statistically characterise the laptop price dataset.
2. Clean and preprocess data: remove duplicates, handle missing values, remove outliers (IQR).
3. Encode categorical features for ML.
4. Train and compare Linear Regression, Random Forest, Gradient Boosting (R², RMSE, MAE).
5. Implement linear and binary search and measure performance.
6. Implement merge sort and quick sort and compare stability/memory.
7. Build custom hash table (separate chaining) for brand lookups.
8. Build simplified B-Tree index for price range queries (O(log n + k)).
9. Analyse time/space complexity of algorithms.
10. Visualise empirical performance and confirm theory.

## 1.7 Scope of the Project

| Scope Area | Detail |
|---|---|
| Dataset | 1,303 records with 12 features (brand, CPU, GPU, RAM, storage, OS, price) |
| Machine Learning | Supervised regression with scikit-learn on 80/20 split |
| Algorithm Families | Two searching, two sorting, hash table, B-Tree |
| Complexity Analysis | Big-O for best/avg/worst cases |
| Empirical Testing | Benchmark sizes: 100, 300, 500, 1000 |
| Visualisation | Charts for ML accuracy, residuals, algorithm scaling |
| Platform | Google Colab (pandas, numpy, scikit-learn, matplotlib, seaborn) |
| Out of Scope | Web UI, real-time scraping, neural networks, DB persistence |

---

# CHAPTER 2: DATASET DESCRIPTION

## 2.1 Dataset Overview

The dataset contains 1,303 rows and 12 columns representing laptop models and specifications.

| Property | Value |
|---|---|
| File Name | laptop.csv |
| Total Records | 1,303 laptops |
| Total Columns | 12 (including target Price) |
| Target Variable | Price (INR) |
| Missing Values | None confirmed after inspection |
| Duplicate Records | Identified and removed during preprocessing |
| Price Range | ~₹9,271 to ₹324,954 |
| Dataset Type | Tabular (numerical + categorical) |

## 2.2 Column-by-Column Description

The column descriptions include type, role, preprocessing and sample values (abridged):

- Unnamed: 0 — Integer — Index (Dropped)
- Company — String — Manufacturer (Apple, Dell, HP, ...)
- TypeName — String — Category (Ultrabook, Gaming, Notebook, ...)
- Inches — Float — Screen size (11.6, 13.3, 15.6, 17.3)
- ScreenResolution — String — Panel & resolution
- Cpu — String — CPU model/speed
- Ram — String → convert to numeric (4GB, 8GB, ...)
- Memory — String — Storage configuration (256GB SSD, 1TB HDD, ...)
- Gpu — String — Graphics unit
- OpSys — String — OS (Windows, macOS, No OS, ...)
- Weight — String → convert to float (1.37kg → 1.37)
- Price — Float — Target variable (₹)

## 2.3 Why This Dataset Is Suitable

- Scale: 1,303 records sufficient for regression and algorithm benchmarks.
- Feature Diversity: mix of numerical and categorical features.
- Target: continuous price — regression problem.
- Price variance: wide range forces meaningful learning.
- Intentional messiness: string-encoded RAM/Weight require preprocessing.

## 2.4 Data Quality Observations

| Column | Quality Issue | Preprocessing Required | Impact if Ignored |
|---|---|---|---|
| Ram | '8GB' strings | Strip 'GB' → int | Training fails on non-numeric |
| Weight | '1.37kg' strings | Strip 'kg' → float | Training fails |
| ScreenResolution | Long descriptive string | Label encode | Cannot be used otherwise |
| Cpu / Gpu | Descriptive strings | Label encode | Cannot be used otherwise |
| Memory | Mixed SSD/HDD strings | Label encode | Cannot be used otherwise |
| Company / TypeName / OpSys | Categorical labels | Label encode | Cannot be used otherwise |
| Unnamed: 0 | Redundant index | Drop | Adds noise |
| Price (Outliers) | Extreme values | IQR-based removal | Distorts regression |

Note: dataset has no missing values; main work is string->number conversion and encoding.

---

# CHAPTER 3: METHODOLOGY AND PROCEDURE

## 3.1 Overall Project Workflow

Key steps (23 total) condensed:

1. Install/import libraries
2. Mount Google Drive & load laptop.csv
3. Remove duplicates / impute missing
4. Remove price outliers (IQR)
5. Encode categorical features (LabelEncoder)
6. Train/test split (80/20)
7. Feature scaling (StandardScaler)
8. Train models: Linear, RandomForest, Gradient Boosting
9. Evaluate models (R², RMSE, MAE)
10. Generate 4-panel visualisation
11. Convert DataFrame → list of dicts for algorithm section
12–19. Implement & benchmark search/sort/hash/B-Tree algorithms
20–23. Produce comparison CSV, performance plots, use-case demos, final summary

## 3.2 Development Environment

- Platform: Google Colab
- Language: Python 3.x
- Notebook: .ipynb
- Dataset storage: Google Drive
- Execution: sequential; run Cell 1 then Cell 2 then rest
- GPU: not required
- Key libraries: pandas, numpy, scikit-learn, matplotlib, seaborn

---

# CHAPTER 4: CODE EXPLANATION — SECTION A (MACHINE LEARNING)

## 4.1 Cell 1 — Installing and Importing Libraries

Installs and imports: pandas, numpy, matplotlib, seaborn, scikit-learn utilities, time, warnings. Sets seaborn style and figure size.

Example code snippet:

```bash
!pip install pandas numpy scikit-learn matplotlib seaborn -q
```

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import time
import warnings
warnings.filterwarnings('ignore')
```

## 4.2 Cell 2 — Loading the Dataset

Mount Google Drive and load CSV:

```python
from google.colab import drive
drive.mount('/content/drive')

df = pd.read_csv('/content/drive/My Drive/Laptop_Price_Project/laptop.csv')
```

Checks performed: df.shape, df.dtypes, df.head(), df.isnull().sum(), df.describe().

## 4.3 Cell 3 — Data Preprocessing and Cleaning

Steps:

- Remove exact duplicate rows: df.drop_duplicates()
- Impute missing: median for numeric, mode for categorical
- Remove price outliers via IQR (Q1, Q3, IQR; keep rows within [Q1 − 1.5 IQR, Q3 + 1.5 IQR])

Rationale: median robust to outliers; IQR removes extreme target values that distort regression.

## 4.4 Cell 4 — Feature Engineering and Encoding

- Create df_ml = df.copy()
- Identify categorical columns (select_dtypes(include=['object']))
- For each categorical col (except Price), fit LabelEncoder and transform
- Save encoders to label_encoders dict

Note: df (original) kept for algorithm section where human-readable labels are needed.

## 4.5 Cell 5 — Train-Test Split and Feature Scaling

- X = df_ml.drop('Price', axis=1); y = df_ml['Price']
- train_test_split(X, y, test_size=0.2, random_state=42)
- StandardScaler: fit on X_train, transform X_train and X_test

Note: Tree-based models do not require scaling; Linear Regression uses scaled features.

## 4.6 Cell 6 — Training Three Machine Learning Models

- LinearRegression on scaled data (baseline)
- RandomForestRegressor(n_estimators=100) on unscaled data
- GradientBoostingRegressor(n_estimators=100) on unscaled data

Metrics collected: R², RMSE, MAE for each model.

## 4.7 Cell 7 — Performance Comparison

Assemble results into DataFrame, sort by R², pick best model.

## 4.8 Cell 8 — Visualizations

Produce 2×2 grid:

1. Actual vs Predicted scatter
2. Residuals plot
3. Model comparison (R² bars)
4. Error distribution histogram

---

# CHAPTER 5: MACHINE LEARNING ALGORITHMS — THEORY & IMPLEMENTATION

## 5.1 Linear Regression

- Model: linear combination Price = w1 x1 + ... + wn xn + b
- Training: closed-form or gradient descent
- Complexity: Training O(n × p²); Prediction O(p)
- Requires feature scaling

Pseudocode excerpt:

```text
FUNCTION LinearRegression.fit(X_train, y_train):
    W = (X^T X)^{-1} X^T y
```

## 5.2 Random Forest

- Ensemble of decision trees (bootstrap + feature subsampling)
- n_estimators=100, n_jobs=-1
- Robust, parallel training, typically high accuracy

## 5.3 Gradient Boosting

- Sequential tree-building to correct residuals
- Learning rate × n_estimators controls complexity
- Often highest accuracy, slower to train

---

# CHAPTER 6: CODE EXPLANATION — SECTION B (ADVANCED ALGORITHMS)

## 6.1 Data conversion

Convert DataFrame to list of dictionaries for algorithm implementations (id, price, Company, ram, memory, cpu).

## 6.2 Algorithm 1 — Linear Search

- Concept: scan every element, O(n)
- Use cases: brand lookup, price-range filtering

Example pseudocode and Python pattern provided in original notebook.

## 6.3 Algorithm 2 — Binary Search

- Requires sorted list by key (price)
- O(log n) time, O(1) space

## 6.4 Algorithm 3 — Merge Sort

- Divide & conquer, stable, O(n log n) always, O(n) space

## 6.5 Algorithm 4 — Quick Sort

- In-place partitioning, average O(n log n), worst O(n²)
- Pivot: middle element chosen for robustness

## 6.6 Algorithm 5 — Hash Table (djb2 + separate chaining)

- djb2 hash function, capacity ~100 chosen in example
- Average O(1) lookup; load factor and bucket scans discussed

## 6.7 Algorithm 6 — Simplified B-Tree Index

- Map price → list of laptops; keep sorted list of unique prices
- Range query: binary search lower bound + scan forward → O(log n + k)

---

# CHAPTER 7: ALGORITHM COMPLEXITY ANALYSIS

## 7.1 Big-O notation summary (examples)

| Notation | Name | Example |
|---|---|---|
| O(1) | Constant | Hash table lookup |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Linear search |
| O(n log n) | Linearithmic | Merge/Quick Sort |
| O(n²) | Quadratic | Bubble/Insertion Sort |

## 7.2 Complete algorithm complexity reference (abridged)

| Algorithm | Best | Average | Worst | Space | Stable? | Applied To |
|---|---:|---:|---:|---:|---:|---|
| Linear Search | O(1) | O(n) | O(n) | O(k) | N/A | Brand & range filtering |
| Binary Search | O(1) | O(log n) | O(log n) | O(1) | N/A | Exact price lookup |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | Sort by price |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No | Sort by RAM |
| Hash Table | O(1) avg | O(1) | O(n) worst | O(n) | N/A | Brand index |
| B-Tree range query | O(log n) | O(log n + k) | O(n) | O(k) | N/A | Price range queries |

## 7.3 Empirical testing

Benchmark sizes used: [100, 300, 500, 1000]. Measured linear/binary search and merge sort timings to confirm theory.

---

# CHAPTER 8: RESULTS AND DISCUSSION

## 8.1 Machine Learning Model Results (expected ranges)

| Model | Expected R² | Expected RMSE (₹) | Expected MAE (₹) | Rank |
|---|---:|---:|---:|---:|
| Gradient Boosting | 0.85–0.90 | 8,000–12,000 | 6,000–9,000 | 1 |
| Random Forest | 0.83–0.88 | 9,000–14,000 | 6,500–10,000 | 2 |
| Linear Regression | 0.55–0.70 | 18,000–25,000 | 13,000–19,000 | 3 |

Insight: ensemble methods outperform linear regression; RMSE ~₹8k–12k means the model flags large overpricing.

## 8.2 Algorithm Performance Results

- Binary Search: ≤10 iterations for n=1000; linear search up to 1000 iterations.
- Merge Sort: measured times grow ~n log n.
- Hash Table: average bucket size ~13 with capacity 100; near-constant lookup.
- B-Tree: range queries O(log n + k) — fast for narrow bands.

---

# CHAPTER 9: COMPLETE PROJECT SUMMARY

Section A (ML) and Section B (Algorithms) summaries list pipeline steps, algorithm types, and outputs (ml_results.png, algorithm_performance.png, algorithm_comparison.csv).

Key learning outcomes: data cleaning, encoding, train-test discipline, model training/comparison, algorithm implementation and empirical validation.

Possible extensions: richer feature engineering, hyperparameter tuning, k-fold CV, Streamlit web app, full B-Tree implementation, real-time scraping and retraining.

---

# CHAPTER 10: HOW TO RUN THE PROJECT

Requirements:

- Google Account, Web browser, laptop.csv uploaded to Google Drive (path: /content/drive/My Drive/Laptop_Price_Project/laptop.csv), stable internet
- Python 3.7+ (provided by Colab)

Step-by-step:

1. Upload laptop.csv to Google Drive in folder Laptop_Price_Project
2. Open Google Colab
3. Run Cell 1 (install/import)
4. Run Cell 2 (mount drive & load dataset)
5. Run remaining cells (or Run All)
6. Download output images/CSVs from Colab Files panel

Common fixes: adjust dataset path, re-run installation, print df.columns if columns mismatch, restart runtime to clear state.

---

# CHAPTER 11: CONCLUSION

The project integrates machine learning and algorithm engineering to produce a practical laptop price prediction system and a fast query engine. Ensemble models outperform linear regression; algorithmic choices yield orders-of-magnitude speedups. The report documents methods, theory, code patterns, and empirical evidence.

---

# CHAPTER 12: REFERENCES

Selected textbooks, library docs, and online resources (Cormen et al., Géron, Sedgewick, scikit-learn, pandas, djb2, Wikipedia pages, dataset origin notes).

---

Generated from `aoa.js` — extracted headings, paragraphs, lists, and tables into readable Markdown.
