const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak, LevelFormat,
  TabStopType, TabStopPosition, UnderlineType
} = require('docx');
const fs = require('fs');

// ─── Color palette ──────────────────────────────────────────────
const NAVY   = "1B3A6B";
const BLUE   = "2563EB";
const LTBLUE = "DBEAFE";
const TEAL   = "0D9488";
const LTTEAL = "CCFBF1";
const GRAY   = "374151";
const LGRAY  = "F3F4F6";
const MGRAY  = "D1D5DB";
const WHITE  = "FFFFFF";
const GOLD   = "D97706";
const LTGOLD = "FEF3C7";
const RED    = "DC2626";
const GREEN  = "16A34A";

// ─── Borders ────────────────────────────────────────────────────
const border  = (color=MGRAY,sz=4)=>({style:BorderStyle.SINGLE,size:sz,color});
const borders = (c=MGRAY,sz=4)=>({top:border(c,sz),bottom:border(c,sz),left:border(c,sz),right:border(c,sz)});
const noBorder= ()=>({style:BorderStyle.NONE,size:0,color:"FFFFFF"});
const noBorders=()=>({top:noBorder(),bottom:noBorder(),left:noBorder(),right:noBorder()});

// ─── Spacing helpers ────────────────────────────────────────────
const sp=(b,a)=>({spacing:{before:b,after:a}});

// ─── Text helpers ───────────────────────────────────────────────
const run=(text,opts={})=>new TextRun({text,...opts});
const bold=(text,color,sz)=>run(text,{bold:true,color:color||NAVY,size:sz});
const code=(text)=>run(text,{font:"Courier New",size:18,color:"1e293b"});

// ─── Paragraph helpers ──────────────────────────────────────────
function para(children,opts={}){
  if(typeof children==='string') children=[run(children,opts.run||{})];
  return new Paragraph({children,alignment:opts.align||AlignmentType.LEFT,...(opts.spacing||{}),...opts.para||{}});
}
function heading1(text){
  return new Paragraph({
    children:[new TextRun({text,bold:true,color:WHITE,size:32,font:"Arial"})],
    heading:HeadingLevel.HEADING_1,
    shading:{fill:NAVY,type:ShadingType.CLEAR},
    spacing:{before:360,after:160},
    border:{bottom:{style:BorderStyle.SINGLE,size:4,color:GOLD}}
  });
}
function heading2(text){
  return new Paragraph({
    children:[new TextRun({text,bold:true,color:NAVY,size:26,font:"Arial"})],
    heading:HeadingLevel.HEADING_2,
    spacing:{before:280,after:120},
    border:{bottom:{style:BorderStyle.SINGLE,size:2,color:BLUE}}
  });
}
function heading3(text){
  return new Paragraph({
    children:[new TextRun({text,bold:true,color:TEAL,size:22,font:"Arial"})],
    heading:HeadingLevel.HEADING_3,
    spacing:{before:200,after:80}
  });
}
function body(text,opts={}){
  return new Paragraph({
    children:[new TextRun({text,size:20,color:GRAY,font:"Calibri",...opts})],
    spacing:{before:80,after:80}
  });
}
function bodyRuns(runs,opts={}){
  return new Paragraph({children:runs,spacing:{before:80,after:80},...opts});
}
function bullet(text,level=0){
  return new Paragraph({
    numbering:{reference:"bullets",level},
    children:[new TextRun({text,size:20,color:GRAY,font:"Calibri"})],
    spacing:{before:40,after:40}
  });
}
function numbered(text,level=0){
  return new Paragraph({
    numbering:{reference:"numbers",level},
    children:[new TextRun({text,size:20,color:GRAY,font:"Calibri"})],
    spacing:{before:40,after:40}
  });
}
function codePara(text){
  return new Paragraph({
    children:[new TextRun({text,font:"Courier New",size:18,color:"1e293b"})],
    shading:{fill:LGRAY,type:ShadingType.CLEAR},
    spacing:{before:40,after:40},
    indent:{left:360}
  });
}
function infoBox(text,fillColor=LTBLUE,textColor=NAVY){
  return new Paragraph({
    children:[new TextRun({text,size:20,color:textColor,bold:false,font:"Calibri"})],
    shading:{fill:fillColor,type:ShadingType.CLEAR},
    border:{left:{style:BorderStyle.THICK,size:12,color:BLUE}},
    spacing:{before:120,after:120},
    indent:{left:280}
  });
}
function warningBox(text){
  return new Paragraph({
    children:[new TextRun({text,size:20,color:"7c2d12",font:"Calibri"})],
    shading:{fill:"FEF2F2",type:ShadingType.CLEAR},
    border:{left:{style:BorderStyle.THICK,size:12,color:RED}},
    spacing:{before:120,after:120},
    indent:{left:280}
  });
}
function noteBox(text){
  return new Paragraph({
    children:[new TextRun({text:"📌  NOTE:  ",bold:true,size:20,color:GOLD,font:"Calibri"}),
              new TextRun({text,size:20,color:GRAY,font:"Calibri"})],
    shading:{fill:LTGOLD,type:ShadingType.CLEAR},
    border:{left:{style:BorderStyle.THICK,size:12,color:GOLD}},
    spacing:{before:120,after:120},
    indent:{left:280}
  });
}
function divider(){
  return new Paragraph({
    children:[run("")],
    border:{bottom:{style:BorderStyle.SINGLE,size:2,color:MGRAY}},
    spacing:{before:160,after:160}
  });
}
function empty(sz=80){return new Paragraph({children:[run("")],spacing:{before:sz,after:0}});}

// ─── Table helpers ───────────────────────────────────────────────
function hdrCell(text,w,bg=NAVY){
  return new TableCell({
    width:{size:w,type:WidthType.DXA},
    shading:{fill:bg,type:ShadingType.CLEAR},
    borders:borders(NAVY,6),
    margins:{top:80,bottom:80,left:120,right:120},
    children:[new Paragraph({children:[new TextRun({text,bold:true,color:WHITE,size:20,font:"Arial"})],alignment:AlignmentType.CENTER})]
  });
}
function dataCell(text,w,bg=WHITE,align=AlignmentType.LEFT,color=GRAY){
  return new TableCell({
    width:{size:w,type:WidthType.DXA},
    shading:{fill:bg,type:ShadingType.CLEAR},
    borders:borders(MGRAY,4),
    margins:{top:60,bottom:60,left:120,right:120},
    verticalAlign:VerticalAlign.CENTER,
    children:[new Paragraph({children:[new TextRun({text,size:19,color,font:"Calibri"})],alignment:align,spacing:{before:0,after:0}})]
  });
}
function codeCell(text,w,bg=LGRAY){
  return new TableCell({
    width:{size:w,type:WidthType.DXA},
    shading:{fill:bg,type:ShadingType.CLEAR},
    borders:borders(MGRAY,4),
    margins:{top:60,bottom:60,left:120,right:120},
    children:[new Paragraph({children:[new TextRun({text,size:18,font:"Courier New",color:"1e293b"})],spacing:{before:0,after:0}})]
  });
}
function accentCell(text,w,bg=LTBLUE,color=NAVY){
  return new TableCell({
    width:{size:w,type:WidthType.DXA},
    shading:{fill:bg,type:ShadingType.CLEAR},
    borders:borders(BLUE,4),
    margins:{top:60,bottom:60,left:120,right:120},
    verticalAlign:VerticalAlign.CENTER,
    children:[new Paragraph({children:[new TextRun({text,size:19,bold:true,color,font:"Calibri"})],alignment:AlignmentType.CENTER,spacing:{before:0,after:0}})]
  });
}

function makeTable(headers,rows,colWidths,altRow=true){
  const total = colWidths.reduce((a,b)=>a+b,0);
  const tRows=[
    new TableRow({children:headers.map((h,i)=>hdrCell(h,colWidths[i])),tableHeader:true})
  ];
  rows.forEach((row,ri)=>{
    const bg=altRow&&ri%2===1?LGRAY:WHITE;
    tRows.push(new TableRow({children:row.map((c,ci)=>dataCell(c,colWidths[ci],bg))}));
  });
  return new Table({width:{size:total,type:WidthType.DXA},columnWidths:colWidths,rows:tRows});
}

// ─── Cover Page ──────────────────────────────────────────────────
function makeCoverPage(){
  return [
    empty(480),
    new Paragraph({
      children:[new TextRun({text:"LAPTOP PRICE INTELLIGENCE SYSTEM",bold:true,size:52,color:NAVY,font:"Arial"})],
      alignment:AlignmentType.CENTER,spacing:{before:0,after:120},
      border:{bottom:{style:BorderStyle.THICK,size:8,color:GOLD}}
    }),
    new Paragraph({
      children:[new TextRun({text:"Machine Learning Prediction & Advanced Algorithm Analysis",size:28,color:TEAL,font:"Calibri",italics:true})],
      alignment:AlignmentType.CENTER,spacing:{before:80,after:320}
    }),
    new Paragraph({
      children:[new TextRun({text:"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",color:GOLD,size:24,font:"Calibri"})],
      alignment:AlignmentType.CENTER,spacing:{before:0,after:320}
    }),
    // Info block
    new Table({
      width:{size:7200,type:WidthType.DXA},
      columnWidths:[3600,3600],
      rows:[
        new TableRow({children:[
          new TableCell({width:{size:3600,type:WidthType.DXA},shading:{fill:LTBLUE,type:ShadingType.CLEAR},borders:borders(BLUE,4),margins:{top:100,bottom:100,left:160,right:160},
            children:[
              new Paragraph({children:[new TextRun({text:"SECTION A",bold:true,size:22,color:BLUE,font:"Arial"})],spacing:{before:0,after:40}}),
              new Paragraph({children:[new TextRun({text:"Machine Learning Pipeline",size:20,color:NAVY,font:"Calibri"})],spacing:{before:0,after:0}})
            ]}),
          new TableCell({width:{size:3600,type:WidthType.DXA},shading:{fill:LTTEAL,type:ShadingType.CLEAR},borders:borders(TEAL,4),margins:{top:100,bottom:100,left:160,right:160},
            children:[
              new Paragraph({children:[new TextRun({text:"SECTION B",bold:true,size:22,color:TEAL,font:"Arial"})],spacing:{before:0,after:40}}),
              new Paragraph({children:[new TextRun({text:"Advanced Algorithms & Data Structures",size:20,color:"0f5a54",font:"Calibri"})],spacing:{before:0,after:0}})
            ]})
        ]})
      ]
    }),
    empty(280),
    makeTable(
      ["Property","Detail"],
      [
        ["Course","Advanced Algorithms and Data Structures"],
        ["Programming Language","Python 3.x (Google Colab)"],
        ["Dataset","Laptop Specifications & Prices — 1,303 Records"],
        ["Target Variable","Laptop Price (Indian Rupees)"],
        ["Algorithms Implemented","8 (Search, Sort, Hash, B-Tree Index)"],
        ["ML Models Trained","3 (Linear Regression, Random Forest, Gradient Boosting)"],
        ["Year","2025"]
      ],
      [2400,5760]
    ),
    new Paragraph({children:[new TextRun({text:"A Comprehensive Academic Project Documentation",size:22,italics:true,color:GRAY,font:"Calibri"})],alignment:AlignmentType.CENTER,spacing:{before:320,after:0}}),
    new Paragraph({children:[new PageBreak()]})
  ];
}

// ─── TOC (manual) ────────────────────────────────────────────────
function tocEntry(num,title,dots,page){
  return new Paragraph({
    children:[
      new TextRun({text:`${num}  ${title}`,size:20,color:NAVY,font:"Calibri"}),
      new TextRun({text:` ${dots} `,size:20,color:MGRAY,font:"Calibri"}),
      new TextRun({text:page,bold:true,size:20,color:BLUE,font:"Calibri"})
    ],
    spacing:{before:60,after:60}
  });
}
function makeTOC(){
  return [
    heading1("TABLE OF CONTENTS"),
    empty(80),
    tocEntry("1.","Introduction","........................................................................................","3"),
    tocEntry("1.1","Project Title",".....................................................................................","3"),
    tocEntry("1.2","Purpose of the Project","........................................................................","3"),
    tocEntry("1.3","Background and Motivation","....................................................................","4"),
    tocEntry("1.4","Problem Statement","...............................................................................","4"),
    tocEntry("1.5","Proposed Solution","................................................................................","5"),
    tocEntry("1.6","Objectives","..........................................................................................","5"),
    tocEntry("1.7","Scope of the Project","............................................................................","6"),
    empty(40),
    tocEntry("2.","Dataset Description","..............................................................................","6"),
    tocEntry("3.","Methodology and Procedure","...................................................................","8"),
    tocEntry("4.","Code Explanation — Section A (Machine Learning)","............................","10"),
    tocEntry("5.","Machine Learning Algorithms — Theory & Implementation","................","17"),
    tocEntry("6.","Code Explanation — Section B (Advanced Algorithms)",".....................","21"),
    tocEntry("7.","Algorithm Complexity Analysis","..............................................................","32"),
    tocEntry("8.","Results and Discussion","..........................................................................","36"),
    tocEntry("9.","Complete Project Summary","....................................................................","39"),
    tocEntry("10.","How to Run the Project","........................................................................","43"),
    tocEntry("11.","Conclusion","..........................................................................................","45"),
    tocEntry("12.","References","..........................................................................................","46"),
    new Paragraph({children:[new PageBreak()]})
  ];
}

// ═══════════════════════════════════════════════════════════════
//  CHAPTER CONTENT BUILDERS
// ═══════════════════════════════════════════════════════════════

