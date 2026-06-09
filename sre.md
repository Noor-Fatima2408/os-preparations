# Software Requirements

## Study Notes: Chapters 5, 6, 9, 10, 11, 12

### Karl Wiegers & Joy Beatty (3rd Edition)

### GCUF - Software Engineering

---

# CHAPTER 5: Establishing the Business Requirements

## Overview

- Business requirements describe the primary benefits that the new system will provide to sponsors, buyers, and users
- Business requirements directly influence which user requirements to implement and in what sequence
- Project is launched based on belief that creating/changing product will provide worthwhile benefits and suitable ROI

## Key Concepts

### 1. Product Vision and Project Scope

- Vision: What the product is intended to achieve
- Scope: What will and will not be included in the project
- Scope creep: Uncontrolled growth of project scope due to stakeholder requests

### 2. Conflicting Business Requirements

- Different stakeholders may have conflicting objectives and interests
- Example: Customer wants quick transactions; Retailer wants customers to linger
- BA role: Surface conflicts, flag conflicting objectives, facilitate resolution
- Decision makers must resolve conflicts - not the software team

### 3. Vision and Scope Document

- Owner: Executive sponsor or funding authority
- Input sources: Senior management, product visionary, product manager, SME, marketing
- Sets the stage for subsequent development work
- Alternative names: Project charter, business case, market requirements document (MRD)

### 4. Vision & Scope Document Template

- **Section 1: Business Requirements**
  - 1.1 Background - Rationale and context for the product
  - 1.2 Business Opportunity - Problem being solved or process being improved
  - 1.3 Business Objectives - Important measurable benefits (financial & non-financial)
  - 1.4 Success Metrics - Indicators to measure project success
- **Section 2: Scope and Limitations**
  - Defines boundaries of what's included and excluded
- **Section 3: Business Context**
  - Stakeholder descriptions, user profiles, operational environment

### 5. Business Objectives

- Must be measurable and quantifiable, not platitudes

- **Financial Examples:**
  - Capture X% market share within Y months
  - Achieve X% ROI within Y months
  - Save $X per year on maintenance

- **Non-Financial Examples:**
  - Achieve customer satisfaction measure of X within Y months
  - Increase productivity by X%, reduce error rate to Y%
  - Ranked as top product for reliability

### 6. Business Objectives Model

- Shows hierarchy of related business problems and objectives
- Problems: What's keeping business from meeting goals
- Objectives: How to measure achievement of those goals
- Ask 'What is keeping us from achieving X?' to identify problems
- Ask 'How will we assess if problem is solved?' to identify objectives

### 7. Success Metrics

- Factors that define and measure project success
- Can be tracked during testing or shortly after release
- Choose wisely - measure what's important, not just easy to measure

### 8. Scope Representation Techniques

- **Context Diagram:** Shows system and its interfaces with external entities
- **Ecosystem Map:** Illustrates system in broader business environment
- **Feature Tree:** Hierarchical breakdown of product features
- **Event List:** List of events that system must respond to

### 9. Scope Management

- Use business objectives to make scoping decisions
- Assess impact of scope changes on schedule, budget, and resources
- Address decision maker changes - revisit baseline requirements immediately

### 10. Vision and Scope on Agile Projects

- Still important to define business context and objectives
- May be shorter or lighter weight than traditional approach
- Use business objectives to determine project completion

---

# CHAPTER 6: Finding the Voice of the User

## Overview

- Understanding who will use the system is critical to success
- Different user classes have different needs and perspectives
- Need to represent all user voices in requirements development

## Key Concepts

### 1. User Classes

- Groups of users with similar characteristics and requirements
- Different from actors - focus on user community, not roles in use cases

- **Classifying Users by:**
  - Primary vs. secondary users
  - Frequency of use
  - Level of expertise
  - Physical location
  - Organization/business function

- **Primary Users:**
  - Directly affected by system operations
  - Use system regularly to perform business tasks

- **Secondary Users:**
  - Use system occasionally or indirectly
  - Maintain or support system

### 2. User Personas

- Fictional but realistic representations of user classes
- Make users concrete and memorable
- Include details: name, role, experience, goals, pain points
- Help team empathize with users

### 3. Product Champion

- Key user representative who provides voice of customer
- Authority to make decisions for their user class
- Available for ongoing consultation
- Committed to project success

- **External Product Champions:**
  - From user organization, not development organization
  - Provides authentic user perspective