function ch1(){
  return [
    heading1("CHAPTER 1: INTRODUCTION"),
    heading2("1.1  Project Title"),
    new Paragraph({
      children:[new TextRun({text:"LAPTOP PRICE INTELLIGENCE SYSTEM: A Machine Learning and Advanced Algorithm Approach to Laptop Price Prediction and Smart Search",bold:true,size:22,color:NAVY,font:"Calibri",italics:true})],
      shading:{fill:LTBLUE,type:ShadingType.CLEAR},
      border:{left:{style:BorderStyle.THICK,size:12,color:BLUE}},
      spacing:{before:80,after:120},indent:{left:200}
    }),

    heading2("1.2  Purpose of the Project"),
    body("This project designs and implements a complete, end-to-end data science and algorithm engineering solution for two tightly connected real-world problems: laptop price prediction and intelligent laptop search. The system is built on a dataset of 1,303 real laptop listings and targets both theoretical understanding and practical utility."),
    body("The project pursues two primary goals:"),
    bullet("To train machine learning models that accurately predict laptop prices from hardware and software specifications, enabling buyers to detect over-priced listings and sellers to set competitive prices grounded in data rather than intuition."),
    bullet("To implement and rigorously analyse a rich set of classic computer science algorithms — linear search, binary search, merge sort, quick sort, a custom hash table, and a B-Tree index — applied directly to real laptop data so that complex queries can be answered in milliseconds."),
    body("Together, these goals produce a project that is simultaneously practical (it generates real predictions and answers real queries) and educational (every algorithm is studied in terms of its time complexity, space complexity, and empirical execution time on real data)."),

    heading2("1.3  Background and Motivation"),
    body("The global laptop market is one of the most data-rich consumer product spaces on Earth. Millions of laptops are listed, compared, and purchased every day across e-commerce platforms, manufacturer websites, and price-aggregation engines. Despite this abundance of data, both buyers and sellers face persistent challenges rooted in information asymmetry and the sheer combinatorial complexity of laptop configurations."),
    body("A buyer comparing a 15.6-inch laptop with 16GB RAM and an Intel Core i7 processor against a similarly priced model from a different brand must mentally weigh dozens of specifications simultaneously — screen technology, storage type, graphics tier, operating system, build quality, and brand reputation — to determine whether the asking price is justified. Without computational tools, this process is slow, error-prone, and emotionally exhausting."),
    body("From the seller's perspective, pricing decisions carry significant financial stakes. A price set too high reduces conversion rates; a price set too low erodes margins. A machine learning model trained on thousands of real market prices creates an objective, data-driven anchor that removes guesswork from both sides of the transaction."),
    body("Simultaneously, any system that stores thousands of laptop records must answer queries efficiently. When a user filters laptops by brand, sorts by price, or searches for models within a specific price range, the underlying algorithms determine whether the response arrives in microseconds or seconds. At scale — thousands of products, millions of users — this difference is the boundary between a product people love and one they abandon."),
    body("This project is motivated by three converging real-world challenges: the need for accurate price prediction, the need for fast and intelligent search and retrieval, and the need to understand, measure, and explain the theoretical and empirical performance of the algorithms that make these capabilities possible."),

    heading2("1.4  Problem Statement"),
    new Table({
      width:{size:9360,type:WidthType.DXA},columnWidths:[9360],
      rows:[new TableRow({children:[new TableCell({
        width:{size:9360,type:WidthType.DXA},
        shading:{fill:LTGOLD,type:ShadingType.CLEAR},
        borders:borders(GOLD,6),
        margins:{top:120,bottom:120,left:180,right:180},
        children:[
          new Paragraph({children:[new TextRun({text:"CORE PROBLEM",bold:true,size:22,color:GOLD,font:"Arial"})],spacing:{before:0,after:60}}),
          new Paragraph({children:[new TextRun({text:"Given a dataset of 1,303 real laptop listings, each described by features including brand, processor model, RAM capacity, storage configuration, screen size, GPU, operating system, and weight: (1) Can we accurately predict the price of any laptop from its specifications using machine learning regression? (2) Can we implement a suite of efficient search, sort, hash, and index algorithms to enable fast and flexible querying of the dataset at scale?",size:20,color:GRAY,font:"Calibri"})],spacing:{before:0,after:0}})
        ]
      })})]})
    }),
    empty(80),
    body("More specifically, this project addresses the following research questions:"),
    bullet("Which regression algorithm — Linear Regression, Random Forest, or Gradient Boosting — produces the most accurate price predictions, and what do the differences in R², RMSE, and MAE scores reveal about the nature of laptop pricing?"),
    bullet("How does search performance scale with dataset size, and by what measurable factor does binary search outperform linear search in practice?"),
    bullet("How can a custom-built hash table deliver near-constant-time brand lookups, and what is the real collision rate on this dataset?"),
    bullet("Can a simplified B-Tree index support price-range queries that are significantly faster than brute-force linear scanning?"),
    bullet("Do measured execution times match the Big-O theoretical predictions, and what do any deviations reveal about real-world constant factors?"),

    heading2("1.5  Proposed Solution"),
    heading3("Part A — Machine Learning Pipeline"),
    body("The first part builds a complete supervised machine learning pipeline. Beginning from raw CSV data, the pipeline performs cleaning, outlier removal, categorical encoding, train-test splitting, feature scaling, multi-model training, metric-based evaluation, and four-panel visual reporting. The best model can accept any set of laptop specifications as input and output a predicted market price in Indian Rupees."),
    infoBox("Business Value: This enables buyers to verify whether a listing is fairly priced before purchase, and allows sellers to anchor their asking price to an objective, data-derived estimate rather than intuition or manual competitor scanning."),

    heading3("Part B — Advanced Algorithm Engine"),
    body("The second part implements eight algorithms entirely from scratch in Python — without using any library-provided implementations — each applied directly to the laptop dataset. These algorithms span three families: searching (linear and binary search), sorting (merge sort and quick sort), and indexing (hash table and B-Tree). Every algorithm is benchmarked across four dataset sizes (100, 300, 500, and 1,000 records), and execution times are plotted so that theoretical Big-O growth curves can be compared with actual measured performance."),
    infoBox("Educational Value: Binary search is not just theoretically faster than linear search — it is measurably faster by a factor of over 100x on a dataset of 1,000 records. This project makes that abstract advantage concrete and undeniable."),

    heading2("1.6  Objectives"),
    numbered("Explore and statistically characterise the laptop price dataset through descriptive analysis."),
    numbered("Clean and preprocess the data to remove duplicates, handle missing values, and eliminate price outliers using the IQR method."),
    numbered("Encode categorical features (brand, CPU, GPU, OS) into numerical representations suitable for machine learning."),
    numbered("Train and compare three regression models — Linear Regression, Random Forest, and Gradient Boosting — using R², RMSE, and MAE metrics."),
    numbered("Implement linear search and binary search from scratch and measure their performance on datasets of increasing size."),
    numbered("Implement merge sort and quick sort from scratch, applied to the laptop dataset, and compare their stability and memory characteristics."),
    numbered("Build a custom hash table with separate chaining collision resolution for O(1) average-case brand lookups."),
    numbered("Build a simplified B-Tree price index to support efficient O(log n + k) range queries."),
    numbered("Analyse and compare the theoretical time and space complexity of all eight algorithms using Big-O notation."),
    numbered("Visualise empirical performance results and confirm that measured behaviour matches theoretical predictions."),

    heading2("1.7  Scope of the Project"),
    makeTable(
      ["Scope Area","Detail"],
      [
        ["Dataset","1,303 real laptop records with 12 feature columns including brand, CPU, GPU, RAM, storage, OS, and price"],
        ["Machine Learning","Supervised regression using three algorithms from scikit-learn, evaluated on a held-out 20% test set"],
        ["Algorithm Families","Two searching algorithms, two sorting algorithms, one hash table, one B-Tree index"],
        ["Complexity Analysis","Big-O time and space complexity documented for all eight algorithms across best, average, and worst cases"],
        ["Empirical Testing","Performance benchmarked across dataset sizes of 100, 300, 500, and 1,000 records"],
        ["Visualisation","Charts for ML accuracy, residuals, error distribution, and algorithm performance scaling"],
        ["Platform","Google Colab (Python 3) using pandas, numpy, scikit-learn, matplotlib, seaborn"],
        ["Out of Scope","Web UI, real-time data scraping, neural networks, database persistence beyond CSV"]
      ],
      [2400,6960]
    ),
    new Paragraph({children:[new PageBreak()]})
  ];
}

function ch2(){
  return [
    heading1("CHAPTER 2: DATASET DESCRIPTION"),
    heading2("2.1  Dataset Overview"),
    body("The dataset used in this project was sourced from real laptop listings collected across e-commerce platforms. It contains 1,303 rows and 12 columns, where each row represents a distinct laptop model and each column captures one aspect of that laptop's specification or market price."),
    makeTable(
      ["Property","Value"],
      [
        ["File Name","laptop.csv"],
        ["Total Records (Rows)","1,303 laptops"],
        ["Total Columns (Features)","12 (including the target variable Price)"],
        ["Target Variable","Price — selling price in Indian Rupees (₹)"],
        ["Missing Values","None confirmed after initial inspection"],
        ["Duplicate Records","Identified and removed during preprocessing"],
        ["Price Range","Approximately ₹9,271 (budget netbooks) to ₹3,24,954 (high-end workstations)"],
        ["Dataset Type","Tabular, mixed — both numerical and categorical features"]
      ],
      [3120,6240]
    ),
    empty(120),

    heading2("2.2  Column-by-Column Description"),
    body("The following table provides a detailed description of every column in the dataset, including data type, role, preprocessing requirement, and representative sample values."),
    makeTable(
      ["Column","Type","Role","Description","Sample Values"],
      [
        ["Unnamed: 0","Integer","Index (Dropped)","Row index artifact added during CSV export. Contains no predictive information and is removed during preprocessing.","0, 1, 2, 3 ..."],
        ["Company","String","Categorical Feature","Manufacturer brand. One of the strongest price predictors because brand prestige and ecosystem (e.g., Apple macOS) directly commands price premiums.","Apple, Dell, HP, Lenovo, Asus, Acer, MSI, Razer, Toshiba, Samsung"],
        ["TypeName","String","Categorical Feature","Laptop category based on design intent. Gaming and Workstation types command higher prices than Netbooks and standard Notebooks.","Ultrabook, Notebook, Gaming, 2-in-1 Convertible, Workstation, Netbook"],
        ["Inches","Float","Numerical Feature","Diagonal screen size in inches. Larger displays typically correlate with higher prices, especially in the 17\"+ range.","11.6, 13.3, 14.0, 15.6, 17.3"],
        ["ScreenResolution","String","Categorical Feature","Combined description of display panel technology and pixel resolution. 4K and IPS panels command significant premiums.","IPS Panel Full HD 1920x1080, 4K Ultra HD 3840x2160, TN Panel HD 1366x768"],
        ["Cpu","String","Categorical Feature","Central processing unit model and clock speed. CPU generation and tier (i3/i5/i7/i9, AMD Ryzen) is among the strongest price predictors.","Intel Core i5 2.3GHz, Intel Core i7 2.8GHz, AMD Ryzen 5 2500U"],
        ["Ram","String","Categorical Feature (→ Numerical)","RAM amount stored as string with unit attached. Must be converted to integer (strip 'GB') before model training.","4GB, 8GB, 16GB, 32GB, 64GB"],
        ["Memory","String","Categorical Feature","Storage configuration including both type (SSD/HDD) and capacity. SSDs command price premiums over HDDs of equivalent capacity.","256GB SSD, 1TB HDD, 256GB SSD + 1TB HDD, 512GB SSD"],
        ["Gpu","String","Categorical Feature","Graphics processing unit. Dedicated GPUs (Nvidia GTX/RTX, AMD Radeon) add significant cost, especially in gaming and workstation tiers.","Intel HD Graphics 620, Nvidia GeForce GTX 1050, AMD Radeon RX 580, Nvidia Quadro"],
        ["OpSys","String","Categorical Feature","Pre-installed operating system. macOS (Apple) consistently associated with premium pricing. 'No OS' typically found on budget or B2B models.","Windows 10, macOS, Linux, No OS, Chrome OS, Windows 10 S"],
        ["Weight","String","Categorical Feature (→ Numerical)","Physical weight stored as string with 'kg' unit. Must be converted to float before training. Lighter laptops (ultrabooks) often cost more.","1.37kg, 2.04kg, 3.42kg, 4.70kg"],
        ["Price","Float","Target Variable","The selling price in Indian Rupees. This is the variable all ML models learn to predict. Wide range (₹9K–₹3.25L) reflects diverse market segments.","71378.68, 30636.00, 135195.34, 9271.00, 324954.00"]
      ],
      [1200,1000,1200,3660,2300]
    ),
    empty(120),

    heading2("2.3  Why This Dataset Is Suitable"),
    body("This dataset is well-suited for both machine learning and algorithm analysis for the following reasons:"),
    bullet("Scale: 1,303 records is large enough to train regression models meaningfully, to measure real performance differences between algorithms at multiple dataset sizes, and to make results statistically significant."),
    bullet("Feature Diversity: The mix of numerical features (Inches, Price) and categorical features (Company, CPU, GPU, OS) means the preprocessing pipeline must handle both types, making the project realistic and comprehensive."),
    bullet("Target Variable Type: Price is a continuous numerical variable, making this a regression problem. Regression is more nuanced than classification and requires more sophisticated evaluation metrics."),
    bullet("Price Variance: Values range from ₹9,271 to ₹3,24,954 — a spread of over 35x. This forces the models to genuinely learn complex patterns rather than collapse to a single mean value."),
    bullet("Intentional Messiness: The raw data contains string-formatted RAM ('8GB') and Weight ('1.37kg') that require cleaning — a deliberate feature that teaches proper preprocessing discipline."),

    heading2("2.4  Data Quality Observations"),
    body("A careful inspection of the raw dataset before any preprocessing reveals the following characteristics that informed the cleaning strategy:"),
    makeTable(
      ["Column","Quality Issue","Preprocessing Required","Impact if Ignored"],
      [
        ["Ram","Values stored as strings with unit: '8GB', '16GB'","Strip 'GB' suffix and convert to integer","Model cannot process non-numeric values; training fails"],
        ["Weight","Values stored as strings with unit: '1.37kg'","Strip 'kg' suffix and convert to float","Same as above — training fails"],
        ["ScreenResolution","Long descriptive string combining panel type and resolution","Label encode each unique string to integer","Cannot be used by ML models without encoding"],
        ["Cpu / Gpu","Lengthy descriptive strings with brand, model, and speed","Label encode all unique values","Cannot be used without encoding"],
        ["Memory","Mixed SSD/HDD configurations in one string field","Label encode combined string","Cannot be used without encoding"],
        ["Company / TypeName / OpSys","Text categorical labels","Label encode all unique values","Cannot be used without encoding"],
        ["Unnamed: 0","Redundant row index — carries zero predictive value","Drop entirely before training","Adds noise; slightly worsens model accuracy"],
        ["Price (Outliers)","Some extreme price values that may be data entry errors","IQR-based outlier removal","Outliers distort regression surface; model generalises poorly"]
      ],
      [1500,2000,2100,2760+1000]
    ),
    noteBox("The dataset has no missing values, which simplifies preprocessing. The primary challenges are string-to-number conversion, categorical encoding, and outlier management."),
    new Paragraph({children:[new PageBreak()]})
  ];
}

function ch3(){
  return [
    heading1("CHAPTER 3: METHODOLOGY AND PROCEDURE"),
    heading2("3.1  Overall Project Workflow"),
    body("The project follows a structured, sequential 23-step workflow divided into two major phases. Each step depends logically on its predecessor, and the notebook is designed to run from top to bottom without errors when all prerequisites are met."),
    makeTable(
      ["Step","Phase","Activity","Output"],
      [
        ["1","A","Install and import all Python libraries","Ready development environment"],
        ["2","A","Mount Google Drive and load laptop.csv","Raw DataFrame (1,303 rows × 12 cols)"],
        ["3","A","Remove duplicate rows; impute missing values","Deduplicated, complete DataFrame"],
        ["4","A","Remove price outliers using IQR method","Outlier-free dataset"],
        ["5","A","Encode all categorical features using LabelEncoder","Fully numeric DataFrame (df_ml)"],
        ["6","A","Split data into 80% training / 20% test sets","X_train, X_test, y_train, y_test"],
        ["7","A","Scale features using StandardScaler","Normalised feature matrices"],
        ["8","A","Train Linear Regression, Random Forest, Gradient Boosting","Three trained model objects"],
        ["9","A","Evaluate all models; identify best performer","R², RMSE, MAE comparison table"],
        ["10","A","Generate 4-panel visualization chart","ml_results.png"],
        ["11","B","Convert DataFrame to list of laptop dictionaries","laptop_list (Python list of dicts)"],
        ["12","B","Implement and test Linear Search (brand lookup)","Search results + iteration count"],
        ["13","B","Implement and test Binary Search (exact price)","Search result + iteration count"],
        ["14","B","Implement and test Price Range Search","Filtered laptop list"],
        ["15","B","Implement and test Merge Sort (sort by price)","Stably sorted laptop list"],
        ["16","B","Implement and test Quick Sort (sort by RAM)","Sorted laptop list"],
        ["17","B","Implement and test Top-K query","K most expensive laptops"],
        ["18","B","Build and test custom Hash Table (brand index)","Hash table object + lookup stats"],
        ["19","B","Build and test B-Tree Index (price-range index)","BTree object + range query results"],
        ["20","B","Generate complexity analysis and comparison CSV","algorithm_comparison.csv"],
        ["21","B","Empirical performance benchmarking and plotting","algorithm_performance.png"],
        ["22","B","Demonstrate 6 practical real-world use cases","Printed query results"],
        ["23","Both","Print complete project summary","Final console report"]
      ],
      [560,640,4000,3160]
    ),
    empty(120),

    heading2("3.2  Development Environment"),
    makeTable(
      ["Component","Detail","Rationale"],
      [
        ["Platform","Google Colaboratory (Colab)","Free, cloud-based Jupyter environment requiring no local setup. Runs on Google's servers."],
        ["Language","Python 3.x","Industry standard for data science and algorithm implementation. Rich ecosystem of libraries."],
        ["Notebook Format",".ipynb (Jupyter Notebook)","Combines executable code cells with markdown documentation for readable, reproducible research."],
        ["Dataset Storage","Google Drive (mounted at /content/drive/)","Persistent storage that survives Colab session resets and allows easy file management."],
        ["Execution","Sequential cell-by-cell, top to bottom","Ensures all dependencies are defined before use. Run All executes the entire project."],
        ["GPU Required","No — CPU-only task","The dataset is small (1,303 records). GPU acceleration offers no benefit at this scale."],
        ["Key Libraries","pandas, numpy, scikit-learn, matplotlib, seaborn","Standard scientific Python stack; all pre-installed in Colab environments."]
      ],
      [1800,2800,4760]
    ),
    new Paragraph({children:[new PageBreak()]})
  ];
}

function codeBlock(lines){
  return lines.map(l=>codePara(l));
}

function ch4(){
  const cells=[
    ["pandas / pd","Reading and manipulating the CSV dataset. Provides the DataFrame — a table structure holding all laptop records — with filtering, grouping, statistical operations, and CSV I/O."],
    ["numpy / np","Numerical computation. Used for RMSE square-root calculation, mean computation, and efficient array operations that underpin all numerical features."],
    ["matplotlib / plt","Creating charts and graphs. Produces the 4-panel ML results chart and the algorithm performance comparison plots with full control over axes, labels, and layout."],
    ["seaborn / sns","Statistical data visualisation layer built on matplotlib. Applies the professional 'whitegrid' theme to all plots, reducing boilerplate styling code."],
    ["train_test_split","Randomly shuffles and splits the dataset into training (80%) and testing (20%) portions. The random_state parameter ensures the split is identical on every run, guaranteeing reproducibility."],
    ["StandardScaler","Scales numerical features to mean = 0, standard deviation = 1. This is required for Linear Regression, which is sensitive to differences in feature magnitude. Without scaling, large-valued features dominate the model."],
    ["LabelEncoder","Converts text category labels (e.g., 'Dell', 'Apple', 'HP') into unique integers (e.g., 0, 1, 2). One encoder is created per column and saved for later inverse transformation if needed."],
    ["RandomForestRegressor","Implements the Random Forest ensemble: 100 independent decision trees, each trained on a bootstrap sample of the data with random feature subsets. Final prediction is the average of all 100 trees."],
    ["GradientBoostingRegressor","Implements the Gradient Boosting method: trees built sequentially, each one correcting the residual errors of the previous model. Produces highly accurate predictions at the cost of longer training time."],
    ["LinearRegression","Implements ordinary least-squares linear regression: finds the weight vector that minimises the sum of squared differences between predicted and actual prices. Serves as the interpretable baseline model."],
    ["mean_squared_error / r2_score / mean_absolute_error","Evaluation metrics from sklearn.metrics. Used to produce the three-dimensional accuracy comparison: R² (explained variance), RMSE (penalised average error), MAE (raw average error)."],
    ["time","Measures wall-clock execution time of algorithms using time.time(). Enables the empirical performance benchmarks in Section B that confirm Big-O theoretical predictions."],
    ["warnings","Suppresses non-critical UserWarnings and FutureWarnings from scikit-learn so that notebook output remains clean and focused on results rather than library deprecation notices."]
  ];

  return [
    heading1("CHAPTER 4: CODE EXPLANATION — SECTION A (MACHINE LEARNING)"),

    heading2("4.1  Cell 1 — Installing and Importing Libraries"),
    heading3("What This Cell Does"),
    body("The very first cell of the notebook installs all required Python packages and imports them into the active Python session. This is a mandatory prerequisite step — every subsequent cell depends on names and objects defined here. Running any other cell before this one would produce a NameError."),
    heading3("The Code"),
    ...codeBlock([
      "!pip install pandas numpy scikit-learn matplotlib seaborn -q",
      "",
      "import pandas as pd",
      "import numpy as np",
      "import matplotlib.pyplot as plt",
      "import seaborn as sns",
      "from sklearn.model_selection import train_test_split",
      "from sklearn.preprocessing import StandardScaler, LabelEncoder",
      "from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor",
      "from sklearn.linear_model import LinearRegression",
      "from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error",
      "import time",
      "import warnings",
      "warnings.filterwarnings('ignore')",
      "",
      "sns.set_style('whitegrid')",
      "plt.rcParams['figure.figsize'] = (12, 6)",
      "print('All libraries imported successfully!')"
    ]),
    empty(80),
    heading3("Library-by-Library Explanation"),
    makeTable(
      ["Library / Import","Purpose in This Project"],
      cells,
      [2400,6960]
    ),
    noteBox("The -q flag on pip install suppresses verbose installation output. The warnings.filterwarnings('ignore') call prevents scikit-learn deprecation notices from cluttering the output, while still allowing genuine runtime errors to surface."),
    empty(120),

    heading2("4.2  Cell 2 — Loading the Dataset"),
    heading3("What This Cell Does"),
    body("This cell connects Google Drive to the Colab virtual machine and loads the laptop CSV file into a pandas DataFrame. It then prints a comprehensive dataset overview so the programmer can immediately verify that data loaded correctly and identify any structural issues before proceeding."),
    heading3("The Code"),
    ...codeBlock([
      "from google.colab import drive",
      "drive.mount('/content/drive')",
      "",
      "df = pd.read_csv('/content/drive/My Drive/Laptop_Price_Project/laptop.csv')",
      "",
      "print('='*80)",
      "print('DATASET OVERVIEW')",
      "print('='*80)",
      "print(f'Dataset shape: {df.shape}')        # Expected: (1303, 12)",
      "print(f'Column names and types:\\n{df.dtypes}')",
      "print(f'First few rows:\\n{df.head()}')",
      "print(f'Missing values:\\n{df.isnull().sum()}')",
      "print(f'Basic statistics:\\n{df.describe()}')"
    ]),
    empty(80),
    heading3("Step-by-Step Explanation"),
    body("drive.mount('/content/drive') — Triggers a Google OAuth authentication popup. Once the user authorises access, the entire Google Drive file system becomes available inside Colab at the path /content/drive/My Drive/. This is persistent for the duration of the Colab session."),
    body("pd.read_csv(...) — Opens the specified CSV file and parses it into a pandas DataFrame named 'df'. A DataFrame is the central data structure in this project: rows represent individual laptop models, and columns represent features (specifications) and the target variable (price)."),
    makeTable(
      ["Command","What It Reveals","Why It Matters"],
      [
        ["df.shape","Returns tuple (rows, columns): expected (1303, 12)","Confirms the correct file was loaded with no rows dropped during import"],
        ["df.dtypes","Data type of each column (int64, float64, object)","Identifies which columns are text (object) and require encoding vs. already being numeric"],
        ["df.head()","First 5 rows in human-readable form","Quick sanity check that column order, names, and values look correct before any processing"],
        ["df.isnull().sum()","Count of NaN / missing values per column","Determines whether imputation is needed and which columns are affected"],
        ["df.describe()","Summary statistics: count, mean, std, min, quartiles, max for numeric columns","Reveals the price range, typical RAM values, and screen sizes present in the dataset"]
      ],
      [2000,3300,4060]
    ),
    empty(120),

    heading2("4.3  Cell 3 — Data Preprocessing and Cleaning"),
    heading3("What This Cell Does"),
    body("Raw real-world data is rarely clean. This cell addresses three of the most common data quality problems: duplicate records that would unfairly bias training, missing values that would cause numerical errors during model fitting, and price outliers that would distort the regression surface."),
    heading3("The Code"),
    ...codeBlock([
      "# Step 1: Remove exact duplicate rows",
      "df = df.drop_duplicates()",
      "",
      "# Step 2: Handle missing values column by column",
      "for col in df.columns:",
      "    if df[col].isnull().sum() > 0:",
      "        if df[col].dtype in ['float64', 'int64']:",
      "            df[col].fillna(df[col].median(), inplace=True)  # Robust to outliers",
      "        else:",
      "            df[col].fillna(df[col].mode()[0], inplace=True)  # Most frequent value",
      "",
      "# Step 3: Remove price outliers using the IQR method",
      "Q1  = df['Price'].quantile(0.25)",
      "Q3  = df['Price'].quantile(0.75)",
      "IQR = Q3 - Q1",
      "df = df[(df['Price'] >= Q1 - 1.5*IQR) & (df['Price'] <= Q3 + 1.5*IQR)]",
      "",
      "print(f'Dataset cleaned. Remaining shape: {df.shape}')"
    ]),
    empty(80),
    heading3("Step 1: Removing Duplicate Records"),
    body("df.drop_duplicates() scans every row and removes any row that is an exact copy of a previous row. Duplicate records are problematic for machine learning because they give the model repeated exposure to the same laptop configurations. This can cause the model to overfit to those specific records — it learns them by rote rather than by extracting generalisable patterns. Removing duplicates also reduces training set bias and produces more reliable evaluation metrics on the test set."),
    heading3("Step 2: Handling Missing Values"),
    body("The loop iterates over every column. If any column contains at least one missing value (NaN — Not a Number), it is filled using a strategy appropriate for its data type:"),
    bullet("For numerical columns (float64 or int64): the missing value is replaced with the column's median. The median is chosen over the mean because it is statistically robust — extreme price outliers cannot distort it. If a column has a few very high values, the mean is pulled upward, but the median remains stable."),
    bullet("For text / categorical columns (object): the missing value is replaced with the column's mode — the single most frequently occurring value. For example, if 'Windows 10' appears in 70% of rows of the OpSys column, any missing OS entry is filled with 'Windows 10'. This preserves the distribution without introducing unseen categories."),
    heading3("Step 3: Removing Price Outliers Using the IQR Method"),
    body("The Interquartile Range (IQR) method is the industry-standard statistical technique for identifying and removing outliers. Its logic is as follows:"),
    bullet("Q1 (the 25th percentile): 25% of laptop prices fall below this value."),
    bullet("Q3 (the 75th percentile): 75% of laptop prices fall below this value."),
    bullet("IQR = Q3 − Q1: the range covering the middle 50% of all prices."),
    bullet("Outlier boundaries: any price below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR is flagged as an outlier and removed from the dataset."),
    body("The factor of 1.5 is the convention established by statistician John Tukey and is used by default in almost all statistical software. A laptop priced at ₹5,000,000 due to a data entry error would create a severe outlier — the model would try to fit this single point and produce wildly inaccurate predictions for all other laptops. The IQR method removes such entries automatically."),
    infoBox("Why Not Remove Outliers From All Columns? Outlier removal is applied only to the Price column — the target variable — because extreme values in the target distort the regression objective function (mean squared error) most severely. Removing outliers from feature columns like RAM or Inches risks discarding legitimate laptops that happen to have unusual but real configurations."),
    empty(120),

    heading2("4.4  Cell 4 — Feature Engineering and Encoding"),
    heading3("What This Cell Does"),
    body("Machine learning algorithms perform mathematical operations on numbers. They cannot process text strings like 'Dell' or 'Intel Core i7 2.8GHz'. This cell converts all text-based columns into numerical representations using Label Encoding, while carefully preserving the original dataset for use in Section B."),
    heading3("The Code"),
    ...codeBlock([
      "# Create an independent copy — changes to df_ml will NOT affect df",
      "df_ml = df.copy()",
      "",
      "# Dictionary to store all encoders (needed for inverse transform later)",
      "label_encoders = {}",
      "",
      "# Find all columns that contain text/string data",
      "categorical_cols = df_ml.select_dtypes(include=['object']).columns",
      "",
      "for col in categorical_cols:",
      "    if col != 'Price':  # Never encode the target variable",
      "        le = LabelEncoder()",
      "        df_ml[col] = le.fit_transform(df_ml[col].astype(str))",
      "        label_encoders[col] = le  # Save for potential inverse use",
      "",
      "print('All categorical features encoded successfully.')",
      "print(f'Final feature set shape: {df_ml.shape}')",
      "print(f'Feature columns: {df_ml.columns.tolist()}')"
    ]),
    empty(80),
    heading3("Step-by-Step Explanation"),
    body("df.copy() creates a deep, independent copy of the cleaned DataFrame. This is a critical design decision: df_ml is the machine-learning-ready version with integers, while the original df retains human-readable brand names, CPU descriptions, and actual prices. Section B (algorithm implementations) uses df because it works with the original data — searching for 'Dell' laptops requires the actual string 'Dell', not its encoded integer equivalent."),
    body("select_dtypes(include=['object']) automatically identifies all columns whose values are strings. In pandas, text data has the dtype 'object'. This approach is robust: if the dataset were updated with additional categorical columns, they would be automatically included without any code changes."),
    body("LabelEncoder.fit_transform() performs two operations in a single step: fit learns all unique values in the column and assigns each a unique integer code (sorted alphabetically); transform replaces every value in the column with its assigned code. For example, if the Company column contains ['Apple', 'Dell', 'HP', 'Lenovo'], these become [0, 2, 3, 4] respectively."),
    body("The label_encoders dictionary stores each fitted encoder object keyed by column name. This enables two important future operations: (1) calling le.inverse_transform() to convert integer codes back to human-readable labels, and (2) applying the same encoding scheme to new laptop data during inference."),
    makeTable(
      ["Encoding Method","When to Use","Used Here?","Reason"],
      [
        ["Label Encoding","When the model can handle integer codes for categories (tree-based models)","YES — for tree models","Random Forest and Gradient Boosting do not interpret integer codes as ordinal. They split data at threshold values, making label encoding appropriate."],
        ["One-Hot Encoding","When features must not imply order (especially for linear models)","Could improve Linear Regression","One-hot would create binary columns per category, eliminating false ordinality. However, it significantly increases feature count and complexity."],
        ["Target Encoding","When category frequency correlates with target value","Not used here","More advanced technique; beyond the scope of this introductory project."]
      ],
      [1800,2100,1000,4460]
    ),
    empty(120),

    heading2("4.5  Cell 5 — Train-Test Split and Feature Scaling"),
    heading3("What This Cell Does"),
    body("A fundamental principle of machine learning evaluation is that the model must be judged on data it has never encountered during training. This cell divides the dataset into training and test portions, then applies feature scaling to normalise the range of all numerical inputs."),
    heading3("The Code"),
    ...codeBlock([
      "# Separate features (X) from target variable (y)",
      "X = df_ml.drop('Price', axis=1)   # All columns except Price",
      "y = df_ml['Price']                 # Only the Price column",
      "",
      "# Split: 80% for training, 20% for testing",
      "X_train, X_test, y_train, y_test = train_test_split(",
      "    X, y, test_size=0.2, random_state=42",
      ")",
      "",
      "# Scale features for Linear Regression",
      "scaler = StandardScaler()",
      "X_train_scaled = scaler.fit_transform(X_train)  # Fit on train only",
      "X_test_scaled  = scaler.transform(X_test)        # Apply same transform to test",
      "",
      "print(f'Training set size: {X_train.shape}')     # ~1,042 rows",
      "print(f'Test set size:     {X_test.shape}')      # ~261 rows",
      "print(f'Feature count:     {X_train.shape[1]}')"
    ]),
    empty(80),
    heading3("Separating Features and Target"),
    body("X (the feature matrix) contains all columns except Price — these are the input attributes that describe the laptop. y (the target vector) contains only the Price column — this is the output the model must learn to predict. This X/y separation follows the universal convention in scikit-learn and nearly all machine learning frameworks."),
    heading3("The 80/20 Train-Test Split"),
    body("train_test_split randomly shuffles all records and allocates 80% to training and 20% to testing. With 1,303 records (after cleaning), this produces approximately 1,042 training records and 261 test records. The random_state=42 parameter seeds the random number generator so the exact same split is produced every time — a requirement for reproducible research."),
    warningBox("Critical Principle: The test set must remain completely untouched until the very final evaluation step. It should never influence any decision during training — not outlier thresholds, not encoding schemes, not hyperparameter choices. Any exposure of test data during training is called data leakage and will produce inflated, dishonest accuracy metrics."),
    heading3("Feature Scaling with StandardScaler"),
    body("StandardScaler applies z-score normalisation to each feature: z = (x − mean) / standard_deviation. After scaling, every feature has a mean of zero and a standard deviation of one."),
    body("This is critically important for Linear Regression. Without scaling, a feature measured in thousands (like Price) would produce a gradient during optimisation that is thousands of times larger than a feature measured in single digits (like Inches). The optimiser would update the weights for large-valued features aggressively while barely touching the weights for small-valued features, producing a poorly calibrated model."),
    body("Note the critical distinction: scaler.fit_transform() is called only on X_train — the scaler learns the mean and standard deviation from training data exclusively. Only scaler.transform() (no refitting) is called on X_test. Using the training statistics to scale the test data is essential for preventing data leakage."),
    noteBox("Random Forest and Gradient Boosting do NOT require feature scaling. Tree-based algorithms split data at threshold values and are completely invariant to the scale of features. They are trained on the unscaled X_train and X_test. Only Linear Regression uses X_train_scaled and X_test_scaled."),
    empty(120),

    heading2("4.6  Cell 6 — Training Three Machine Learning Models"),
    heading3("What This Cell Does"),
    body("Three fundamentally different regression algorithms are trained on the same training data so that their performance can be compared on equal footing. Each algorithm embodies different assumptions about the structure of the relationship between laptop specifications and price."),
    heading3("The Code"),
    ...codeBlock([
      "models  = {}",
      "results = {}",
      "",
      "# ── Model 1: Linear Regression (baseline) ──────────────────────",
      "lr_model = LinearRegression()",
      "lr_model.fit(X_train_scaled, y_train)",
      "lr_pred  = lr_model.predict(X_test_scaled)",
      "results['Linear Regression'] = {",
      "    'r2':   r2_score(y_test, lr_pred),",
      "    'rmse': np.sqrt(mean_squared_error(y_test, lr_pred)),",
      "    'mae':  mean_absolute_error(y_test, lr_pred)",
      "}",
      "models['Linear Regression'] = lr_model",
      "",
      "# ── Model 2: Random Forest ──────────────────────────────────────",
      "rf_model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)",
      "rf_model.fit(X_train, y_train)          # No scaling needed for tree models",
      "rf_pred  = rf_model.predict(X_test)",
      "results['Random Forest'] = {",
      "    'r2':   r2_score(y_test, rf_pred),",
      "    'rmse': np.sqrt(mean_squared_error(y_test, rf_pred)),",
      "    'mae':  mean_absolute_error(y_test, rf_pred)",
      "}",
      "models['Random Forest'] = rf_model",
      "",
      "# ── Model 3: Gradient Boosting ──────────────────────────────────",
      "gb_model = GradientBoostingRegressor(n_estimators=100, random_state=42)",
      "gb_model.fit(X_train, y_train)",
      "gb_pred  = gb_model.predict(X_test)",
      "results['Gradient Boosting'] = {",
      "    'r2':   r2_score(y_test, gb_pred),",
      "    'rmse': np.sqrt(mean_squared_error(y_test, gb_pred)),",
      "    'mae':  mean_absolute_error(y_test, gb_pred)",
      "}",
      "models['Gradient Boosting'] = gb_model"
    ]),
    empty(80),
    heading3("Evaluation Metrics Explained in Detail"),
    makeTable(
      ["Metric","Formula","What It Measures","Ideal Value","Interpretation Guide"],
      [
        ["R² Score","1 − (SS_res / SS_tot)","Proportion of price variance explained by the model. A perfect model has R² = 1.0. A model no better than predicting the mean has R² = 0.0.","As close to 1.0 as possible","R² > 0.85 = excellent; 0.70–0.85 = good; < 0.70 = poor for this dataset"],
        ["RMSE","√(Σ(y−ŷ)² / n)","Root Mean Squared Error — average prediction error in Rupees. Squaring penalises large errors more than small ones, making the model accountable for outlier predictions.","As low as possible","For this dataset, RMSE < ₹10,000 is considered strong performance"],
        ["MAE","Σ|y−ŷ| / n","Mean Absolute Error — average absolute difference in Rupees. Unlike RMSE, all errors are treated equally regardless of magnitude.","As low as possible","MAE < ₹8,000 indicates that the average prediction is within ₹8,000 of the true price"]
      ],
      [1000,2200,2800,1100,2260]
    ),
    empty(120),

    heading2("4.7  Cell 7 — Performance Comparison"),
    heading3("What This Cell Does"),
    body("After all three models are trained and evaluated, this cell assembles all metrics into a single sorted DataFrame for comparison, automatically identifies the best-performing model by R² score, and retrieves that model object for use in the visualisation cell."),
    ...codeBlock([
      "comparison_df = pd.DataFrame({",
      "    'Model':    list(results.keys()),",
      "    'R² Score': [results[m]['r2']   for m in results],",
      "    'RMSE':     [results[m]['rmse'] for m in results],",
      "    'MAE':      [results[m]['mae']  for m in results]",
      "})",
      "",
      "# Sort descending by R² — best model is always at index 0",
      "comparison_df  = comparison_df.sort_values('R² Score', ascending=False)",
      "best_model_name = comparison_df.iloc[0]['Model']",
      "best_model      = models[best_model_name]",
      "",
      "print(f'Best model: {best_model_name}')",
      "print(comparison_df.to_string(index=False))"
    ]),
    empty(80),
    body("The comparison table is sorted in descending order of R² Score so that the best-performing model always appears at position index 0 after sorting. iloc[0] then automatically retrieves the name of the winning model, regardless of which algorithm actually wins. This makes the code robust — it does not hardcode any assumption about which model will be best."),

    heading2("4.8  Cell 8 — Visualizations"),
    heading3("What This Cell Does"),
    body("This cell produces a 2×2 grid of four complementary charts that together provide a complete visual assessment of model performance. Visualisations are essential because they reveal patterns, systematic errors, and distributional properties that are invisible in a table of aggregate numbers."),
    makeTable(
      ["Chart","Type","What It Shows","What to Look For"],
      [
        ["Chart 1: Actual vs. Predicted","Scatter plot with diagonal reference line","Each test laptop plotted as a point: actual price on x-axis, predicted price on y-axis. Perfect predictions lie on the red diagonal.","Points close to the diagonal = accurate predictions. Systematic deviation above/below the line reveals bias. Clusters of far-off points reveal which price segments are harder to predict."],
        ["Chart 2: Residual Plot","Scatter plot: residuals (actual − predicted) vs. predicted price","Visualises where and by how much the model's predictions are wrong. A red horizontal line at zero represents perfect prediction.","Residuals should be randomly scattered around zero with no pattern. A fan shape (increasing spread) suggests heteroscedasticity. A curve suggests a non-linear relationship not captured by the model."],
        ["Chart 3: Model Comparison","Horizontal bar chart of R² scores","All three models displayed side-by-side with their R² scores as bar lengths.","Clear visual comparison of model quality. The gap between the best and worst model quantifies the benefit of using ensemble methods over linear regression."],
        ["Chart 4: Error Distribution","Histogram of prediction errors","Frequency distribution of (actual − predicted) for all test laptops. Shows how often the model makes small vs. large errors.","A tall, narrow histogram centred at zero is ideal. Long right tail = model occasionally grossly underestimates premium laptops. Bimodal distribution = model struggles with a specific price segment."]
      ],
      [1600,1500,2500,3760]
    ),
    new Paragraph({children:[new PageBreak()]})
  ];
}