### 4. Product Champion Expectations

- Be available for requirement discussions
- Represent user class accurately, not personal preferences
- Provide timely feedback
- Resolve conflicts within user class
- Participate in requirements validation

### 5. Multiple Product Champions

- One for each major user class
- Prevents one user perspective from dominating
- Improves customer satisfaction across user base

### 6. Product Champion Traps to Avoid

- Don't rely on single person to represent all users
- Avoid champions focused on their own agenda, not user class needs
- Challenge unrealistic or biased requirements
- Be alert for champions who want to redesign work processes

### 7. Selling the Product Champion Idea

- Explain time commitment and responsibilities
- Emphasize project success depends on good requirements
- Show how being involved ensures their needs are met

### 8. User Representation on Agile Projects

- Product owner represents user voice
- Close, continuous collaboration with development team
- Frequent feedback and validation

### 9. Resolving Conflicting Requirements

- Different user classes may have incompatible needs
- Involve decision makers and user representatives
- Look for creative solutions that satisfy all parties
- Prioritize requirements to resolve conflicts

---

# CHAPTER 9: Playing by the Rules

## Overview

- Business rules constrain system behavior and business practices
- Critical for system design and implementation
- Often overlooked in requirements gathering

## Key Concepts

### 1. Business Rules Definition

- Policy or practice constraints on how business operates
- Dictate what system can/cannot do
- Often derived from business, legal, or regulatory requirements
- Examples: Discount policies, workflow rules, access controls

### 2. Business Rules Taxonomy

- **Terms and Facts:**
  - Definitions of key business concepts
  - Attributes and relationships

- **Constraints:**
  - Restrictions on allowed values or relationships
  - Example: Customer credit limit cannot exceed $10,000

- **Action Enablers:**
  - Enable or trigger business processes
  - Example: Generate reorder alert when inventory below threshold

- **Computations:**
  - Calculate values based on other values
  - Example: Discount = Quantity * Unit Price * Discount Rate

- **Inference Rules:**
  - Derive new information from existing facts
  - Example: IF order total > $1000 THEN qualified for bulk discount

### 3. Documentation Approaches

- Structured text: Clear, natural language format
- Decision tables: Matrix of conditions and outcomes
- Decision trees: Graphical flow of decisions
- Use cases/scenarios: Show rules in context of business process

### 4. Sources of Business Rules

- Subject matter experts
- Legal and compliance regulations
- Industry best practices
- Competitive analysis
- Customer feedback

### 5. Key Considerations

- Business rules change more frequently than other requirements
- May be embedded in legacy systems - need to identify explicitly
- Distinguish between rules and functional requirements
- Separate rules from their implementation

---

# CHAPTER 10: Documenting the Requirements

## Overview

- Software Requirements Specification (SRS) - primary requirements document
- Communicates requirements to all stakeholders
- Reference for design, implementation, and testing
- Basis for change management and project tracking

## Key Concepts

### 1. Purpose of SRS

- Agreement document between customer and development team
- Input to design and implementation
- Baseline for test planning and execution
- Source for traceability matrix
- Historical record of system requirements

### 2. SRS Template Sections

- **1. Introduction**
  - Purpose of SRS
  - Scope of project
  - Definitions, acronyms, abbreviations
  - References
  - Overview of document

- **2. Overall Description**
  - Product perspective
  - Product functions
  - User classes and characteristics
  - Operating environment
  - Constraints
  - Assumptions and dependencies

- **3. Specific Requirements**
  - External interface requirements
  - Functional requirements
  - Performance requirements
  - Safety requirements
  - Security requirements
  - Software quality attributes

### 3. Characteristics of Good Requirements

- Necessary: Needed to meet business objectives
- Concise: Stated briefly and clearly
- Clear: Unambiguous
- Verifiable: Can be tested
- Consistent: No contradictions
- Feasible: Possible to implement
- Traceable: Can be traced to business objectives

### 4. Organizing Requirements

- By user class: Separate sections for each user group
- By feature: Group related functionality
- By priority: Important requirements first
- By type: Functional, performance, etc.

### 5. Requirement Format

- Numbered for traceability
- Unique identifier (e.g., REQ-5.3.2)
- Clear statement of requirement
- Priority assignment
- Optional: Source, rationale, notes

### 6. Template Tactics