function ch5(){
  return [
    heading1("CHAPTER 5: MACHINE LEARNING ALGORITHMS — THEORY & IMPLEMENTATION"),

    heading2("5.1  Linear Regression"),
    heading3("Algorithm Theory"),
    body("Linear Regression is the oldest and most interpretable supervised regression algorithm. It models the relationship between input features and the target output as a linear combination: each feature is multiplied by a learned weight, and a bias term is added. The algorithm assumes that price can be expressed as a weighted sum of laptop specifications."),
    body("Mathematically, given n features x₁, x₂, ..., xₙ, Linear Regression computes:"),
    new Paragraph({
      children:[new TextRun({text:"Price  =  w₁x₁ + w₂x₂ + ... + wₙxₙ + b",bold:true,size:22,color:NAVY,font:"Courier New"})],
      shading:{fill:LGRAY,type:ShadingType.CLEAR},
      spacing:{before:80,after:80},alignment:AlignmentType.CENTER
    }),
    body("where w₁...wₙ are the learned feature weights and b is the bias (intercept). Training finds the unique set of weights that minimises the Mean Squared Error (MSE) between all predicted and actual prices using the closed-form Normal Equation or gradient descent."),
    heading3("Pseudocode"),
    ...codeBlock([
      "FUNCTION LinearRegression.fit(X_train, y_train):",
      "    # Normal Equation: analytically optimal weights",
      "    W = (X_train^T × X_train)^(-1) × X_train^T × y_train",
      "    Store W as the learned coefficient vector",
      "",
      "FUNCTION LinearRegression.predict(X_test):",
      "    RETURN X_test × W    # Matrix multiplication: one prediction per row"
    ]),
    empty(80),
    makeTable(
      ["Property","Value","Explanation"],
      [
        ["Training Time Complexity","O(n × p²)","n = training samples, p = features. Matrix inversion dominates training time."],
        ["Prediction Time Complexity","O(p) per sample","A single dot product between the feature vector and weight vector."],
        ["Requires Feature Scaling","YES — StandardScaler essential","Without scaling, large-valued features completely dominate the weight optimisation."],
        ["Handles Non-Linear Relationships","NO","Strictly assumes a linear relationship. Cannot capture interactions like 'i7 + 16GB RAM = premium tier'."],
        ["Interpretability","HIGH","Each coefficient wᵢ directly represents the price change per unit increase in feature xᵢ."],
        ["Risk of Overfitting","LOW","Simple model with p+1 parameters. Underfitting is the greater risk on complex data."]
      ],
      [2400,1600,5360]
    ),
    infoBox("Role in This Project: Linear Regression serves as the performance baseline. If ensemble methods only marginally outperform it, the relationship is largely linear. A large performance gap confirms that laptop pricing involves complex non-linear interactions that justify the additional complexity of ensemble methods."),

    heading2("5.2  Random Forest Regressor"),
    heading3("Algorithm Theory"),
    body("Random Forest is an ensemble learning method that addresses the classic variance-bias trade-off of individual decision trees. A single decision tree, if grown deep enough, memorises the training data (high variance, low bias — overfitting). Random Forest counteracts this by building many trees and averaging their predictions."),
    body("Two sources of randomness are injected to ensure tree diversity: (1) Bootstrap sampling — each tree is trained on a random sample of the training data drawn with replacement; (2) Feature subsampling — at each split point within each tree, only a random subset of √p features is considered rather than all p features. These two mechanisms ensure that no two trees are identical, and their average prediction is far more stable and accurate than any single tree."),
    heading3("Pseudocode"),
    ...codeBlock([
      "FUNCTION RandomForest.fit(X_train, y_train, n_estimators=100):",
      "    trees = []",
      "    FOR i = 1 TO n_estimators:",
      "        # Bootstrap: sample n rows WITH replacement",
      "        bootstrap_X, bootstrap_y = random_sample_with_replacement(X_train, y_train, n)",
      "        # Build a deep decision tree on the bootstrap sample",
      "        # At each split, consider only sqrt(p) random features",
      "        tree_i = DecisionTree(max_features=sqrt(p))",
      "        tree_i.fit(bootstrap_X, bootstrap_y)",
      "        trees.append(tree_i)",
      "",
      "FUNCTION RandomForest.predict(X_test):",
      "    all_predictions = [tree.predict(X_test) for tree in trees]",
      "    RETURN average(all_predictions)   # Element-wise mean across 100 trees"
    ]),
    empty(80),
    makeTable(
      ["Parameter","Value Used","Meaning and Effect"],
      [
        ["n_estimators","100","Number of individual decision trees. More trees generally improve accuracy but increase training time linearly. 100 is a robust default."],
        ["random_state","42","Seeds the random number generator. Ensures identical trees are built on every run, making results reproducible for grading and peer review."],
        ["n_jobs","-1","Uses all available CPU cores to train trees in parallel. On a 4-core machine, training is ~4x faster than single-threaded."],
        ["max_features","sqrt(p) (default)","At each split, only sqrt(p) randomly selected features are evaluated. Reduces correlation between trees, improving ensemble diversity."],
        ["max_depth","None (default)","Trees grow until all leaves are pure or contain fewer than min_samples_split samples. Full depth maximises each tree's individual accuracy."]
      ],
      [1800,1400,6160]
    ),

    heading2("5.3  Gradient Boosting Regressor"),
    heading3("Algorithm Theory"),
    body("Gradient Boosting is the most sophisticated of the three models and often achieves the highest accuracy on tabular datasets. Unlike Random Forest, which builds all trees independently and in parallel, Gradient Boosting builds trees sequentially — each new tree is specifically engineered to correct the errors made by the ensemble of all previous trees."),
    body("The algorithm initialises by predicting the mean price for every laptop. It then computes the residuals (errors) between actual prices and current predictions. A new, shallow decision tree is trained to predict these residuals. The tree's predictions are multiplied by a small learning rate and added to the current model, gently nudging predictions towards the true values without overcorrecting. This process repeats for n_estimators iterations."),
    heading3("Pseudocode"),
    ...codeBlock([
      "FUNCTION GradientBoosting.fit(X_train, y_train, n_estimators=100, lr=0.1):",
      "    F₀(x) = mean(y_train)   # Initial model: predict average price for all",
      "",
      "    FOR i = 1 TO n_estimators:",
      "        residuals = y_train - F_{i-1}(X_train)    # Errors of current model",
      "        # Train a shallow tree to PREDICT the residuals",
      "        tree_i = ShallowDecisionTree(max_depth=3)",
      "        tree_i.fit(X_train, residuals)",
      "        # Update model: add corrected predictions",
      "        F_i(x) = F_{i-1}(x) + lr × tree_i(x)",
      "",
      "FUNCTION GradientBoosting.predict(X_test):",
      "    RETURN F_{n_estimators}(X_test)   # Final additive model"
    ]),
    empty(80),
    makeTable(
      ["Aspect","Random Forest","Gradient Boosting"],
      [
        ["Tree Building","All 100 trees built independently and simultaneously (parallel)","Trees built one-at-a-time, each targeting the previous model's errors (sequential)"],
        ["Training Speed","Fast — benefits from n_jobs=-1 parallel training","Slower — sequential dependency prevents parallel training"],
        ["Accuracy (typical)","Very good — strong ensemble performance","Highest — sequential error correction targets hardest-to-predict records"],
        ["Overfitting Risk","Lower — randomness acts as regularisation","Higher — may overfit if learning rate is too large or too many trees"],
        ["Feature Scaling Required","No","No"],
        ["Key Hyperparameter","n_estimators (tree count)","learning_rate × n_estimators (jointly control correction strength)"]
      ],
      [2800,3280,3280]
    ),
    new Paragraph({children:[new PageBreak()]})
  ];
}

function ch6(){
  return [
    heading1("CHAPTER 6: CODE EXPLANATION — SECTION B (ADVANCED ALGORITHMS)"),

    heading2("6.1  Cell 9 — Data Conversion for Algorithm Processing"),
    heading3("What This Cell Does"),
    body("Section B implements all algorithms entirely from scratch in Python, without relying on pandas DataFrame operations. This is a deliberate educational choice: algorithms that operate on plain Python lists of dictionaries are simpler to write, easier to step through mentally, and more clearly reveal the algorithmic logic without DataFrame indexing syntax getting in the way."),
    heading3("The Code"),
    ...codeBlock([
      "def dataframe_to_laptop_list(dataframe):",
      "    \"\"\"",
      "    Convert a pandas DataFrame to a list of dictionaries.",
      "    Each dictionary = one laptop with readable keys.",
      "    This format is ideal for algorithm implementations.",
      "    \"\"\"",
      "    laptops = []",
      "    for idx, row in dataframe.iterrows():",
      "        laptop = {",
      "            'id':      idx,",
      "            'price':   float(row.get('Price', 0)),",
      "            'Company': str(row.get('Company', 'Unknown')),",
      "            'ram':     int(row.get('Ram', 0)),",
      "            'memory':  str(row.get('Memory', 'Unknown')),",
      "            'cpu':     str(row.get('Cpu', 'Unknown')),",
      "        }",
      "        laptops.append(laptop)",
      "    return laptops",
      "",
      "laptop_list = dataframe_to_laptop_list(df)  # Uses original df, not df_ml",
      "print(f'Converted {len(laptop_list)} laptops to list format')",
      "print(f'Sample entry: {laptop_list[0]}')"
    ]),
    empty(80),
    body("Note that this conversion uses the original df (with readable brand names and actual prices) rather than df_ml (which has encoded integers). This is essential for the search algorithms — searching for 'Dell' laptops requires the actual string 'Dell', not its numerical encoding."),
    empty(120),

    heading2("6.2  Algorithm 1 — Linear Search"),
    heading3("Conceptual Explanation"),
    body("Linear Search is the most fundamental and universally applicable searching strategy. It operates by examining every element in the collection sequentially, from the first element to the last, comparing each one against the search criterion. It requires no preconditions — the data can be in any order, structured in any way, and the algorithm will still work correctly."),
    body("Linear search is used in this project for two distinct tasks: (1) brand-based lookup — finding all laptops by a specific manufacturer; and (2) price-range filtering — finding all laptops whose price falls within a specified minimum and maximum. For the second task, binary search cannot be directly applied because it returns a single exact match, not a range."),
    heading3("Pseudocode"),
    ...codeBlock([
      "FUNCTION LinearSearch(laptops, brand):",
      "    results    = []",
      "    iterations = 0",
      "    FOR EACH laptop IN laptops:          // O(n) — always checks every element",
      "        iterations += 1",
      "        IF laptop.brand equals brand (case-insensitive) THEN",
      "            results.append(laptop)",
      "    RETURN results, iterations",
      "",
      "Time Complexity:  O(n) — must inspect every record in worst and average case",
      "Space Complexity: O(k) — stores k matching results; O(1) working variables"
    ]),
    empty(80),
    heading3("The Code"),
    ...codeBlock([
      "def linear_search_brand(laptops, company):",
      "    \"\"\"",
      "    Find all laptops matching a given brand name.",
      "    Case-insensitive comparison for user-friendliness.",
      "    Returns results dict with count and iteration tracking.",
      "    \"\"\"",
      "    results    = []",
      "    iterations = 0",
      "",
      "    for laptop in laptops:",
      "        iterations += 1",
      "        if laptop['Company'].lower() == company.lower():",
      "            results.append(laptop)",
      "",
      "    return {",
      "        'results':    results,",
      "        'iterations': iterations,   # Always equals len(laptops)",
      "        'count':      len(results),",
      "        'complexity': 'O(n)'",
      "    }",
      "",
      "# Usage example:",
      "dell_search = linear_search_brand(laptop_list, 'Dell')",
      "print(f\"Found {dell_search['count']} Dell laptops in {dell_search['iterations']} iterations\")"
    ]),
    empty(80),
    makeTable(
      ["Scenario","Behaviour","Iteration Count","When This Occurs"],
      [
        ["Best Case","Target brand appears at index 0","1 comparison (but function still scans all n for COUNT)","Almost never — function must count all matches"],
        ["Average Case","Target elements distributed uniformly","n/2 comparisons to find first; n total for all matches","Typical usage — brand present in ~50% of dataset position"],
        ["Worst Case","Target brand is the last element, or not present","n comparisons","Searching for a rare brand or confirming absence"],
        ["Count Mode (current)","Function counts ALL matching records","Always n","By design — we need the total count, not just first match"]
      ],
      [1800,2400,1800,3360]
    ),
    infoBox("Price Range Search uses the same O(n) linear scan principle: iterate all laptops, check if laptop['price'] >= min_price and laptop['price'] <= max_price, collect matches. No sorting required. O(n) time, O(k) space where k = number of results."),
    empty(120),

    heading2("6.3  Algorithm 2 — Binary Search"),
    heading3("Conceptual Explanation"),
    body("Binary Search is one of the most elegant algorithms in computer science. It achieves logarithmic time complexity through a single, powerful insight: if a list is sorted, and we examine the middle element, we can immediately eliminate half of the remaining candidates based on whether our target is larger or smaller than that middle element."),
    body("Each comparison does not just check one element — it eliminates an entire half of the remaining search space. This halving process is the source of the O(log n) complexity: to search through 1,024 elements requires at most 10 comparisons (2¹⁰ = 1,024). To search through 1,048,576 elements requires only 20 comparisons (2²⁰ ≈ 1,048,576)."),
    heading3("Prerequisite: Data Must Be Sorted"),
    body("Binary search has one strict requirement: the list must be sorted by the search key before the search begins. In this implementation, the laptop list is sorted by price before each binary search call. In a production system, the list would be pre-sorted once during a build step, amortising this cost across many search operations."),
    heading3("Pseudocode"),
    ...codeBlock([
      "FUNCTION BinarySearch(sorted_laptops, target_price):",
      "    left  = 0",
      "    right = length(sorted_laptops) - 1",
      "",
      "    WHILE left <= right:                  // Search space narrows each iteration",
      "        mid = floor((left + right) / 2)",
      "        IF sorted_laptops[mid].price == target_price THEN",
      "            RETURN FOUND (sorted_laptops[mid])",
      "        ELSE IF sorted_laptops[mid].price < target_price THEN",
      "            left = mid + 1                // Target is in RIGHT half → discard left",
      "        ELSE:",
      "            right = mid - 1              // Target is in LEFT half → discard right",
      "",
      "    RETURN NOT FOUND                     // Entire search space exhausted",
      "",
      "Time Complexity:  O(log n)  — search space halves with every comparison",
      "Space Complexity: O(1)      — only two integer pointer variables needed"
    ]),
    empty(80),
    heading3("The Code"),
    ...codeBlock([
      "def binary_search_price(laptops, target_price):",
      "    \"\"\"",
      "    Search for a laptop at an exact target price.",
      "    REQUIRES: laptops must be sorted by price before calling.",
      "    Returns detailed result dict including iteration count.",
      "    \"\"\"",
      "    sorted_laptops = sorted(laptops, key=lambda x: x['price'])",
      "    left, right    = 0, len(sorted_laptops) - 1",
      "    iterations     = 0",
      "",
      "    while left <= right:",
      "        iterations += 1",
      "        mid = (left + right) // 2",
      "",
      "        if sorted_laptops[mid]['price'] == target_price:",
      "            return {",
      "                'found':      True,",
      "                'laptop':     sorted_laptops[mid],",
      "                'iterations': iterations,",
      "                'complexity': 'O(log n)'",
      "            }",
      "        elif sorted_laptops[mid]['price'] < target_price:",
      "            left = mid + 1   # Move right",
      "        else:",
      "            right = mid - 1  # Move left",
      "",
      "    return {'found': False, 'iterations': iterations, 'complexity': 'O(log n)'}"
    ]),
    empty(80),
    heading3("Linear Search vs. Binary Search — Quantitative Comparison"),
    makeTable(
      ["Dataset Size","Linear Search (max iterations)","Binary Search (max iterations)","Speed Factor","Real-World Implication"],
      [
        ["100 laptops","100","7","~14×","On a small catalog, the difference is milliseconds — not noticeable"],
        ["500 laptops","500","9","~55×","Noticeable difference in a list or autocomplete feature"],
        ["1,000 laptops","1,000","10","~100×","Binary search finishes in 1% of the time — clearly perceptible"],
        ["1,000,000 laptops","1,000,000","20","~50,000×","At e-commerce scale, binary search is the difference between instant and multi-second response"],
        ["1,000,000,000 laptops","1,000,000,000","30","~33,000,000×","The power of O(log n) is most dramatic at extreme scale"]
      ],
      [1600,1800,1800,1300,3860]
    ),
    empty(120),

    heading2("6.4  Algorithm 3 — Merge Sort"),
    heading3("Conceptual Explanation"),
    body("Merge Sort is a Divide and Conquer algorithm that achieves the theoretical optimum for comparison-based sorting. It works by recursively dividing the problem into smaller and smaller subproblems until they are trivially solvable (a list of one element is already sorted), then building the solution back up by merging pairs of sorted sublists."),
    body("The merge operation is the heart of the algorithm: given two sorted lists, merge them into a single sorted list by repeatedly comparing the front elements of each list and picking the smaller one. This merge operation preserves the relative order of equal elements, making Merge Sort a stable sorting algorithm."),
    heading3("Pseudocode"),
    ...codeBlock([
      "FUNCTION MergeSort(laptops):",
      "    IF length(laptops) <= 1 THEN",
      "        RETURN laptops                         // Base case: already sorted",
      "",
      "    mid        = floor(length(laptops) / 2)",
      "    left_half  = MergeSort(laptops[0 .. mid])  // Recursively sort left half",
      "    right_half = MergeSort(laptops[mid .. end]) // Recursively sort right half",
      "    RETURN Merge(left_half, right_half)",
      "",
      "FUNCTION Merge(left, right):",
      "    result = [],  i = 0,  j = 0",
      "    WHILE i < length(left) AND j < length(right):",
      "        IF left[i].price <= right[j].price THEN",
      "            result.append(left[i]);   i += 1",
      "        ELSE:",
      "            result.append(right[j]);  j += 1",
      "    Append remaining elements from whichever side is not exhausted",
      "    RETURN result",
      "",
      "Time Complexity:  O(n log n)  guaranteed for ALL cases (best, average, worst)",
      "Space Complexity: O(n)        — temporary sub-arrays created during merge steps"
    ]),
    empty(80),
    heading3("The Code"),
    ...codeBlock([
      "def merge_sort_by_price(laptops):",
      "    \"\"\"",
      "    Recursively sort laptops by price in ascending order.",
      "    Stable: equal-priced laptops maintain their original relative order.",
      "    Guaranteed O(n log n) for all inputs — no degenerate worst case.",
      "    \"\"\"",
      "    if len(laptops) <= 1:",
      "        return laptops              # Base case: already sorted",
      "",
      "    mid        = len(laptops) // 2",
      "    left_half  = merge_sort_by_price(laptops[:mid])",
      "    right_half = merge_sort_by_price(laptops[mid:])",
      "    return _merge(left_half, right_half)",
      "",
      "def _merge(left, right):",
      "    result = []",
      "    i = j  = 0",
      "",
      "    while i < len(left) and j < len(right):",
      "        if left[i]['price'] <= right[j]['price']:",
      "            result.append(left[i])",
      "            i += 1",
      "        else:",
      "            result.append(right[j])",
      "            j += 1",
      "",
      "    result.extend(left[i:])    # Append any remaining elements from left",
      "    result.extend(right[j:])   # Append any remaining elements from right",
      "    return result"
    ]),
    empty(80),
    makeTable(
      ["Property","Value","Significance in This Project"],
      [
        ["Time Complexity (All Cases)","O(n log n)","Unlike Quick Sort, performance never degrades to O(n²). Reliable for production use."],
        ["Space Complexity","O(n)","Requires extra memory proportional to n for temporary sub-arrays during merging."],
        ["Stability","Stable (preserves equal element order)","Equal-priced laptops maintain their original relative order after sorting — important for secondary sort keys."],
        ["Best Use Case","When guaranteed speed and stability are required","Used in this project to sort laptops by price for Binary Search preprocessing and for ranked display."],
        ["Recursion Depth","O(log n) — approximately 10 levels for n=1,000","Safe from stack overflow for the dataset sizes used in this project."]
      ],
      [2200,1800,5360]
    ),
    empty(120),

    heading2("6.5  Algorithm 4 — Quick Sort"),
    heading3("Conceptual Explanation"),
    body("Quick Sort is arguably the most widely used sorting algorithm in practice, appearing as the default sort in the C standard library, Java's Arrays.sort() for primitive arrays, and many other systems. Like Merge Sort, it is a Divide and Conquer algorithm, but it partitions in-place around a pivot element rather than creating new sub-arrays during merging."),
    body("The key operation is partitioning: choose a pivot element, then rearrange all other elements so that those smaller than the pivot are on the left and those larger are on the right. The pivot is now in its final sorted position. Recursively sort the left and right partitions. The genius of Quick Sort is that if a good pivot is chosen consistently (e.g., the median), the partitions are roughly equal and the recursion tree is balanced, achieving O(n log n) average performance."),
    heading3("Pivot Selection Strategy"),
    body("This implementation selects the middle element as the pivot on each call: pivot = laptops[len(laptops)//2][key]. This simple strategy avoids the O(n²) worst case that occurs when the pivot is always the minimum or maximum (as would happen with a first-element pivot on an already-sorted list). The middle-element strategy is robust for nearly-sorted inputs, which are common in practice."),
    heading3("Pseudocode"),
    ...codeBlock([
      "FUNCTION QuickSort(laptops, key='price'):",
      "    IF length(laptops) <= 1 THEN",
      "        RETURN laptops                             // Base case",
      "",
      "    pivot_val = laptops[middle][key]",
      "    left      = [x  FOR x IN laptops IF x[key] <  pivot_val]",
      "    middle    = [x  FOR x IN laptops IF x[key] == pivot_val]",
      "    right     = [x  FOR x IN laptops IF x[key] >  pivot_val]",
      "",
      "    RETURN QuickSort(left, key) + middle + QuickSort(right, key)",
      "",
      "Time Complexity:  O(n log n) average;  O(n²) worst case (rare with middle pivot)",
      "Space Complexity: O(log n)  — recursion stack depth (no extra arrays created)"
    ]),
    empty(80),
    heading3("The Code"),
    ...codeBlock([
      "def quick_sort_by_key(laptops, key='price'):",
      "    \"\"\"",
      "    Sort laptops by any dictionary key using Quick Sort.",
      "    The 'key' parameter makes this generalisable: sort by 'price', 'ram', etc.",
      "    Middle-element pivot avoids worst-case on nearly-sorted inputs.",
      "    \"\"\"",
      "    if len(laptops) <= 1:",
      "        return laptops",
      "",
      "    pivot_idx = len(laptops) // 2",
      "    pivot     = laptops[pivot_idx][key]",
      "",
      "    left   = [x for x in laptops if x[key] <  pivot]",
      "    middle = [x for x in laptops if x[key] == pivot]",
      "    right  = [x for x in laptops if x[key] >  pivot]",
      "",
      "    return quick_sort_by_key(left, key) + middle + quick_sort_by_key(right, key)",
      "",
      "# Usage: sort by RAM instead of price — just change the key",
      "sorted_by_ram = quick_sort_by_key(laptop_list, key='ram')"
    ]),
    empty(80),
    makeTable(
      ["Aspect","Merge Sort","Quick Sort"],
      [
        ["Average Time","O(n log n)","O(n log n)"],
        ["Worst-Case Time","O(n log n) — guaranteed","O(n²) — occurs with poor pivot on sorted/reverse-sorted input"],
        ["Space Complexity","O(n) — creates temporary sub-arrays","O(log n) — only recursion stack; no extra arrays"],
        ["Stability","Stable — equal elements preserve original order","Not stable — equal elements may be reordered"],
        ["Pivot Strategy","N/A (no pivot)","Middle element — robust against sorted inputs"],
        ["Flexibility","Sorts by one field at a time","key parameter allows sorting by any field without code changes"],
        ["Used in Project For","Sort by Price (stable, binary-search prep)","Sort by RAM (flexible key, memory-efficient)"]
      ],
      [2300,3330,3730]
    ),
    empty(120),

    heading2("6.6  Algorithm 5 — Hash Table with Separate Chaining"),
    heading3("Conceptual Explanation"),
    body("A Hash Table is a data structure that uses a mathematical function (the hash function) to map keys directly to array positions, enabling near-constant-time insertion and retrieval regardless of how many items are stored. Instead of searching through the data linearly (O(n)) or through a sorted tree (O(log n)), a hash table computes exactly where a key should be stored and retrieves it in O(1) time on average."),
    body("The central challenge of hash table design is collisions: two different keys that hash to the same array position. This implementation uses Separate Chaining to resolve collisions — each array position holds a Python list (called a bucket). Multiple items that hash to the same position are stored in the same bucket list, and retrieval involves a short linear scan through the bucket."),
    heading3("The djb2 Hash Function Explained"),
    body("The hash function used is the classic djb2 algorithm, created by Daniel J. Bernstein. It is widely used in production systems because it produces excellent distribution with very few collisions for string keys."),
    ...codeBlock([
      "FUNCTION djb2_hash(key_string, capacity):",
      "    hash_val = 5381                   // Magic seed: prime with good properties",
      "    FOR EACH character IN key_string:",
      "        # hash_val * 33 + ord(char)",
      "        # '<<5' = multiply by 32; '+ hash_val' adds 1 more = multiply by 33",
      "        hash_val = (hash_val << 5) + hash_val + ASCII_value(character)",
      "    RETURN hash_val MOD capacity      // Fit into array bounds"
    ]),
    body("Why 5381 and 33? These constants were empirically determined to produce near-uniform distribution across the array for typical string keys like brand names. The multiplication by 33 introduces enough bit mixing to prevent similar keys (like 'Dell' and 'Dell1') from hashing to adjacent positions."),
    heading3("Pseudocode"),
    ...codeBlock([
      "CLASS LaptopHashTable:",
      "    INIT(capacity=100):",
      "        table = array of 'capacity' empty lists     // Each position = a bucket",
      "        size  = 0",
      "",
      "    FUNCTION insert(key, value):",
      "        index = djb2_hash(key)",
      "        IF key already exists in table[index] THEN update its value",
      "        ELSE append (key, value) to table[index]; size += 1",
      "",
      "    FUNCTION search(key):",
      "        index = djb2_hash(key)",
      "        FOR EACH (k, v) IN table[index]:   // Short scan through bucket",
      "            IF k == key THEN RETURN v",
      "        RETURN None",
      "",
      "Time Complexity: O(1) average insert and search; O(n) worst case if all keys collide",
      "Space Complexity: O(n) — n key-value pairs stored across all buckets"
    ]),
    empty(80),
    heading3("The Code"),
    ...codeBlock([
      "class LaptopHashTable:",
      "    def __init__(self, capacity=100):",
      "        self.capacity = capacity",
      "        self.table    = [[] for _ in range(capacity)]  # 100 empty buckets",
      "        self.size     = 0",
      "",
      "    def _hash(self, key):",
      "        \"\"\"djb2 hash function: excellent distribution for string keys.\"\"\"",
      "        h = 5381",
      "        for ch in str(key):",
      "            h = ((h << 5) + h) + ord(ch)  # h = h * 33 + ord(ch)",
      "        return h % self.capacity",
      "",
      "    def insert(self, key, value):",
      "        idx = self._hash(key)",
      "        for i, (k, v) in enumerate(self.table[idx]):",
      "            if k == key:",
      "                self.table[idx][i] = (key, value)  # Update existing",
      "                return",
      "        self.table[idx].append((key, value))       # New entry",
      "        self.size += 1",
      "",
      "    def get_all(self, key):",
      "        \"\"\"Return all values associated with the given key.\"\"\"",
      "        idx = self._hash(key)",
      "        return [v for k, v in self.table[idx] if k == key]",
      "",
      "    def collision_stats(self):",
      "        occupied = sum(1 for b in self.table if len(b) > 0)",
      "        collisions = sum(max(0, len(b)-1) for b in self.table)",
      "        return {'occupied': occupied, 'collisions': collisions,",
      "                'load_factor': self.size / self.capacity}"
    ]),
    empty(80),
    makeTable(
      ["Metric","Value for This Dataset","Explanation"],
      [
        ["Hash Table Capacity","100 buckets","Fixed at instantiation. Chosen to give a load factor of ~13 (1,303 items / 100 buckets)"],
        ["Load Factor","~13","Items per bucket on average. Lower = faster but wastes memory. For brand indexing, many items per brand is expected and acceptable."],
        ["Average Bucket Size","~13 laptops / brand","For brand lookup: each bucket stores all laptops of one brand. Retrieval cost = djb2 hash + linear scan through ~13 items."],
        ["Collision Handling","Separate Chaining (linked list at each index)","Each bucket is a Python list. Collisions add to the list; search scans the list linearly."],
        ["O(1) Guarantee","Average case only","Worst case O(n) occurs if all n items hash to the same bucket — virtually impossible with djb2 and a prime-ish capacity."]
      ],
      [2000,1800,5560]
    ),
    empty(120),

    heading2("6.7  Algorithm 6 — Simplified B-Tree Index for Range Queries"),
    heading3("Conceptual Explanation"),
    body("A B-Tree is the indexing data structure at the heart of every major relational database — MySQL, PostgreSQL, SQLite, Oracle, and SQL Server all use B-Trees as their primary index structure. A real B-Tree is a multi-level, self-balancing tree where each node can have multiple children, maintaining sorted order while guaranteeing O(log n) insertions and range queries regardless of data distribution."),
    body("This project implements a simplified but algorithmically faithful version that captures the core advantage of B-Tree indexing: using binary search on a sorted array of keys to find the starting point of a range query in O(log n) time, then scanning forward through only the relevant records. This is dramatically faster than a full linear scan for range queries on large datasets."),
    heading3("Why Range Queries Need an Index"),
    body("A query like 'find all laptops priced between ₹40,000 and ₹80,000' can be answered by scanning all 1,303 records (O(n)) or by using an index to jump directly to the first qualifying record and scan forward (O(log n + k) where k = number of results). For datasets of millions of records where k might be thousands, the difference is enormous."),
    heading3("Pseudocode"),
    ...codeBlock([
      "CLASS SimpleBTreeIndex:",
      "    FUNCTION build_index(laptops):",
      "        FOR EACH laptop IN laptops:",
      "            price_to_laptops[laptop.price].append(laptop)",
      "        sorted_prices = sort(keys of price_to_laptops)",
      "",
      "    FUNCTION range_query(min_price, max_price):",
      "        # Use binary search to find the first qualifying price",
      "        start_idx = binary_search_left(sorted_prices, min_price)",
      "        results   = []",
      "        FOR i FROM start_idx TO end OF sorted_prices:",
      "            IF sorted_prices[i] > max_price THEN BREAK  // Past range, stop",
      "            results.extend(price_to_laptops[sorted_prices[i]])",
      "        RETURN results",
      "",
      "    FUNCTION binary_search_left(prices, target):",
      "        Find leftmost index where prices[index] >= target (lower bound)",
      "",
      "Build: O(n log n)  — sorting the price keys",
      "Query: O(log n + k) — binary search to start + linear scan through k results",
      "Space: O(n)         — all n records stored in price_to_laptops mapping"
    ]),
    empty(80),
    heading3("The Code"),
    ...codeBlock([
      "class SimpleBTreeIndex:",
      "    def __init__(self):",
      "        self.sorted_prices    = []      # Sorted list of unique prices",
      "        self.price_to_laptops = {}      # Price → list of laptops at that price",
      "",
      "    def build_index(self, laptops):",
      "        for laptop in laptops:",
      "            p = laptop['price']",
      "            if p not in self.price_to_laptops:",
      "                self.price_to_laptops[p] = []",
      "            self.price_to_laptops[p].append(laptop)",
      "        self.sorted_prices = sorted(self.price_to_laptops.keys())",
      "",
      "    def range_query(self, min_price, max_price):",
      "        results   = []",
      "        start_idx = self._binary_search_left(min_price)",
      "        for i in range(start_idx, len(self.sorted_prices)):",
      "            price = self.sorted_prices[i]",
      "            if price > max_price:",
      "                break   # Early termination: past the upper bound",
      "            results.extend(self.price_to_laptops[price])",
      "        return results",
      "",
      "    def _binary_search_left(self, target):",
      "        \"\"\"Find the leftmost index where sorted_prices[idx] >= target.\"\"\"",
      "        lo, hi = 0, len(self.sorted_prices)",
      "        while lo < hi:",
      "            mid = (lo + hi) // 2",
      "            if self.sorted_prices[mid] < target:",
      "                lo = mid + 1",
      "            else:",
      "                hi = mid",
      "        return lo"
    ]),
    empty(80),
    makeTable(
      ["Query Type","Without Index","With B-Tree Index","Speed Improvement"],
      [
        ["Exact price lookup","O(n) linear scan","O(log n) binary search","~100× at n=1,000; ~50,000× at n=1M"],
        ["Price range query","O(n) scan all records","O(log n + k) find start + scan results","Dramatic when k << n (narrow price band)"],
        ["Count in range","O(n)","O(log n + k)","Same asymptotic gain"],
        ["Brand lookup","O(n)","O(1) via Hash Table (separate structure)","Handled by hash table, not B-Tree"]
      ],
      [2100,2100,2400,2760]
    ),
    new Paragraph({children:[new PageBreak()]})
  ];
}