- Use templates to ensure consistency
- Adapt template to project needs
- Fill sections as information becomes available
- Empty sections highlight knowledge gaps
- 'Shrink to fit' - keep only what's relevant

### 7. SRS on Agile Projects

- Requirements captured incrementally
- User stories in product backlog
- High-level requirements in beginning
- Detailed requirements emerge during sprints

---

# CHAPTER 11: Writing Excellent Requirements

## Overview

- Quality of individual requirements impacts entire project
- Poor requirements lead to poor products
- Need clear criteria for evaluating requirement quality

## Key Concepts

### 1. Characteristics of High-Quality Requirements

- **Atomic:**
  - Single, indivisible piece of functionality
  - Avoid 'and' to link separate requirements

- **Complete:**
  - Contains all necessary information
  - Reader doesn't need other documents to understand

- **Consistent:**
  - No contradictions with other requirements
  - Terminology used consistently

- **Feasible:**
  - Can be implemented with available resources
  - Acknowledge trade-offs

- **Necessary:**
  - Required to meet business objectives
  - Not 'nice to have' features

- **Unambiguous:**
  - Single interpretation
  - Clear language
  - Avoid vague terms like 'fast', 'easy', 'user-friendly'

- **Verifiable:**
  - Can be tested or inspected
  - Quantifiable acceptance criteria
  - Avoid subjective requirements

### 2. Writing Functional Requirements

- Describe what system must do
- Use 'shall' to indicate mandatory requirements
- Use 'should' for optional or desirable features
- Specify inputs, processing, and outputs
- Include acceptance criteria

### 3. Writing Non-Functional Requirements

- Describe how system performs (performance, reliability, usability)
- Must be quantifiable
- Examples: Response time < 2 seconds, 99.9% availability
- Include performance metrics, security standards

### 4. Common Requirement Problems

- **Gold Plating:**
  - Adding unnecessary features
  - Increases cost and complexity

- **Assumed Requirements:**
  - Features team assumes are needed
  - Never explicitly stated or validated

- **Design Embedded in Requirements:**
  - Prescribes how instead of what
  - Limits design flexibility

- **Over-specification:**
  - Too much detail for requirements level
  - Better suited for design documentation

### 5. Requirement Statements

- Use imperative mood: 'The system shall...'
- Be specific with quantities and thresholds
- Avoid vague terms: 'fast', 'robust', 'easy'
- Use positive statements when possible
- Separate independent requirements

### 6. Requirement Quality Review

- Is it necessary?
- Is it feasible?
- Is it verifiable?
- Is it clear?
- Is it consistent with others?
- Is it atomic?

---

# CHAPTER 12: A Picture is Worth 1024 Words

## Overview

- Visual models supplement textual requirements
- Different people understand information differently
- Visual representations clarify complex concepts
- Models facilitate communication with stakeholders

## Key Concepts

### 1. Types of Modeling Approaches

- **Data Flow Diagram (DFD):**
  - Shows how data moves through system
  - Processes, data stores, external entities
  - Useful for functional decomposition

- **Entity-Relationship Diagram (ERD):**
  - Shows data structure and relationships
  - Entities and their attributes
  - Cardinality and relationships

- **Use Case Diagrams:**
  - Shows user interactions with system
  - Actors and use cases
  - Relationships and dependencies

- **State Diagrams:**
  - Shows system states and transitions
  - Useful for state machines
  - Events that trigger state changes

- **Class Diagrams:**
  - Object-oriented structure
  - Classes, attributes, and relationships
  - Inheritance and associations

- **Sequence Diagrams:**
  - Shows interaction sequences
  - Message passing between objects
  - Timing of interactions

### 2. Context Diagram

- Shows system as black box
- System and external entities
- Data flows between them
- Establishes system boundaries

### 3. Prototyping and Models

- Prototypes show user interface
- Mockups and wireframes
- Interactive prototypes for validation
- Helps clarify requirements through visualization

### 4. Model Quality

- Consistent notation
- Clear and readable
- Complete representation
- Not too detailed or too abstract
- Validated with stakeholders

### 5. When to Use Models

- Clarifying complex processes
- Communicating with stakeholders
- Identifying missing requirements
- Supporting traceability
- Design and implementation guidance

### 6. Modeling in Agile

- Lightweight models
- Quick sketches and diagrams
- Just enough detail for communication
- Disposable models that support conversation

---

**END OF NOTES**