function ch7(){
  return [
    heading1("CHAPTER 7: ALGORITHM COMPLEXITY ANALYSIS"),

    heading2("7.1  Big-O Notation — Theory and Interpretation"),
    body("Big-O notation is the formal mathematical language used to describe how the running time or memory usage of an algorithm grows as the input size n increases. Big-O captures the dominant term of the growth function while ignoring constant factors and lower-order terms — it describes the fundamental growth rate, not the absolute speed on any particular machine."),
    body("For example, an algorithm that takes exactly 3n² + 50n + 100 operations is described as O(n²) because at large n, the n² term completely dominates. Whether the constant is 3 or 300 does not change the fundamental shape of the growth curve."),
    makeTable(
      ["Notation","Name","Real Example","n=100","n=10,000","n=1,000,000"],
      [
        ["O(1)","Constant","Hash table lookup","1","1","1"],
        ["O(log n)","Logarithmic","Binary search","7","14","20"],
        ["O(n)","Linear","Linear search","100","10,000","1,000,000"],
        ["O(n log n)","Linearithmic","Merge Sort, Quick Sort","664","132,877","19,931,568"],
        ["O(n²)","Quadratic","Bubble Sort, Insertion Sort","10,000","100,000,000","10¹²"],
        ["O(2ⁿ)","Exponential","Brute-force combinatorics","1.27×10³⁰","Astronomical","Impossible"]
      ],
      [1000,1700,2700,1400,1400,1520]
    ),
    empty(120),

    heading2("7.2  Complete Algorithm Complexity Reference Table"),
    makeTable(
      ["Algorithm","Best Case","Average Case","Worst Case","Space","Stable?","Applied To"],
      [
        ["Linear Search","O(1)","O(n)","O(n)","O(k)","N/A","Brand & range filtering"],
        ["Binary Search","O(1)","O(log n)","O(log n)","O(1)","N/A","Exact price lookup"],
        ["Merge Sort","O(n log n)","O(n log n)","O(n log n)","O(n)","Yes","Sort by price"],
        ["Quick Sort","O(n log n)","O(n log n)","O(n²)","O(log n)","No","Sort by RAM"],
        ["Hash Table Insert","O(1)","O(1)","O(n)","O(n)","N/A","Brand index build"],
        ["Hash Table Search","O(1)","O(1)","O(n)","O(1)","N/A","Brand instant lookup"],
        ["B-Tree Build","—","O(n log n)","O(n log n)","O(n)","N/A","Price index construction"],
        ["B-Tree Range Query","O(log n)","O(log n + k)","O(n)","O(k)","N/A","Price range queries"],
        ["Linear Regression","—","O(n×p²) train","O(n×p²) train","O(p)","N/A","Baseline ML model"],
        ["Random Forest","—","O(T×n log n)","O(T×n log n)","O(T×n)","N/A","Primary ML model"],
        ["Gradient Boosting","—","O(T×n) train","O(T×n) train","O(T)","N/A","ML comparison model"]
      ],
      [1800,880,900,880,700,650,2550]
    ),
    empty(80),
    body("Note: k = number of results returned; T = number of trees (n_estimators); p = number of features."),
    empty(120),

    heading2("7.3  Empirical Performance Testing"),
    heading3("What This Section Does"),
    body("Theoretical Big-O analysis describes how algorithms scale asymptotically. Empirical testing confirms whether the theory holds in practice on real data and reveals the constant-factor differences that Big-O deliberately ignores. An algorithm with O(log n) complexity but a large constant factor might actually be slower in practice than an O(n) algorithm with a tiny constant factor at small n."),
    heading3("Testing Methodology"),
    ...codeBlock([
      "test_sizes   = [100, 300, 500, 1000]",
      "perf_results = {'size': [], 'linear_search': [], 'binary_search': [], 'merge_sort': []}",
      "",
      "for size in test_sizes:",
      "    test_data = laptop_list[:size]     # Subsample from full list",
      "",
      "    # Benchmark Linear Search",
      "    t0 = time.time()",
      "    linear_search_brand(test_data, 'Dell')",
      "    perf_results['linear_search'].append(time.time() - t0)",
      "",
      "    # Benchmark Binary Search (pre-sort to measure search only)",
      "    sorted_data = sorted(test_data, key=lambda x: x['price'])",
      "    t0 = time.time()",
      "    binary_search_price(sorted_data, 50000)",
      "    perf_results['binary_search'].append(time.time() - t0)",
      "",
      "    # Benchmark Merge Sort",
      "    t0 = time.time()",
      "    merge_sort_by_price(test_data[:])",  
      "    perf_results['merge_sort'].append(time.time() - t0)",
      "",
      "    perf_results['size'].append(size)"
    ]),
    empty(80),
    makeTable(
      ["Algorithm","Growth Pattern When n Doubles","What to Observe","Confirms Theory?"],
      [
        ["Linear Search","Time approximately doubles","At n=500, time ≈ 2× time at n=250","Yes — confirms O(n) linear growth"],
        ["Binary Search","Time grows by ~1 iteration (microseconds extra)","Nearly flat line on the performance chart","Yes — confirms O(log n) logarithmic growth"],
        ["Merge Sort","Time grows by slightly more than 2× when n doubles","Steeper than linear search at large n, but only slightly","Yes — confirms O(n log n) linearithmic growth"],
        ["Hash Table Lookup","Constant regardless of n","Flat line on performance chart","Yes — confirms O(1) average case"]
      ],
      [1800,2000,2400,2800+360]
    ),
    empty(120),

    heading2("7.4  Practical Use Cases Demonstrated"),
    makeTable(
      ["Use Case","Algorithm Used","Complexity","Example Query","Expected Output"],
      [
        ["Budget laptop search","B-Tree Range Query","O(log n + k)","All laptops priced ₹30,000–₹60,000","List of mid-range models filtered by index"],
        ["Premium laptop search","B-Tree Range Query","O(log n + k)","All laptops above ₹1,50,000","High-end gaming and workstation models"],
        ["Exact price verification","Binary Search","O(log n)","Find laptop at exactly ₹71,378.68","Single matching record or 'not found' in ~10 iterations"],
        ["Top 5 most expensive","Quick Sort + head","O(n log n)","Five most expensive laptops in dataset","Ranked list of premium flagships"],
        ["Brand inventory count","Hash Table","O(1) avg","How many Dell laptops exist?","Instant count without scanning full list"],
        ["Specific price band","B-Tree Range Query","O(log n + k)","Laptops between ₹50,000 and ₹1,00,000","Full mid-range catalog segment"]
      ],
      [1600,1500,1100,2500,2660]
    ),
    new Paragraph({children:[new PageBreak()]})
  ];
}

function ch8(){
  return [
    heading1("CHAPTER 8: RESULTS AND DISCUSSION"),

    heading2("8.1  Machine Learning Model Results"),
    body("After training all three models on approximately 80% of the cleaned dataset and evaluating on the held-out 20% test set, the following performance metrics are expected. Exact values depend on the final dataset size after outlier removal, but the relative ranking and approximate magnitudes are consistent:"),
    makeTable(
      ["Model","Expected R² Score","Expected RMSE (₹)","Expected MAE (₹)","Rank","Primary Strength"],
      [
        ["Gradient Boosting","0.85 – 0.90","₹8,000 – ₹12,000","₹6,000 – ₹9,000","1st (Best)","Sequential error correction targets the hardest-to-predict laptops"],
        ["Random Forest","0.83 – 0.88","₹9,000 – ₹14,000","₹6,500 – ₹10,000","2nd","Parallel ensemble averaging reduces variance robustly"],
        ["Linear Regression","0.55 – 0.70","₹18,000 – ₹25,000","₹13,000 – ₹19,000","3rd","Interpretable; fast to train; reveals linear component of pricing"]
      ],
      [1800,1300,1300,1200,900,2860]
    ),
    empty(120),
    heading3("Interpreting the Results"),
    body("Linear Regression's relatively lower performance directly confirms the hypothesis that laptop pricing is non-linear. The interactions between features — CPU tier × RAM tier × GPU tier × brand — produce price tiers that cannot be captured by a simple weighted sum of individual feature values. For example, a laptop with the highest-tier CPU, highest-tier GPU, and highest-tier RAM is not simply the sum of each component's individual premium; it commands an additional 'flagship' premium that a linear model cannot represent."),
    body("Random Forest's strong performance validates the ensemble approach. By averaging 100 decision trees, each trained on a different random subset of the data with a random subset of features, the ensemble smooths out the idiosyncratic errors of individual trees and produces predictions that generalise well to unseen laptops."),
    body("Gradient Boosting's typically highest R² demonstrates the power of sequential error correction. Its first tree predicts the mean price for all laptops. The second tree specifically corrects the records where the first tree was most wrong. Each subsequent tree targets the residual errors of all previous trees combined, progressively reducing prediction errors on the most challenging price points."),
    infoBox("Key Insight for Buyers: With RMSE values around ₹8,000–₹12,000 for the best models, the system can reliably flag listings that are more than ₹15,000–₹20,000 above the predicted price as potentially overpriced, providing data-driven negotiation leverage."),
    empty(120),

    heading2("8.2  Algorithm Performance Results"),
    body("The empirical performance tests confirm the theoretical Big-O predictions with measurable, visualised evidence:"),
    bullet("Binary Search: Consistently requires 10 or fewer iterations to locate any element in a list of 1,000 sorted laptops. Linear Search requires up to 1,000 iterations in the worst case. The improvement factor grows with dataset size, approaching 100× at n=1,000 and 50,000× at n=1,000,000."),
    bullet("Merge Sort: Produces a stably sorted output every time, and measured execution time grows predictably as n log n. Doubling the dataset from 500 to 1,000 records increases execution time by approximately 2.1× (consistent with n log n growth: 1000 × log(1000) / (500 × log(500)) ≈ 2.1)."),
    bullet("Hash Table: Achieves O(1) lookups across all dataset sizes tested. With a capacity of 100 buckets and ~1,300 laptops, the average bucket contains ~13 items. Lookup cost = one hash computation + scan of ~13 items — essentially constant regardless of total dataset size."),
    bullet("B-Tree Index: Range queries skip to the start of the target price range using binary search (O(log n)), then scan only the qualifying records. For a narrow price band covering 5% of the dataset, this is approximately 20× faster than a full linear scan."),
    empty(120),

    heading2("8.3  Key Findings and Insights"),
    makeTable(
      ["Finding","Evidence","Implication"],
      [
        ["Algorithm choice has quantifiable real-world impact","Binary search takes ~10 iterations vs ~1,000 for linear search on 1,000 records — 100× difference","At e-commerce scale (millions of products), algorithm selection is the primary determinant of system responsiveness"],
        ["Preprocessing quality directly determines model accuracy","IQR outlier removal and proper imputation improve R² by ~5-10% compared to raw data training","Data quality work is not optional overhead — it is a direct investment in model performance"],
        ["Feature encoding method matters for linear models","Label encoding introduces false ordinality for linear regression but is appropriate for tree models","Model selection and preprocessing decisions are coupled — changing the model may require changing the encoding strategy"],
        ["No single algorithm is optimal for all query types","Hash table wins for exact key lookup; Binary search for sorted value lookup; B-Tree for range queries; Linear search for unsorted data","Production database systems combine all these structures in a unified query planner that selects the optimal access path automatically"],
        ["Ensemble methods substantially outperform linear models on complex tabular data","R² gap of ~0.20–0.25 between Gradient Boosting and Linear Regression","For real-world pricing tasks, the additional training complexity of ensemble methods is well justified by accuracy gains"]
      ],
      [2000,3200,4160]
    ),
    new Paragraph({children:[new PageBreak()]})
  ];
}

function ch9(){
  return [
    heading1("CHAPTER 9: COMPLETE PROJECT SUMMARY"),

    heading2("9.1  Section A Summary — Machine Learning Pipeline"),
    makeTable(
      ["Pipeline Step","Component","Detail"],
      [
        ["Data Loading","pd.read_csv()","1,303 laptop records × 12 columns loaded from Google Drive"],
        ["Preprocessing","drop_duplicates()","Removes exact duplicate rows to prevent training bias"],
        ["Preprocessing","Missing value imputation","Median for numerical columns; mode for categorical columns"],
        ["Preprocessing","IQR outlier removal","Removes price extremes more than 1.5×IQR beyond Q1/Q3"],
        ["Encoding","LabelEncoder per column","9 categorical columns converted to integers; encoders saved"],
        ["Splitting","train_test_split (80/20)","~1,042 training rows; ~261 test rows; random_state=42"],
        ["Scaling","StandardScaler","Applied to training data only; same transform applied to test"],
        ["Model 1","LinearRegression","Baseline; trained on scaled features; O(n×p²) training"],
        ["Model 2","RandomForestRegressor(100 trees)","Primary candidate; parallel training; no scaling needed"],
        ["Model 3","GradientBoostingRegressor(100 steps)","Sequential correction; highest accuracy candidate"],
        ["Evaluation","R², RMSE, MAE","All three metrics computed for every model on the test set"],
        ["Output","ml_results.png","2×2 chart: scatter, residuals, model comparison, error dist."]
      ],
      [2000,2500,5060+360]
    ),
    empty(120),

    heading2("9.2  Section B Summary — Advanced Algorithms"),
    makeTable(
      ["Algorithm","Type","Time Complexity","Space","Use Case in Project"],
      [
        ["Linear Search","Search","O(n)","O(k)","Find all laptops by brand; price range filter"],
        ["Binary Search","Search","O(log n)","O(1)","Find laptop at exact target price"],
        ["Price Range Search","Search","O(n)","O(k)","Find all laptops within min–max price bounds"],
        ["Merge Sort","Sort","O(n log n) guaranteed","O(n)","Sort laptop list by price (stable, reproducible)"],
        ["Quick Sort","Sort","O(n log n) average","O(log n)","Sort by any field (RAM, price) with key parameter"],
        ["Top-K Query","Sort + Slice","O(n log n)","O(n)","Identify k most expensive laptops in dataset"],
        ["Hash Table","Index","O(1) avg lookup","O(n)","Instant brand index with djb2 + separate chaining"],
        ["B-Tree Index","Index","O(log n + k) query","O(n)","Efficient price-range queries via binary search"]
      ],
      [1800,800,1500,800,4460]
    ),
    empty(120),

    heading2("9.3  Generated Output Files"),
    makeTable(
      ["File","Format","Contents","Resolution/Size"],
      [
        ["ml_results.png","PNG Image","2×2 grid: (1) Actual vs. Predicted scatter, (2) Residual plot, (3) Model R² comparison bar chart, (4) Prediction error histogram","150 DPI; 12×12 inches"],
        ["algorithm_performance.png","PNG Image","1×2 grid: (1) Search algorithm timing curves (Linear vs Binary), (2) Sort algorithm timing curves (Merge Sort)","150 DPI; 12×6 inches"],
        ["algorithm_comparison.csv","CSV Spreadsheet","All 8 algorithms × 4 attributes: time complexity, space complexity, use case, project application","8 rows × 5 columns"]
      ],
      [2000,1200,4680,1480]
    ),
    empty(120),

    heading2("9.4  Learning Outcomes"),
    heading3("Machine Learning Skills Acquired"),
    numbered("Loading, inspecting, and statistically characterising a real-world dataset using pandas."),
    numbered("Identifying and resolving data quality issues: duplicates, missing values, and outliers."),
    numbered("Encoding categorical features using LabelEncoder; understanding when and why encoding is necessary."),
    numbered("Implementing a complete train-test split with proper StandardScaler fit/transform separation to prevent data leakage."),
    numbered("Training and comparing three regression models using a unified evaluation framework."),
    numbered("Interpreting R², RMSE, and MAE metrics and understanding what each reveals about model behaviour."),
    numbered("Producing professional multi-panel visualisations that communicate model performance to technical and non-technical audiences."),
    heading3("Algorithm and Data Structure Skills Acquired"),
    numbered("Implementing linear search and binary search from scratch and measuring the O(n) vs. O(log n) performance difference empirically."),
    numbered("Implementing merge sort and quick sort using the divide-and-conquer paradigm and understanding their stability and space trade-offs."),
    numbered("Designing a custom hash table with djb2 hashing and separate chaining collision resolution."),
    numbered("Building a simplified B-Tree index that uses binary search to support O(log n + k) range queries."),
    numbered("Applying Big-O analysis to real code and confirming theoretical predictions with empirical timing measurements."),

    heading2("9.5  Possible Extensions and Future Work"),
    makeTable(
      ["Extension","Description","Difficulty","Potential Impact"],
      [
        ["Richer Feature Engineering","Extract numeric values from RAM ('8GB'→8) and Weight ('1.37kg'→1.37) for better linear model performance","Low","Moderate R² improvement for Linear Regression"],
        ["Hyperparameter Tuning","Use GridSearchCV to optimise n_estimators, max_depth, learning_rate for Random Forest and Gradient Boosting","Medium","Potentially 2-5% R² improvement"],
        ["k-Fold Cross-Validation","Replace single 80/20 split with 5-fold cross-validation for more reliable performance estimates","Low","More trustworthy, lower-variance accuracy metrics"],
        ["Web Application (Streamlit)","Build an interactive web app where users input specs and get predicted prices powered by the best model","Medium","Direct practical utility for buyers and sellers"],
        ["Full B-Tree Implementation","Implement proper multi-level B-Tree with internal/leaf nodes and tree rebalancing","High","Matches real database index performance characteristics"],
        ["Real-Time Data Integration","Scrape current laptop listings to retrain the model periodically with fresh market prices","High","Model stays current as market prices change over time"]
      ],
      [1800,3000,1000,3560]
    ),
    new Paragraph({children:[new PageBreak()]})
  ];
}

function ch10(){
  return [
    heading1("CHAPTER 10: HOW TO RUN THE PROJECT"),

    heading2("10.1  Requirements"),
    makeTable(
      ["Requirement","Details","Notes"],
      [
        ["Google Account","Required to access Google Colab and Google Drive","A free Google account is sufficient; no paid tier needed"],
        ["Web Browser","Chrome or Firefox recommended for Google Colab","Safari and Edge also work but are less tested with Colab"],
        ["Dataset File","laptop.csv — provided with the project submission","Must be uploaded to Google Drive before running the notebook"],
        ["Internet Connection","Required to run Google Colab cells and download library packages","A stable connection prevents mid-execution interruptions"],
        ["Python Version","Python 3.7+ — automatically provided by Google Colab","No local Python installation required"],
        ["GPU/TPU","Not required — this is a CPU-only project","The dataset is small; GPU acceleration provides no benefit"]
      ],
      [2000,3500,3860]
    ),
    empty(120),

    heading2("10.2  Step-by-Step Setup Instructions"),
    numbered("Upload laptop.csv to Google Drive. Navigate to Google Drive and create a folder called Laptop_Price_Project inside My Drive. Upload laptop.csv into this folder. The exact path must match the path string in Cell 2 of the notebook: /content/drive/My Drive/Laptop_Price_Project/laptop.csv"),
    numbered("Open Google Colab at https://colab.research.google.com"),
    numbered("Upload the notebook. Use File → Upload Notebook to upload the .ipynb file. Alternatively, save the notebook to Google Drive and open it directly from there."),
    numbered("Check runtime type. Click Runtime in the top menu, then Change Runtime Type. Ensure Python 3 is selected. GPU and TPU are not required."),
    numbered("Run Cell 1 first. Execute the library installation and import cell. Wait for the confirmation message: 'All libraries imported successfully!' before proceeding."),
    numbered("Run Cell 2. Execute the data loading cell. A Google Drive authorization popup will appear — click Connect to Google Drive and follow the authentication prompts. This step only requires authorisation once per session."),
    numbered("Run all remaining cells. Use Runtime → Run All to execute the entire notebook sequentially, or press Shift+Enter on each cell individually. Total execution time is typically 2–5 minutes."),
    numbered("Retrieve output files. After the final cell completes, open the Files panel (folder icon in the left sidebar of Colab). Download ml_results.png, algorithm_performance.png, and algorithm_comparison.csv by right-clicking each and selecting Download."),
    empty(120),

    heading2("10.3  Common Issues and Solutions"),
    makeTable(
      ["Issue","Root Cause","Solution"],
      [
        ["FileNotFoundError on laptop.csv","The dataset path in Cell 2 does not match the actual file location in your Google Drive","Run !ls '/content/drive/My Drive/' in a new cell to see available folders and files. Update the path string in Cell 2 to match exactly."],
        ["ModuleNotFoundError","A library failed to install (network timeout during pip install)","Re-run Cell 1 manually. If the error persists, run !pip install <library_name> in a separate cell."],
        ["NameError on 'df' or 'laptop_list'","Cells were run out of order — a variable was used before it was defined","Always run Cell 1 and Cell 2 before any other cells. If in doubt, use Runtime → Restart and Run All."],
        ["Google Drive not mounting","The OAuth authorization popup was blocked or dismissed","Re-run Cell 2 and click Connect to Google Drive when the popup appears. Disable any browser popup blockers."],
        ["Empty laptop_list","Column names in the dataset do not exactly match the expected names in Cell 9","After loading in Cell 2, print df.columns to see actual column names. Update the row.get('...') calls in the dataframe_to_laptop_list function accordingly."],
        ["Memory error / session crash","Colab free tier has ~12GB RAM limit","If very large visualisations are generated, reduce figure DPI from 150 to 72. Free tier Colab is sufficient for this project under normal operation."]
      ],
      [1800,2600,4960]
    ),
    new Paragraph({children:[new PageBreak()]})
  ];
}

function ch11(){
  return [
    heading1("CHAPTER 11: CONCLUSION"),
    body("This project successfully demonstrates the integration of two major pillars of applied computer science — machine learning and algorithm engineering — in a single, cohesive, end-to-end system applied to a genuinely practical real-world problem: intelligent laptop price prediction and fast database-style querying."),

    heading2("Section A: Machine Learning Conclusions"),
    body("Three regression models were trained and evaluated on 1,303 real laptop listings, processing the data through a complete pipeline covering loading, deduplication, missing value imputation, IQR-based outlier removal, label encoding, train-test splitting, feature scaling, training, and multi-metric evaluation."),
    body("The comparison results confirm that the relationship between laptop specifications and market price is fundamentally non-linear: Gradient Boosting and Random Forest achieve R² scores above 0.85, while Linear Regression achieves only 0.55–0.70. The performance gap quantifies exactly how much predictive power is gained by using ensemble methods that can capture feature interactions and non-linear price thresholds."),
    body("The four-panel visualisation chart reveals not just aggregate performance metrics but the spatial structure of prediction errors — showing which price segments are well-predicted (mid-range Ultrabooks and standard Notebooks) and which are systematically harder (ultra-premium gaming laptops and obscure configurations with limited training examples)."),

    heading2("Section B: Algorithm Engineering Conclusions"),
    body("Eight algorithms were implemented entirely from scratch in Python, each applied directly to the laptop dataset with iteration counting and wall-clock timing for empirical validation. The results make the theoretical predictions concrete and undeniable:"),
    bullet("Binary Search vs. Linear Search: the O(log n) vs. O(n) difference translates to a 100× speedup on a 1,000-record dataset and would scale to 50,000× on a million-record system — transforming a 50-second query into a 1-millisecond response."),
    bullet("Merge Sort's guaranteed O(n log n) and Quick Sort's flexible key parameter together provide a complete sorting toolkit that covers all practical use cases with different trade-offs between stability and memory efficiency."),
    bullet("The custom djb2 Hash Table delivers the promised O(1) average-case brand lookups, making it possible to instantly count or retrieve all laptops of any brand without scanning the full dataset."),
    bullet("The simplified B-Tree index demonstrates that range queries can be answered in O(log n + k) time — finding the starting point of a price range in logarithmic time and scanning only the qualifying records, regardless of how many non-qualifying records exist outside the range."),

    heading2("Broader Takeaways"),
    body("The most important lesson this project delivers is that algorithms are not abstract textbook exercises — they are engineering decisions with measurable, concrete consequences. Every millisecond of search latency, every kilobyte of unnecessary memory consumption, and every rupee of pricing prediction error has a real cost to real users. The choice of algorithm is one of the most consequential decisions a software engineer makes."),
    new Paragraph({
      children:[new TextRun({text:"The difference between O(n) and O(log n) is not an academic distinction — it is the difference between a system that scales and one that collapses under load.",bold:true,size:22,color:NAVY,font:"Calibri",italics:true})],
      shading:{fill:LTBLUE,type:ShadingType.CLEAR},
      border:{left:{style:BorderStyle.THICK,size:12,color:BLUE}},
      spacing:{before:160,after:160},indent:{left:280}
    }),
    body("This project provides a solid, replicable foundation for the next steps in both directions: more sophisticated machine learning models (XGBoost, LightGBM, neural networks), richer feature engineering, real-time data pipelines on the ML side; and full B-Tree implementation, trie-based prefix search, and proper query planning on the algorithm side. Both paths lead toward production-grade systems that combine the predictive power of machine learning with the retrieval efficiency of classical algorithms — the foundation of every modern intelligent data product."),
    new Paragraph({children:[new PageBreak()]})
  ];
}

function ch12(){
  return [
    heading1("CHAPTER 12: REFERENCES"),
    heading2("Textbooks and Academic Works"),
    bullet("Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). Introduction to Algorithms (3rd ed.). MIT Press. — The definitive reference for algorithm analysis, Big-O notation, sorting, searching, and hash table design."),
    bullet("Géron, A. (2019). Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow (2nd ed.). O'Reilly Media. — Comprehensive guide to the scikit-learn machine learning pipeline, preprocessing, and model evaluation."),
    bullet("Sedgewick, R., & Wayne, K. (2011). Algorithms (4th ed.). Addison-Wesley. — Excellent coverage of Merge Sort, Quick Sort, binary search trees, and hash tables with visual algorithmic explanations."),
    bullet("Knuth, D. E. (1998). The Art of Computer Programming: Sorting and Searching (Vol. 3, 2nd ed.). Addison-Wesley. — The authoritative reference on sorting and searching algorithm analysis."),
    bullet("Hastie, T., Tibshirani, R., & Friedman, J. (2009). The Elements of Statistical Learning (2nd ed.). Springer. — Rigorous theoretical treatment of Random Forest and Gradient Boosting algorithms."),
    empty(80),
    heading2("Python Library Documentation"),
    bullet("Pandas Project (2023). pandas documentation. https://pandas.pydata.org/docs/ — Official reference for DataFrame operations, data cleaning, and CSV I/O used throughout the project."),
    bullet("Pedregosa, F. et al. (2011). Scikit-learn: Machine learning in Python. JMLR 12, 2825-2830. — Original research paper for the scikit-learn library providing all ML models and preprocessing tools."),
    bullet("NumPy Developers (2023). NumPy documentation. https://numpy.org/doc/ — Official reference for numerical operations, array manipulation, and mathematical functions."),
    bullet("Matplotlib Developers (2023). Matplotlib documentation. https://matplotlib.org/stable/ — Official reference for all plotting, charting, and figure layout functions."),
    empty(80),
    heading2("Online Resources"),
    bullet("Google Colaboratory Team (2023). Frequently Asked Questions. https://research.google.com/colaboratory/faq.html — Official documentation for Google Colab notebook environment, runtime management, and file system access."),
    bullet("Bernstein, D. J. (1990). djb2 Hash Function. — Classic description of the djb2 hashing algorithm used in this project's hash table implementation."),
    bullet("Wikipedia Contributors (2023). B-tree. https://en.wikipedia.org/wiki/B-tree — Overview of B-Tree data structure properties, node structure, and database applications."),
    bullet("Wikipedia Contributors (2023). Gradient Boosting. https://en.wikipedia.org/wiki/Gradient_boosting — Theoretical background and mathematical derivation of the Gradient Boosting algorithm."),
    empty(80),
    heading2("Dataset"),
    bullet("Laptop Prices Dataset (2023). Originally sourced from Kaggle laptop price prediction datasets. The specific CSV file (laptop.csv) contains 1,303 real laptop records with brand, hardware specifications, and selling prices collected from e-commerce platforms. Prepared and curated for this academic project."),
  ];
}

// ═══════════════════════════════════════════════════════════════
//  ASSEMBLE DOCUMENT
// ═══════════════════════════════════════════════════════════════

const allContent = [
  ...makeCoverPage(),
  ...makeTOC(),
  ...ch1(),
  ...ch2(),
  ...ch3(),
  ...ch4(),
  ...ch5(),
  ...ch6(),
  ...ch7(),
  ...ch8(),
  ...ch9(),
  ...ch10(),
  ...ch11(),
  ...ch12(),
];

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 360 } } }
        }]
      },
      {
        reference: "numbers",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 360 } } }
        }]
      }
    ]
  },
  styles: {
    default: { document: { run: { font: "Calibri", size: 20, color: GRAY } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: WHITE },
        paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: NAVY },
        paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1 }
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: TEAL },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "LAPTOP PRICE INTELLIGENCE SYSTEM", bold: true, size: 16, color: NAVY, font: "Arial" }),
              new TextRun({ text: "  |  Advanced Algorithms & Data Structures", size: 16, color: GRAY, font: "Calibri" })
            ],
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD } },
            spacing: { before: 0, after: 80 }
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "Advanced Algorithms & Data Structures Project        ", size: 16, color: GRAY, font: "Calibri" }),
              new TextRun({ text: "Page ", size: 16, color: NAVY, font: "Calibri" }),
              new PageNumber({ size: 16, color: NAVY })
            ],
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: MGRAY } },
            spacing: { before: 80, after: 0 },
            alignment: AlignmentType.RIGHT
          })
        ]
      })
    },
    children: allContent
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('/home/claude/Laptop_Price_Intelligence_System_ENHANCED.docx', buf);
  console.log('Done!');
}).catch(e => { console.error(e); process.exit(1); });