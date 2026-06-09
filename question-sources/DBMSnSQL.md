DBMS & SQL

SDE Fresher Interview Question Bank

Product & service-based company interviews  -  India 2026 cycle

Complete, interview-ready coverage of Database Management Systems and SQL for fresher SDE
interviews - from normalization and ACID to indexing (B+ trees), transaction isolation, concurrency
control, and the multi-table JOIN / window-function / CTE queries that dominate company SQL
rounds. DBMS is the most-asked theory subject after OS, and SQL shows up in nearly every backend
interview - this volume covers both.

Prepared for: Harsh Rao - BITS Pilani Goa, SDE-1 prep
Volume 2 of 5 - Core CS Interview Series - June 2026
Total questions in this volume: 205
Each question carries a difficulty tag [Easy / Medium / Hard] and, where verifiable, a company / source tag.

How to use this question bank

This volume is a question bank, not a textbook. Every entry is phrased the way an interviewer would actually say

it out loud, followed by a model answer written the way a strong candidate would answer verbally - concept first,

then an example, then the edge case or comparison that earns the extra marks.

Difficulty  tags.  [Easy]  =  definition  /  one-liner  an  interviewer  expects  instantly.  [Medium]  =  needs  a  structured

explanation  or  a  small  example.  [Hard]  =  trade-off  reasoning,  numericals,  or  a  follow-up  that  separates  strong

candidates.

Company / source tags. Where a question is closely associated with a specific company or appears repeatedly in

public  interview  experiences,  it  is  tagged  (e.g.  "Asked  at  Amazon").  Untagged  questions  are  part  of  the

universally-asked core - assume any company can ask them.

How to study. First pass: read the question, answer it out loud before reading the model answer, then compare.

Second  pass:  drill  only  the  [Medium]  and  [Hard]  entries.  Final  pass  (night  before):  skim  the  [Easy]  tags  so  the

definitions are instant.

DBMS & SQL  |  SDE Fresher Question Bank

Page 2

Table of Contents

1. DBMS Fundamentals & Architecture

2. ER Model, Relational Mapping & Integrity

3. Keys & Constraints

4. Normalization

5. Transactions & ACID

6. Concurrency Control

7. Indexing & Storage

8. SQL: Queries & Operators

9. SQL: Window Functions, CTEs & Classic Problems

10. NoSQL, CAP Theorem & Scaling

11. Practical, Optimization & Synthesis

4

7

10

12

16

19

22

26

31

35

38

DBMS & SQL  |  SDE Fresher Question Bank

Page 3

1. DBMS Fundamentals & Architecture

Definitions and the mental model of how a database is layered. Interviewers use these to confirm you understand why a
DBMS exists before drilling into normalization and transactions. Be crisp - most of these are warm-ups.

Q1. [Easy]  What is a DBMS, and how is it different from a plain file system?
n Universally asked opener
MODEL ANSWER
A  DBMS  is  software  that  lets  you  define,  store,  query,  and  manage  data  in  a  structured,  controlled  way  -  it  sits
between applications and the raw data and handles storage, retrieval, integrity, concurrency, and security for you.

Versus a file system: with flat files, the application must know the file format and handle everything itself, and you get
heavy data redundancy, no enforced relationships or constraints, no concurrent-access control, weak security, and no
query language. A DBMS solves all of these - it removes redundancy via normalization, enforces integrity constraints,
lets many users safely access data at once through transactions, and gives you a declarative query language (SQL).

Q2. [Medium]  What are the main advantages of a DBMS over a file-based system?
MODEL ANSWER
Controlled  redundancy  -  data  is  stored  once  and  referenced,  instead  of  duplicated  across  files.  Data  integrity  and
consistency - constraints (keys, types, checks) are enforced centrally. Concurrent access - transactions with ACID let
many users read/write safely. Data security - fine-grained access control per user/role. Data independence - you can
change storage without rewriting applications. Backup and recovery - built-in mechanisms restore a consistent state
after failure. Plus a standard query language instead of custom file-parsing code in every app.

Q3. [Medium]  What's the difference between DBMS and RDBMS?
n Commonly asked
MODEL ANSWER
An  RDBMS  is  a  DBMS  that  follows  the  relational  model  -  data  is  organised  into  tables  (relations)  of  rows  and
columns, with relationships expressed via keys, and it supports SQL. A plain DBMS is the broader category and may
store data as files, hierarchies, or networks without the relational structure.

Key  practical  differences:  an  RDBMS  enforces  relationships  and  referential  integrity  through  foreign  keys,  supports
normalization,  and  guarantees  ACID;  older/simpler  DBMSs  may  not.  Examples:  MySQL,  PostgreSQL,  Oracle  are
RDBMSs; a simple file-based or hierarchical store is a DBMS but not relational.

Q4. [Medium]  Explain the three-schema (ANSI-SPARC) architecture.
MODEL ANSWER
It separates a database into three levels to provide data independence. The internal (physical) level describes how
data is physically stored - files, indexes, compression. The conceptual (logical) level describes what data is stored
and  the  relationships  -  the  whole  schema  of  tables  and  constraints,  abstracted  from  storage.  The  external  (view)
level describes how individual users/applications see the data - customised, restricted views.

The benefit is isolation between levels: you can change storage (internal) without touching the logical schema, and
change  the  logical  schema  without  breaking  every  user  view.  That  separation  is  exactly  what  gives  us  data
independence.

Q5. [Medium]  What is data abstraction in a DBMS?
MODEL ANSWER
Data abstraction is hiding the complex details of how data is stored and maintained, exposing only what users need. It
maps  onto  the  three  levels:  the  physical  level  (lowest  -  how  bytes  sit  on  disk),  the  logical  level  (what  data  and
relationships exist), and the view level (the highest - tailored slices of the data for specific users). A developer writes
SQL against the logical/view level and never worries about B+ tree pages or file layout - that's the abstraction doing its
job.

DBMS & SQL  |  SDE Fresher Question Bank

Page 4

Q6. [Medium]  What is data independence, and what's the difference between logical and physical data
independence?
MODEL ANSWER
Data independence is the ability to change the schema at one level without altering the level above it. Physical data
independence - you can change how data is stored (add an index, change the file organisation, repartition) without
changing the logical schema or applications; this is easy and common. Logical data independence - you can change
the  logical  schema  (add  a  column,  split  a  table)  without  breaking  the  external  views/applications;  this  is  harder
because apps depend directly on the logical structure. The three-schema architecture is what makes both possible.

Q7. [Easy]  What are DDL, DML, DCL, and TCL?
n Asked at service & product companies
MODEL ANSWER
They're  the  categories  of  SQL  commands.  DDL  (Data  Definition  Language)  defines  structure  -  CREATE,  ALTER,
DROP,  TRUNCATE.  DML  (Data  Manipulation  Language)  works  with  the  data  -  SELECT,  INSERT,  UPDATE,
DELETE.  DCL  (Data  Control  Language)  manages  permissions  -  GRANT,  REVOKE.  TCL  (Transaction  Control
Language)  manages  transactions  -  COMMIT,  ROLLBACK,  SAVEPOINT.  (Some  classify  SELECT  separately  as
DQL.) A common follow-up: TRUNCATE is DDL, not DML, which is why it can't be rolled back as easily and resets
faster than DELETE.

Q8. [Easy]  What's the difference between a schema and an instance?
MODEL ANSWER
A  schema  is  the  design  of  the  database  -  the  structure:  tables,  columns,  types,  constraints,  and  relationships.  It
changes rarely. An instance is the actual data in the database at a particular moment - the rows currently stored. It
changes  constantly  as  data  is  inserted,  updated,  and  deleted.  Analogy:  the  schema  is  like  a  class  definition;  an
instance is like the objects (data) at runtime.

Q9. [Easy]  What is the data dictionary (metadata)?
MODEL ANSWER
The  data  dictionary  is  the  database's  catalogue  of  metadata  -  'data  about  data.'  It  stores  definitions  of  all  tables,
columns, data types, constraints, indexes, views, users, and privileges. The DBMS itself reads it to parse and execute
queries  (to  know  what  'employees.salary'  means  and  that  a  constraint  exists).  In  SQL  you  can  query  it  via  the
information_schema / system catalog views.

Q10. [Easy]  What does a Database Administrator (DBA) do?
MODEL ANSWER
The  DBA  manages  the  database  system:  schema  design  and  changes,  user/role  and  permission  management,
performance tuning (indexes, query optimisation), backup and recovery planning, capacity and storage management,
security,  and  monitoring  availability.  In  short,  they  keep  the  database  correct,  fast,  secure,  and  recoverable  -  the
operational owner of the data layer.

Q11. [Easy]  Explain the relational model - relation, tuple, attribute, domain, degree, cardinality.
MODEL ANSWER
The relational model represents data as relations (tables). A relation is a table; a tuple is a row; an attribute is a
column;  a  domain  is  the  set  of  allowed  values  for  an  attribute  (its  type/constraints).  The  degree  of  a  relation  is  its
number of attributes (columns); the cardinality is its number of tuples (rows). It's worth knowing these exact terms
because interviewers sometimes use them precisely and expect you to follow.

Q12. [Easy]  What is SQL, and what are its sublanguages?
MODEL ANSWER
SQL (Structured Query Language) is the standard declarative language for relational databases - you specify what
data  you  want,  not  how  to  fetch  it,  and  the  engine's  optimiser  figures  out  the  execution.  Its  sublanguages  are  DDL
(define  structure),  DML  (manipulate  data),  DCL  (permissions),  TCL  (transactions),  and  DQL  (the  SELECT  query).
'Declarative'  is  the  key  word  -  it's  why  the  same  query  can  run  very  differently  depending  on  indexes  and  the
optimiser.

DBMS & SQL  |  SDE Fresher Question Bank

Page 5

Q13. [Easy]  What's the difference between a database, a schema, and a table?
MODEL ANSWER
A  table  is  a  single  collection  of  rows  and  columns  for  one  entity  (e.g.  Employees).  A  schema  is  a  namespace  that
groups related tables, views, and other objects together (e.g. an 'hr' schema containing Employees, Departments). A
database  is  the  overall  container  holding  one  or  more  schemas  plus  all  their  data  and  metadata.  So  the  nesting  is
database -> schema -> table -> rows. (Note 'schema' here means a namespace, which is a slightly different use from
'schema = design'.)

Q14. [Easy]  What is data redundancy and why is it a problem?
MODEL ANSWER
Data redundancy is storing the same piece of data in multiple places. It's a problem because it wastes storage and,
more  importantly,  causes  inconsistency:  if  a  customer's  address  is  duplicated  across  many  rows  and  you  update
only some, the copies disagree and you no longer know which is correct. It also causes update, insertion, and deletion
anomalies. Normalization exists precisely to control redundancy by storing each fact once.

Q15. [Medium]  What is a NULL value, and why is it tricky?
MODEL ANSWER
NULL represents missing, unknown, or inapplicable data - it is not zero and not an empty string. It's tricky because it
uses three-valued logic: comparisons with NULL yield UNKNOWN, not true/false. So NULL = NULL is not true - you
must  use  IS  NULL.  Aggregates  like  COUNT(column)  skip  NULLs,  and  NOT  IN  with  a  NULL  in  the  list  can  silently
return  no  rows.  These  gotchas  are  a  favourite  interview  trap,  so  always  handle  NULLs  explicitly  with  IS  NULL  /
COALESCE.

Q16. [Easy]  What are the different types of database models?
MODEL ANSWER
Hierarchical  (tree  structure,  parent-child,  like  old  IMS),  Network  (graph  of  records  with  multiple  parents),  Relational
(tables  with  keys  -  the  dominant  model),  Object-oriented  (objects  as  in  OOP),  and  the  modern  NoSQL  families
(document,  key-value,  column-family,  graph).  The  relational  model  won  for  general-purpose  use  because  of  its
simplicity,  mathematical  foundation,  and  SQL;  NoSQL  models  trade  some  of  that  for  scale  or  flexibility  on  specific
workloads.

Q17. [Easy]  What is a transaction in a database?
MODEL ANSWER
A transaction is a single logical unit of work - a sequence of one or more operations (reads/writes) that must execute
as an all-or-nothing whole. The classic example is a bank transfer: debit one account and credit another; either both
happen or neither does, never just one. Transactions are bounded by BEGIN and COMMIT (success) or ROLLBACK
(undo), and the DBMS guarantees their ACID properties.

DBMS & SQL  |  SDE Fresher Question Bank

Page 6

2. ER Model, Relational Mapping & Integrity

How real-world requirements become tables. Expect attribute types, weak entities, cardinality, ER-to-table mapping
(especially M:N), and the integrity constraints that keep data valid. Referential integrity and foreign-key cascades are
frequent follow-ups.

Q18. [Easy]  What is the ER (Entity-Relationship) model?
MODEL ANSWER
The  ER  model  is  a  high-level,  diagram-based  way  to  design  a  database  by  describing  the  real  world  as  entities
(things,  e.g.  Student,  Course),  their  attributes  (properties,  e.g.  name,  age),  and  the  relationships  between  them
(e.g.  a  Student  enrolls  in  a  Course).  It's  a  blueprint  you  draw  before  creating  tables,  and  it  maps  cleanly  onto  the
relational model - entities and relationships become tables.

Q19. [Easy]  What's the difference between an entity, an entity set, and an attribute?
MODEL ANSWER
An entity is a single distinguishable real-world object (one specific student). An entity set is the collection of all entities
of the same type (all students) - it maps to a table. An attribute is a property describing the entity (the student's name,
roll number). So entity : entity set : attribute is roughly row : table : column.

Q20. [Medium]  What are the different types of attributes in the ER model?
MODEL ANSWER
Simple/atomic - can't be divided (age). Composite - made of sub-parts (Name = first + last; Address = street + city +
zip).  Single-valued  vs  multivalued  -  one  value  vs  many  (one  date  of  birth,  but  possibly  multiple  phone  numbers).
Derived - computed from others rather than stored (age derived from date of birth). Key attribute - uniquely identifies
an  entity.  Multivalued  and  composite  attributes  matter  because  they  change  how  you  map  to  tables  (a  multivalued
attribute usually becomes its own table).

Q21. [Medium]  What's the difference between a strong and a weak entity?
n Commonly asked
MODEL ANSWER
A  strong  entity  has  its  own  primary  key  and  exists  independently  (Employee).  A  weak  entity  cannot  be  uniquely
identified by its own attributes alone - it depends on a strong ('owner') entity and is identified by a partial key combined
with the owner's key. Classic example: a Dependent of an employee - two employees could both have a dependent
named 'Alex', so Dependent needs Employee's key plus the name to be unique.

In  diagrams  a  weak  entity  is  drawn  with  a  double  rectangle  and  connects  via  an  identifying  relationship.  When
mapping, the weak entity's table includes the owner's primary key as part of its own composite primary key (and as a
foreign key).

Q22. [Medium]  What is cardinality in a relationship (1:1, 1:N, M:N)?
MODEL ANSWER
Cardinality  describes  how  many  entities  on  one  side  relate  to  entities  on  the  other.  One-to-one  (1:1)  -  each  entity
relates to at most one on the other side (a person and a passport). One-to-many (1:N) - one entity relates to many (a
department  has  many  employees,  each  employee  in  one  department).  Many-to-many  (M:N)  -  both  sides  relate  to
many (students and courses). The cardinality decides where the foreign key goes - and M:N always needs a separate
junction table.

Q23. [Medium]  What is a participation constraint (total vs partial)?
MODEL ANSWER
Participation says whether every entity must take part in a relationship. Total participation (drawn as a double line)
means every entity must participate - e.g. every Loan must belong to a Customer, so a loan can't exist without one.
Partial participation means participation is optional - e.g. not every Customer has a Loan. Total participation often
translates into a NOT NULL foreign key when mapping to tables.

DBMS & SQL  |  SDE Fresher Question Bank

Page 7

Q24. [Medium]  What is the degree of a relationship (unary, binary, ternary)?
MODEL ANSWER
Degree is the number of entity sets participating in a relationship. Unary/recursive - one entity set relates to itself (an
Employee  'manages'  another  Employee).  Binary  -  two  entity  sets  (Student  enrolls  in  Course);  by  far  the  most
common.  Ternary  -  three  entity  sets  in  one  relationship  (Doctor  prescribes  Drug  to  Patient).  Higher-degree
relationships are rarer and often decomposed into binary ones.

Q25. [Hard]  How do you map an ER diagram to relational tables?
MODEL ANSWER
The  standard  rules:  each  strong  entity  becomes  a  table  with  its  attributes  and  its  primary  key.  Each  weak  entity
becomes  a  table  including  the  owner's  primary  key  as  part  of  a  composite  key.  Multivalued  attributes  become  a
separate table.

For relationships: 1:1 - add the key of one side as a foreign key in the other (prefer the total-participation side). 1:N -
put the 'one' side's primary key as a foreign key in the 'many' side's table. M:N - create a new junction table containing
both  entities'  primary  keys  as  a  composite  key  plus  any  relationship  attributes.  This  systematic  mapping  is  exactly
what interviewers want to hear.

Q26. [Medium]  How specifically do you map a many-to-many relationship?
n Asked at Amazon, Flipkart
MODEL ANSWER
You  can't  represent  M:N  with  a  foreign  key  on  either  side,  so  you  create  a  third  junction  (associative)  table.  For
Students <-> Courses, you make an Enrollment table with student_id and course_id (each a foreign key to its parent),
and the combination forms the composite primary key. Any data about the relationship itself - like enrollment_date or
grade - lives in this junction table. This is one of the most practically important mappings and comes up constantly in
schema-design questions.

Q27. [Medium]  How do you map a weak entity to a table?
MODEL ANSWER
Create a table for the weak entity that includes its own (partial key) attributes plus the primary key of its owning strong
entity.  The  primary  key  of  the  weak  entity's  table  is  the  combination  of  the  owner's  key  and  its  partial  key,  and  the
owner's  key  is  also  a  foreign  key  (usually  with  ON  DELETE  CASCADE,  since  a  weak  entity  shouldn't  outlive  its
owner). Example: Dependent(employee_id, dependent_name, ...) with primary key (employee_id, dependent_name).

Q28. [Medium]  What are generalization, specialization, and aggregation?
MODEL ANSWER
Specialization is top-down: you take an entity and split it into sub-entities with more specific attributes (Employee ->
Engineer,  Manager).  Generalization  is  the  bottom-up  reverse:  you  find  common  attributes  across  entities  and
combine them into a higher-level entity (Car and Truck -> Vehicle). Both create an 'is-a' hierarchy - the ER analogue
of  inheritance.  Aggregation  is  treating  a  whole  relationship  as  a  single  higher-level  entity  so  it  can  participate  in
another  relationship  (e.g.  a  'works-on'  relationship  between  Employee  and  Project,  aggregated  so  a  Manager  can
relate to it).

Q29. [Medium]  What are integrity constraints, and what are the main types?
MODEL ANSWER
Integrity  constraints  are  rules  the  DBMS  enforces  to  keep  data  valid  and  consistent.  Domain  constraint  -  each
attribute  value  must  come  from  its  allowed  domain/type  (and  CHECK  conditions).  Key  constraint  -  primary  key
values must be unique. Entity integrity - a primary key cannot be NULL. Referential integrity - a foreign key must
match an existing primary key in the referenced table (or be NULL). The engine rejects any insert/update/delete that
would violate these, which is how the database protects itself from bad data.

Q30. [Easy]  What is entity integrity?
MODEL ANSWER
Entity  integrity  is  the  rule  that  no  part  of  a  primary  key  can  be  NULL.  The  reasoning:  the  primary  key  uniquely
identifies each row, and NULL means unknown/missing - so a NULL key would make a row unidentifiable and could
allow  indistinguishable  duplicates.  The  DBMS  enforces  this  automatically  by  rejecting  NULLs  in  any  primary-key
column.

DBMS & SQL  |  SDE Fresher Question Bank

Page 8

Q31. [Medium]  What is referential integrity, and what does ON DELETE CASCADE do?
n Commonly asked
MODEL ANSWER
Referential integrity ensures a foreign key always points to a row that actually exists (or is NULL) - you can't have an
Order referencing a customer_id that doesn't exist in Customers. The DBMS blocks inserts of orphan references and
prevents deleting a parent row that still has children, unless you specify a referential action.

ON  DELETE  CASCADE  is  one  such  action:  when  the  parent  row  is  deleted,  all  child  rows  referencing  it  are
automatically deleted too (delete a customer -> their orders go too). Alternatives are ON DELETE SET NULL (set the
FK to NULL) and ON DELETE RESTRICT/NO ACTION (forbid the delete). Choosing the right action is a real design
decision.

Q32. [Easy]  What is a domain constraint / CHECK constraint?
MODEL ANSWER
A domain constraint restricts the values an attribute can hold - first by its data type, and further by a CHECK constraint
that enforces a condition. For example CHECK (age >= 18) rejects any row with an age below 18, and CHECK (status
IN ('ACTIVE','CLOSED')) limits a column to specific values. It pushes validation into the database so bad data can't
get in regardless of which application writes it.

Q33. [Medium]  What is relational algebra, and what are its core operations?
MODEL ANSWER
Relational algebra is the formal, procedural query language underlying SQL - a set of operations that take relations as
input and produce a relation as output. Core operations: Selection (sigma) filters rows by a condition; Projection (pi)
picks columns; Union, Intersection, Difference are set operations; Cartesian product (x) pairs every row with every
row;  Join  combines  related  rows;  and  Rename.  SQL  is  essentially  a  friendly  declarative  wrapper  over  these  -  a
WHERE is a selection, a column list is a projection, and so on.

Q34. [Medium]  What's the difference between relational algebra and relational calculus?
MODEL ANSWER
Relational  algebra  is  procedural  -  you  specify  the  sequence  of  operations  (how  to  compute  the  result:  first  select,
then project, then join). Relational calculus is declarative/non-procedural - you describe what you want using logic
(predicates) without specifying the steps. Both have the same expressive power (relational completeness). SQL leans
declarative like calculus in style, but the optimiser internally turns it into algebra-like operations to execute.

Q35. [Medium]  What are the different types of joins in relational algebra (theta, equi, natural)?
MODEL ANSWER
A theta join combines rows from two relations on any condition (=, <, >, etc.). An equi join is the special case where
the condition uses only equality. A natural join is an equi join on all columns with the same name, automatically, and
it removes the duplicate column from the result. These map to SQL: a theta join is JOIN ... ON with any predicate, an
equi join is the common JOIN ... ON a.x = b.x, and a natural join is NATURAL JOIN (rarely used in practice because
implicit column matching is error-prone).

DBMS & SQL  |  SDE Fresher Question Bank

Page 9

3. Keys & Constraints

Keys are tiny but interviewers test precision here - the super/candidate/primary distinction, primary vs unique, and the
NULL rules. Be exact; sloppy key definitions are a quick way to look shaky.

Q36. [Easy]  What is a super key?
MODEL ANSWER
A  super  key  is  any  set  of  one  or  more  attributes  that  uniquely  identifies  a  row  in  a  table.  It  may  contain  extra,
unnecessary  attributes  -  {roll_no},  {roll_no,  name},  and  {roll_no,  name,  email}  are  all  super  keys  if  roll_no  alone  is
unique. So 'super key' is the broadest notion of uniqueness; trimming it down to the minimal form gives a candidate
key.

Q37. [Medium]  What is a candidate key?
MODEL ANSWER
A  candidate  key  is  a  minimal  super  key  -  a  set  of  attributes  that  uniquely  identifies  a  row  and  has  no  redundant
attribute  (remove  any  attribute  and  it  stops  being  unique).  A  table  can  have  several  candidate  keys;  for  example  a
Student table might have both roll_no and email as candidate keys. From these, one is chosen as the primary key and
the rest become alternate keys.

Q38. [Easy]  What is a primary key?
n Universally asked
MODEL ANSWER
A primary key is the candidate key chosen to be the main unique identifier for a table's rows. It must be unique and
NOT NULL (entity integrity), and there's exactly one per table. Most databases automatically create a clustered index
on it, which is why lookups by primary key are fast.

Q39. [Medium]  What's the difference between a primary key and a unique key?
n Asked at Amazon, Microsoft - very common
MODEL ANSWER
Both enforce uniqueness, but: a primary key cannot contain NULLs and there's only one per table; a unique key can
hold one NULL (or several, depending on the DBMS) and you can have many unique keys per table. The primary key
is the chosen main identifier (and usually the clustered index); unique keys enforce uniqueness on other columns that
aren't the main identifier - like making 'email' unique while 'id' is the primary key.

Q40. [Easy]  What is a foreign key?
MODEL ANSWER
A foreign key is a column (or set of columns) in one table that references the primary key of another table, creating a
link  between  them  and  enforcing  referential  integrity.  For  example  Orders.customer_id  is  a  foreign  key  referencing
Customers.id - the database won't let you insert an order for a customer who doesn't exist, or (without a cascade rule)
delete a customer who still has orders. A foreign key can be NULL (meaning 'no relationship'), unlike a primary key.

Q41. [Easy]  What is a composite (compound) key?
MODEL ANSWER
A composite key is a key made of two or more columns together, because no single column is unique on its own. The
classic case is a junction table: in Enrollment(student_id, course_id), neither column alone is unique (a student takes
many courses, a course has many students), but the combination is - so the primary key is (student_id, course_id).

Q42. [Easy]  What is an alternate key?
MODEL ANSWER
An alternate key is a candidate key that was not chosen as the primary key. If a table has candidate keys roll_no and
email  and  you  pick  roll_no  as  primary,  then  email  is  the  alternate  key.  Alternate  keys  are  typically  enforced  with  a
UNIQUE constraint so they still guarantee uniqueness.

Q43. [Medium]  What's the difference between a natural key and a surrogate key?
MODEL ANSWER
A  natural  key  is  a  primary  key  drawn  from  real-world  data  that  already  exists  -  like  an  email,  SSN,  or  ISBN.  A
surrogate key is an artificial identifier with no business meaning, generated by the system - typically an auto-increment
integer or UUID.

DBMS & SQL  |  SDE Fresher Question Bank

Page 10

Surrogate  keys  are  usually  preferred  as  primary  keys  because  they're  stable  (real-world  values  change  -  people
change emails), compact, and never have NULL/uniqueness surprises. The trade-off is they carry no meaning and
you often still need a unique constraint on the natural key. Most production schemas use surrogate primary keys.

Q44. [Medium]  Can a primary key be NULL? Can a foreign key be NULL?
MODEL ANSWER
A  primary  key  can  never  be  NULL  -  that's  the  entity-integrity  rule,  since  a  NULL  couldn't  reliably  identify  a  row.  A
foreign  key,  however,  can  be  NULL:  a  NULL  foreign  key  simply  means  'this  row  isn't  related  to  anything  yet'  -  for
example an Employee whose manager_id is NULL (the CEO has no manager). If a foreign key is non-NULL, it must
match an existing primary key in the referenced table.

Q45. [Easy]  Can a table have more than one primary key? More than one unique key?
MODEL ANSWER
No to multiple primary keys - a table has at most one primary key (though that one key can be composite, spanning
multiple  columns,  which  people  sometimes  confuse  with  'multiple  primary  keys').  Yes  to  multiple  unique  keys  -  you
can place UNIQUE constraints on as many columns/column-sets as you like. So one primary key, many unique keys.

Q46. [Hard]  Given functional dependencies, how do you find the candidate keys?
MODEL ANSWER
Compute  attribute  closures.  First,  attributes  that  never  appear  on  the  right-hand  side  of  any  FD  must  be  in  every
candidate key - start with them. Take that set's closure (all attributes it can determine via the FDs); if the closure is all
attributes, it's a candidate key.

If not, add other attributes one at a time and recompute the closure until you reach the full set, keeping only minimal
combinations.  Example:  R(A,B,C,D)  with  A->B,  B->C,  C->D.  A  appears  nowhere  on  the  right,  A+  =  {A,B,C,D}  =
everything, so A is the sole candidate key. The closure algorithm is the reliable, mechanical way to do this.

Q47. [Easy]  What's the core difference between a primary key and a foreign key in one line each?
MODEL ANSWER
Primary  key  -  uniquely  identifies  each  row  within  its  own  table;  unique,  not  null,  one  per  table.  Foreign  key  -  a
reference  to  a  primary  key  in  another  (or  the  same)  table  that  enforces  a  relationship;  can  be  null  and  can  have
duplicate values. Primary key is about identity; foreign key is about linkage.

DBMS & SQL  |  SDE Fresher Question Bank

Page 11

4. Normalization

The single most-asked DBMS topic. You must be able to define each normal form, give an example of the anomaly it
removes, normalize a messy table on the spot, and explain the 3NF-vs-BCNF distinction plus when denormalization is
the right call.

Q48. [Medium]  What is normalization and why do we do it?
n Asked at Amazon, Microsoft, Flipkart - the headline DBMS question
MODEL ANSWER
Normalization is the process of organising tables to minimise data redundancy and eliminate update anomalies, by
decomposing larger tables into smaller related ones based on functional dependencies. Each fact is stored in exactly
one place.

We do it to avoid three problems caused by redundancy: insertion anomaly (can't add data because other unrelated
data  is  missing),  update  anomaly  (must  change  the  same  fact  in  many  rows,  risking  inconsistency),  and  deletion
anomaly (deleting a row accidentally loses unrelated facts). The trade-off is more joins at query time, which is why we
sometimes denormalize for read performance.

Q49. [Medium]  What is a functional dependency?
MODEL ANSWER
A functional dependency X -> Y means that the value of attribute set X uniquely determines the value of attribute set Y
-  for  any  two  rows  with  the  same  X,  the  Y  values  must  be  equal.  For  example  in  a  Student  table,  roll_no  ->  name
means every roll number maps to exactly one name. FDs express the business rules that drive normalization: they tell
you which attributes belong together and where redundancy hides.

Q50. [Medium]  What are trivial and non-trivial functional dependencies?
MODEL ANSWER
A functional dependency X -> Y is trivial if Y is a subset of X (e.g. {roll_no, name} -> name) - it's always true and
carries no information. It's non-trivial if Y is not a subset of X (roll_no -> name), and completely non-trivial if X and
Y share no attributes at all. Normalization only cares about non-trivial dependencies, since those are the ones that
can cause redundancy.

Q51. [Medium]  What's the difference between a partial dependency and a transitive dependency?
MODEL ANSWER
A partial dependency is when a non-prime attribute depends on only part of a composite candidate key rather than
the whole key - this is what 2NF removes. Example: in (student_id, course_id) -> grade, if student_name depends on
student_id alone, that's partial.

A transitive dependency is when a non-prime attribute depends on another non-prime attribute (A -> B -> C, where
B isn't a key) - this is what 3NF removes. Example: order_id -> customer_id -> customer_city; city depends on the
order only through the customer. Partial = depends on part of the key; transitive = depends via a non-key attribute.

Q52. [Hard]  What are Armstrong's axioms?
MODEL ANSWER
Armstrong's axioms are the sound and complete set of inference rules for deriving all functional dependencies implied
by a given set. The three primary rules: Reflexivity - if Y is a subset of X, then X -> Y. Augmentation - if X -> Y, then
XZ -> YZ. Transitivity - if X -> Y and Y -> Z, then X -> Z.

From  these  you  can  derive  secondary  rules:  union  (X->Y,  X->Z  =>  X->YZ),  decomposition,  and  pseudo-transitivity.
They're the basis for computing attribute closure and finding candidate keys.

Q53. [Medium]  What is attribute closure, and what is it used for?
MODEL ANSWER
The closure of an attribute set X (written X+) is the set of all attributes that can be functionally determined by X, using
the given FDs. You compute it by starting with X and repeatedly adding the right side of any FD whose left side is
already in the set.

It's the workhorse of normalization: if X+ contains all attributes, X is a super key; you use it to find candidate keys, to
test  whether  an  FD  X  ->  Y  holds  (check  if  Y  is  in  X+),  and  to  check  lossless  decomposition.  A  very  practical,
computable tool.

DBMS & SQL  |  SDE Fresher Question Bank

Page 12

Q54. [Medium]  What are insertion, update, and deletion anomalies?
MODEL ANSWER
They're the problems caused by storing too much in one un-normalized table. Insertion anomaly - you can't record
one fact without another; e.g. you can't add a new course until at least one student enrolls, if course info lives in the
enrollment table. Update anomaly - a single fact is duplicated across rows, so updating it requires changing many
rows and missing one leaves the data inconsistent. Deletion anomaly - deleting a row loses unrelated information;
e.g.  deleting  the  last  student  of  a  course  erases  the  course  itself.  Normalization  removes  all  three  by  separating
independent facts into their own tables.

Q55. [Easy]  What is First Normal Form (1NF)?
MODEL ANSWER
A table is in 1NF if every column holds atomic (indivisible) values and there are no repeating groups or multivalued
columns - each cell has a single value and each row is unique. So a 'phone_numbers' column containing '111, 222,
333' violates 1NF; you'd split those into separate rows or a separate table. 1NF is the baseline that makes a table truly
relational.

Q56. [Medium]  What is Second Normal Form (2NF)?
MODEL ANSWER
A  table  is  in  2NF  if  it's  in  1NF  and  has  no  partial  dependency  -  every  non-prime  attribute  depends  on  the  whole
candidate key, not just part of it. 2NF only becomes an issue when the primary key is composite.

Example:  in  Enrollment(student_id,  course_id,  grade,  student_name),  the  key  is  (student_id,  course_id),  but
student_name  depends  on  student_id  alone  -  a  partial  dependency.  To  reach  2NF,  move  student_name  into  a
Students table keyed by student_id, leaving grade (which needs both) in Enrollment.

Q57. [Medium]  What is Third Normal Form (3NF)?
n Asked at Amazon, Microsoft
MODEL ANSWER
A  table  is  in  3NF  if  it's  in  2NF  and  has  no  transitive  dependency  -  no  non-prime  attribute  depends  on  another
non-prime attribute. Formally, for every non-trivial FD X -> Y, either X is a super key or Y is a prime attribute.

Example:  Orders(order_id,  customer_id,  customer_city)  where  order_id  ->  customer_id  ->  customer_city.
customer_city depends transitively on the key through customer_id. To reach 3NF, split out Customers(customer_id,
customer_city) and keep Orders(order_id, customer_id). 3NF is usually the practical target for OLTP schemas.

Q58. [Hard]  What is BCNF (Boyce-Codd Normal Form)?
MODEL ANSWER
BCNF is a stricter version of 3NF: a table is in BCNF if for every non-trivial functional dependency X -> Y, X is a super
key - no exceptions. 3NF allows one loophole (Y can be a prime attribute even if X isn't a super key); BCNF closes it.

So  every  BCNF  table  is  in  3NF,  but  not  vice  versa.  BCNF  gives  the  strongest  guarantee  against  redundancy  from
functional dependencies, but achieving it can sometimes cost dependency preservation - which is the main reason
3NF is often preferred in practice.

Q59. [Hard]  Give an example of a table that is in 3NF but not in BCNF.
MODEL ANSWER
Take R(A, B, C) with FDs AB -> C and C -> B. The candidate keys are AB and AC (since AC determines B via C->B,
and AB determines C). So A, B, C are all prime attributes.

FDs:  AB -&gt; C   and   C -&gt; B
Candidate keys: {AB, AC}   (A,B,C all prime)

Check C -&gt; B:
  3NF? B is a PRIME attribute -&gt; rule satisfied -&gt; in 3NF
  BCNF? C is NOT a super key (C+ = {B,C}) -&gt; VIOLATION -&gt; not in BCNF

The  FD  C  ->  B  passes  3NF  only  because  B  is  prime,  but  it  fails  BCNF  because  C  isn't  a  super  key.  This  is  the
canonical  example,  and  decomposing  it  to  BCNF  would  lose  the  FD  AB  ->  C  (not  dependency-preserving)  -  the
classic BCNF trade-off.

DBMS & SQL  |  SDE Fresher Question Bank

Page 13

Q60. [Medium]  What is 4NF and a multivalued dependency?
MODEL ANSWER
A multivalued dependency (X ->> Y) exists when, for each X value, there's a set of Y values independent of the other
attributes  -  i.e.  two  independent  multivalued  facts  stored  together.  4NF  requires  that  a  table  in  BCNF  also  has  no
non-trivial multivalued dependencies.

Example: a table Course(course, instructor, textbook) where a course has several instructors and several textbooks
independently  -  storing  them  together  forces  a  Cartesian-product  explosion  of  rows.  4NF  says  split  it  into  (course,
instructor) and (course, textbook). It removes redundancy that FD-based normal forms can't catch.

Q61. [Hard]  Normalize this table step by step: Order(order_id, customer_id, customer_name,
customer_city, product_id, product_name, quantity).
n Asked at Amazon, Flipkart - 'normalize this'
MODEL ANSWER
Identify  the  FDs  first:  order_id  ->  customer_id;  customer_id  ->  customer_name,  customer_city;  product_id  ->
product_name; (order_id, product_id) -> quantity. The single table mixes order, customer, product, and line-item facts
- lots of redundancy.

Decomposed (3NF):

Customers(customer_id PK, customer_name, customer_city)
Products (product_id PK, product_name)
Orders   (order_id PK, customer_id FK)
OrderItems(order_id FK, product_id FK, quantity)
           PK = (order_id, product_id)

Now each fact lives once: change a customer's city in one row, a product name in one row, and the junction table
OrderItems captures the M:N between orders and products with its line-specific quantity. No insertion/update/deletion
anomalies remain.

Q62. [Medium]  What is denormalization, and when would you deliberately do it?
n Asked at Amazon, Microsoft - the 'tradeoff' question
MODEL ANSWER
Denormalization  is  intentionally  adding  redundancy  back  into  a  normalized  schema  -  duplicating  columns  or
pre-joining tables - to improve read performance by avoiding expensive joins at query time.

You do it when reads vastly outnumber writes and join cost is a bottleneck: analytics/reporting (data warehouses are
heavily denormalized), caching a computed value (storing an order's total instead of summing line items every time),
or  read-heavy  feeds.  The  cost  is  exactly  what  normalization  avoided  -  you  must  keep  the  duplicates  in  sync  (via
application  logic  or  triggers),  risking  inconsistency.  So  it's  a  conscious  performance-for-consistency  trade,  not
sloppiness.

Q63. [Hard]  What is a lossless-join decomposition?
MODEL ANSWER
A decomposition of a table into smaller tables is lossless if joining them back together reproduces exactly the original
rows - no spurious extra rows and nothing lost. This is a must-have property; a 'lossy' decomposition would corrupt
your data.

The test for splitting R into R1 and R2: the decomposition is lossless if their common attributes (R1 intersect R2) form
a super key of at least one of them - i.e. (R1 ˙ R2) -> R1 or (R1 ˙ R2) -> R2. Intuitively, the shared column must
uniquely identify rows in one piece so the join can't mismatch.

Q64. [Hard]  What is dependency preservation?
MODEL ANSWER
A decomposition is dependency-preserving if every functional dependency from the original table can still be enforced
by checking dependencies within the individual decomposed tables - without having to join them back. This matters
because if an FD spans two tables, the database can't cheaply enforce it, so bad data could slip in.

The tension: you can always decompose into BCNF losslessly, but sometimes not while preserving all dependencies -
whereas  3NF  decomposition  can  always  be  both  lossless  and  dependency-preserving.  That's  the  practical  reason
many designs stop at 3NF rather than pushing to BCNF.

DBMS & SQL  |  SDE Fresher Question Bank

Page 14

Q65. [Medium]  What are the trade-offs of normalization - is a higher normal form always better?
MODEL ANSWER
Higher normal forms reduce redundancy and anomalies, which improves data integrity and makes writes cheaper and
safer. But they spread data across more tables, so reads require more joins, which can hurt query performance - and
beyond 3NF/BCNF the gains shrink while complexity grows.

So no, higher is not always better. The practical sweet spot is 3NF (sometimes BCNF) for transactional systems, and
deliberate  denormalization  for  read-heavy  analytical  workloads.  The  right  answer  in  an  interview  is  'normalize  for
integrity, denormalize selectively for performance, based on the read/write pattern.'

Q66. [Hard]  What is the difference between 3NF and BCNF in one line, and which is used in practice?
MODEL ANSWER
3NF  allows  a  non-super-key  X  to  determine  a  prime  attribute;  BCNF  forbids  it  -  in  BCNF  the  left  side  of  every
non-trivial FD must be a super key. BCNF is stricter and removes more redundancy, but 3NF is guaranteed to be both
lossless  and  dependency-preserving  while  BCNF  may  sacrifice  dependency  preservation.  In  practice  most  OLTP
schemas target 3NF, occasionally pushing specific tables to BCNF when the redundancy actually matters.

Q67. [Medium]  What is 5NF (briefly)?
MODEL ANSWER
5NF  (Project-Join  Normal  Form)  deals  with  join  dependencies:  a  table  is  in  5NF  if  it  can't  be  decomposed  into
smaller tables and losslessly rejoined without losing information, unless those pieces are based on candidate keys. It
addresses  rare  cases  where  a  fact  is  genuinely  a  three-way  (or  higher)  relationship  that  can't  be  broken  into  pairs
without  introducing  spurious  rows.  It's  mostly  of  theoretical  interest  -  interviews  rarely  go  past  BCNF/4NF,  so  just
knowing it exists and handles join dependencies is enough.

DBMS & SQL  |  SDE Fresher Question Bank

Page 15

5. Transactions & ACID

ACID is guaranteed interview territory - you must explain each property with a concrete failure scenario, not just expand
the acronym. Serializability and the isolation-level / read-anomaly grid are the harder follow-ups.

Q68. [Medium]  Explain the ACID properties.
n Asked at virtually every company
MODEL ANSWER
ACID are the four guarantees that make transactions reliable. Atomicity - a transaction is all-or-nothing; if any part
fails, the whole thing is rolled back. Consistency - a transaction moves the database from one valid state to another,
never violating constraints. Isolation - concurrent transactions don't interfere; each runs as if it were alone. Durability
- once committed, changes survive crashes and power loss.

The canonical example is a bank transfer: atomicity ensures you never debit without crediting, consistency keeps the
total money correct, isolation stops a concurrent balance read from seeing a half-done transfer, and durability ensures
the committed transfer isn't lost if the server crashes a second later.

Q69. [Medium]  What is atomicity and how is it ensured?
MODEL ANSWER
Atomicity  means  a  transaction  executes  completely  or  not  at  all  -  there's  no  partial  result  visible.  If  it  fails  midway
(error, crash, or explicit ROLLBACK), every change it made is undone.

It's ensured with a log (undo log / write-ahead log): before changing data, the DBMS records the old values, so on
failure  it  can  roll  back  by  restoring  them.  The  transaction  manager  tracks  the  transaction  and  either  commits  all  its
changes or aborts and reverses them.

Q70. [Medium]  What is consistency in the ACID sense?
MODEL ANSWER
Consistency means every transaction takes the database from one valid state to another, honouring all defined rules -
constraints,  cascades,  triggers,  and  data-integrity  invariants.  If  a  transaction  would  leave  the  database  violating  a
constraint (say, a negative balance or a dangling foreign key), it's aborted. Note this is application-defined consistency
(your constraints), and it's partly the developer's responsibility - the DBMS enforces the declared rules, but you must
declare the right ones. (This is a different 'C' from the CAP theorem's consistency.)

Q71. [Medium]  What is isolation?
MODEL ANSWER
Isolation  means  concurrently  executing  transactions  don't  see  each  other's  intermediate,  uncommitted  state  -  each
behaves as though it ran alone, in some serial order. Without it, interleaving causes anomalies like dirty reads and lost
updates. Full isolation (serializable) is the strongest but slowest; databases offer weaker isolation levels to trade some
isolation for concurrency, which is why understanding the levels matters.

Q72. [Medium]  What is durability and how is it ensured?
MODEL ANSWER
Durability guarantees that once a transaction commits, its changes are permanent and survive any subsequent failure
- crash, power loss, restart. It's ensured by writing changes to non-volatile storage before reporting commit, typically
via write-ahead logging: the redo log is flushed to disk (fsync) at commit time, so even if the in-memory data pages
aren't written yet, the database can replay the log on recovery and reconstruct the committed state.

Q73. [Medium]  What are the states of a transaction?
MODEL ANSWER
Active  -  executing  its  operations.  Partially  committed  -  the  final  operation  has  executed  but  changes  aren't  yet
permanent. Committed - changes are made permanent. Failed - a failure prevents normal continuation. Aborted - the
transaction has been rolled back and the database restored to its pre-transaction state (after which it may restart or be
killed). The normal path is Active -> Partially committed -> Committed; the failure path is Active -> Failed -> Aborted.

DBMS & SQL  |  SDE Fresher Question Bank

Page 16

Q74. [Medium]  What is a schedule, and what's the difference between a serial and a non-serial
schedule?
MODEL ANSWER
A  schedule  is  the  chronological  order  in  which  the  operations  of  multiple  concurrent  transactions  are  executed.  A
serial schedule runs transactions one fully after another with no interleaving - always correct but no concurrency. A
non-serial (concurrent) schedule interleaves operations from different transactions to improve throughput, but may
produce anomalies. The goal of concurrency control is a non-serial schedule that's equivalent to some serial one - i.e.
serializable.

Q75. [Hard]  What is serializability, and what's the difference between conflict and view serializability?
MODEL ANSWER
A schedule is serializable if it produces the same result as some serial execution of the same transactions - it's the
correctness criterion for concurrency. Conflict serializable - can be transformed into a serial schedule by swapping
non-conflicting  adjacent  operations  (two  operations  conflict  if  they're  from  different  transactions,  on  the  same  data
item, and at least one is a write). It's easy to test via a precedence graph.

View  serializable  -  a  weaker,  broader  notion  based  on  what  each  transaction  reads  and  the  final  writes;  every
conflict-serializable schedule is view-serializable but not vice versa. View serializability captures more valid schedules
but is NP-hard to test, so databases use conflict serializability in practice.

Q76. [Hard]  How do you test whether a schedule is conflict serializable?
MODEL ANSWER
Build  a  precedence  (serialization)  graph:  one  node  per  transaction,  and  a  directed  edge  Ti  ->  Tj  whenever  an
operation  of  Ti  conflicts  with  and  precedes  an  operation  of  Tj  on  the  same  data  item  (read-write,  write-read,  or
write-write).

The  schedule  is  conflict  serializable  if  and  only  if  the  graph  has  no  cycle.  If  it's  acyclic,  a  topological  sort  of  the
graph gives an equivalent serial order; a cycle means no serial order is equivalent, so it's not serializable. It's the exact
analogue of cycle detection for deadlocks - same tool, different problem.

Q77. [Medium]  What is a recoverable schedule?
MODEL ANSWER
A  schedule  is  recoverable  if  a  transaction  commits  only  after  every  transaction  whose  data  it  read  has  already
committed. This prevents an impossible situation: if Tj reads data written by Ti and Tj commits, but then Ti aborts, you
couldn't undo Ti's effect without also undoing the already-committed Tj. Recoverability guarantees you never have to
roll back a committed transaction - a non-negotiable property for any real database.

Q78. [Hard]  What is cascading rollback, and what is a cascadeless schedule?
MODEL ANSWER
Cascading rollback is when one transaction's abort forces other transactions that read its uncommitted data to also
abort, which can chain across many transactions - expensive and wasteful. A cascadeless schedule prevents this by
allowing a transaction to read a value only after the transaction that wrote it has committed. So no transaction ever
depends on another's uncommitted writes, and a single abort can't cascade. Strict schedules go further (no reading or
overwriting uncommitted writes) and are what strict 2PL produces.

Q79. [Hard]  What are the SQL isolation levels and which read anomalies does each prevent?
n Asked at Amazon, Microsoft - the isolation grid
MODEL ANSWER
Four levels, from weakest to strongest, each preventing more anomalies:

Isolation level    Dirty read  Non-repeatable  Phantom
Read Uncommitted     possible     possible      possible
Read Committed       prevented    possible      possible
Repeatable Read      prevented    prevented     possible*
Serializable         prevented    prevented     prevented

Read  Uncommitted  allows  everything  (rarely  used).  Read  Committed  (the  default  in  Postgres/Oracle)  stops  dirty
reads.  Repeatable  Read  (MySQL  InnoDB  default)  also  stops  non-repeatable  reads.  Serializable  stops  everything
including  phantoms  but  has  the  most  contention.  (*InnoDB's  Repeatable  Read  actually  prevents  phantoms  too  via
next-key locks.) Higher isolation = more correctness, less concurrency - the core trade-off.

DBMS & SQL  |  SDE Fresher Question Bank

Page 17

Q80. [Medium]  Explain dirty read, non-repeatable read, and phantom read.
n Commonly asked
MODEL ANSWER
Dirty read - you read data another transaction has written but not yet committed; if it rolls back, you've read a value
that never officially existed. Non-repeatable read - you read the same row twice in your transaction and get different
values, because another transaction committed an update in between. Phantom read - you run the same query twice
(a  range/condition)  and  get  a  different  set  of  rows,  because  another  transaction  inserted  or  deleted  rows  matching
your condition. The progression - one row's uncommitted value, one row changing, the row set changing - is exactly
what the four isolation levels progressively eliminate.

Q81. [Easy]  What's the difference between COMMIT, ROLLBACK, and SAVEPOINT?
MODEL ANSWER
COMMIT makes all the changes in the current transaction permanent and ends it. ROLLBACK undoes all the changes
since  the  transaction  began  (or  since  a  savepoint)  and  ends  it.  SAVEPOINT  marks  an  intermediate  point  within  a
transaction  so  you  can  ROLLBACK  TO  that  savepoint  -  undoing  only  part  of  the  work  without  aborting  the  whole
transaction. They're the TCL commands that give you fine-grained control over committing and undoing.

Q82. [Medium]  What is write-ahead logging (WAL)?
MODEL ANSWER
Write-ahead logging is the rule that you must write a change to the durable log before writing it to the actual data files.
The  log  records  both  undo  information  (old  values,  for  atomicity/rollback)  and  redo  information  (new  values,  for
durability/recovery).

It gives you crash recovery: on restart, the DBMS replays the redo log to re-apply committed transactions that hadn't
reached the data files, and uses the undo log to roll back uncommitted ones. It also makes commits fast - you only
need  to  flush  the  small  sequential  log,  not  all  the  scattered  data  pages.  It's  the  backbone  of  both  atomicity  and
durability.

Q83. [Medium]  If serial schedules are always correct, why allow concurrent transactions at all?
MODEL ANSWER
Because  serial  execution  wastes  the  system.  A  transaction  that's  waiting  on  disk  or  network  I/O  would  hold  up
everyone  behind  it,  leaving  the  CPU  and  disks  idle  -  terrible  throughput  and  response  time.  Interleaving  lets  one
transaction use the CPU while another waits on I/O, dramatically increasing throughput and reducing average wait.
Concurrency control exists to capture those gains while guaranteeing the result is still equivalent to some serial order
(serializable) - we want serial correctness with concurrent performance.

Q84. [Medium]  The 'C' in ACID and the 'C' in CAP both stand for consistency - are they the same thing?
MODEL ANSWER
No, and conflating them is a classic mistake. ACID's consistency means a transaction takes the database from one
state that satisfies all defined constraints (keys, checks, invariants) to another - it's about correctness rules within a
single  database.  CAP's  consistency  means  every  read  across  a  distributed  system  sees  the  most  recent  write
(linearizability) - it's about all nodes agreeing on the latest value.

So ACID-C is integrity-rule consistency on one node; CAP-C is replica/read consistency across nodes. A system can
be  ACID-consistent  while  being  eventually  consistent  in  the  CAP  sense.  Calling  out  that  they're  different  concepts
sharing a letter is exactly what a sharp candidate does.

DBMS & SQL  |  SDE Fresher Question Bank

Page 18

6. Concurrency Control

The mechanisms that deliver isolation: locking (2PL and its variants), timestamp ordering, and MVCC. Know how 2PL
guarantees serializability but can deadlock, and how MVCC lets readers avoid blocking writers - a favourite for backend
roles.

Q85. [Easy]  Why do we need concurrency control? What can go wrong without it?
MODEL ANSWER
Concurrency control coordinates simultaneous transactions so their interleaving doesn't corrupt data. Without it you
get  classic  anomalies:  the  lost  update  (two  transactions  read  the  same  value,  both  update  it,  one  overwrites  the
other),  dirty  reads  (reading  uncommitted  data),  non-repeatable  reads,  and  phantoms.  Concurrency  control  -  via
locking, timestamps, or MVCC - ensures the concurrent schedule is serializable, preserving the isolation property of
ACID.

Q86. [Medium]  What are shared and exclusive locks?
MODEL ANSWER
A  shared  (S)  lock  is  for  reading:  multiple  transactions  can  hold  shared  locks  on  the  same  item  at  once,  since
concurrent reads don't conflict. An exclusive (X) lock is for writing: only one transaction can hold it, and no shared
locks may coexist with it. So reads can share, but a write requires exclusive access. This compatibility - S with S is
fine, anything with X conflicts - is the basis of lock-based concurrency control.

Q87. [Hard]  What is two-phase locking (2PL)?
n Asked at Amazon, Microsoft
MODEL ANSWER
2PL is a locking protocol that guarantees conflict-serializability. Each transaction acquires and releases locks in two
distinct phases: a growing phase where it can only acquire locks (never release), and a shrinking phase where it
can only release locks (never acquire). Once a transaction releases its first lock, it can't obtain any new lock.

This  discipline  ensures  the  resulting  schedule  is  serializable.  Its  weakness  is  that  2PL  can  cause  deadlocks  (two
transactions each waiting for a lock the other holds) and doesn't by itself prevent cascading rollbacks - which is why
stricter variants exist.

Q88. [Hard]  What's the difference between basic, strict, and rigorous 2PL?
MODEL ANSWER
All three are two-phase, differing in when locks are released. Basic 2PL releases locks during the shrinking phase as
soon as they're no longer needed - serializable but allows cascading rollbacks. Strict 2PL holds all exclusive locks
until  the  transaction  commits  or  aborts  -  this  prevents  cascading  rollbacks  and  is  the  most  common  in  practice.
Rigorous  2PL  holds  all  locks  (shared  and  exclusive)  until  commit  -  even  simpler  to  reason  about.  Stricter  variants
trade a bit of concurrency for cleaner recovery guarantees.

Q89. [Hard]  Does 2PL guarantee serializability? Does it prevent deadlock?
MODEL ANSWER
2PL guarantees conflict-serializability - yes. But it does not prevent deadlocks. Two transactions can each hold a lock
the  other  needs  and  acquire  them  in  conflicting  order,  deadlocking  -  and  2PL's  'no  new  locks  after  releasing'  rule
actually makes deadlock more likely because transactions hold locks longer.

So databases combine 2PL with a deadlock strategy: detection via a wait-for graph (then abort a victim) or prevention
via timestamp schemes (wait-die / wound-wait). Serializable yes; deadlock-free no.

Q90. [Medium]  How do databases handle deadlocks?
n Commonly asked
MODEL ANSWER
Two main approaches. Detection - the DBMS maintains a wait-for graph of transactions waiting on each other and
periodically checks for cycles; on finding one it aborts a 'victim' transaction (chosen by least work done / fewest locks)
to break the cycle, and that transaction is automatically retried. Timeout - simpler: if a transaction waits longer than a
threshold, assume deadlock and abort it.

Most real databases (Postgres, MySQL InnoDB) use detection and report a 'deadlock detected' error, expecting the
application to retry. Prevention schemes (below) are the third option.

DBMS & SQL  |  SDE Fresher Question Bank

Page 19

Q91. [Hard]  Explain the deadlock-prevention schemes wait-die and wound-wait.
MODEL ANSWER
Both  use  transaction  timestamps  (older  =  smaller  timestamp  =  higher  priority)  to  decide  what  happens  when
transaction Ti requests a lock held by Tj, ensuring no cycle can form.

Wait-die (non-preemptive): if Ti is older it waits; if Ti is younger it dies (aborts and retries). Wound-wait (preemptive):
if  Ti  is  older  it  wounds  Tj  (forces  Tj  to  abort);  if  Ti  is  younger  it  waits.  Mnemonic:  in  both,  the  older  transaction  is
favoured - it either waits (wait-die) or wounds (wound-wait), so it never starves. These guarantee no deadlock at the
cost of some unnecessary aborts.

Q92. [Hard]  What is the timestamp-ordering protocol?
MODEL ANSWER
It's  a  lock-free  concurrency-control  method  that  orders  transactions  by  a  unique  timestamp  assigned  at  start,  and
ensures the schedule is equivalent to executing them in timestamp order. Each data item tracks the largest timestamp
that read it (read-TS) and wrote it (write-TS).

When  a  transaction  tries  to  read  or  write,  the  protocol  checks  these  timestamps:  if  the  operation  would  violate
timestamp order (e.g. an older transaction trying to write data a younger one already read), the transaction is aborted
and restarted with a new timestamp. It avoids deadlock entirely (no waiting) but can cause more restarts than locking
under contention.

Q93. [Hard]  What is MVCC (Multi-Version Concurrency Control)?
n Asked at Amazon, backend roles - Postgres favourite
MODEL ANSWER
MVCC  keeps  multiple  versions  of  each  data  item  so  that  readers  and  writers  don't  block  each  other.  When  a
transaction updates a row, instead of overwriting it, the DBMS creates a new version and keeps the old one; each
transaction sees a consistent snapshot of the data as of its start time.

The big win: readers never block writers and writers never block readers - a long analytical read sees a stable
snapshot while writes proceed on new versions. This is how PostgreSQL and Oracle implement isolation (and MySQL
InnoDB  for  reads).  The  cost  is  storing  and  eventually  cleaning  up  old  versions  (Postgres's  VACUUM).  It's  a  much
more scalable model than pure locking for read-heavy workloads.

Q94. [Medium]  What's the difference between optimistic and pessimistic concurrency control?
MODEL ANSWER
Pessimistic  assumes  conflicts  are  likely,  so  it  locks  data  up  front  before  accessing  it  (2PL)  -  safe  but  with  locking
overhead and deadlock risk, best when contention is high. Optimistic assumes conflicts are rare, so transactions run
without locking and only validate at commit time whether a conflict occurred; if so, the transaction aborts and retries -
low overhead when conflicts are rare, but wasteful retries when they're common. Choose based on contention: high
contention favours pessimistic, low contention favours optimistic.

Q95. [Medium]  What is the lost-update problem?
MODEL ANSWER
The lost update happens when two transactions read the same value, each computes an update from that value, and
they write back in sequence - so the second overwrites the first, and one update is silently lost. Example: two users
both  read  a  stock  count  of  10,  both  decrement  to  9,  and  the  final  value  is  9  instead  of  8.  It's  prevented  by  proper
isolation - exclusive locks (pessimistic), a version check at commit (optimistic), or an atomic in-place update (UPDATE
... SET count = count - 1).

Q96. [Medium]  What is lock granularity, and what is lock escalation?
MODEL ANSWER
Lock granularity is the size of the data a lock covers - a row, a page, a table, or the whole database. Fine-grained
(row) locks allow more concurrency but cost more overhead (many locks to track); coarse-grained (table) locks are
cheap  to  manage  but  block  more  transactions.  Lock  escalation  is  when  the  DBMS  automatically  converts  many
fine-grained locks into a single coarse-grained one once a transaction holds too many row locks - trading concurrency
for lower lock-management overhead. It's a balance between memory/overhead and concurrency.

DBMS & SQL  |  SDE Fresher Question Bank

Page 20

Q97. [Medium]  What are intention locks / multiple-granularity locking?
MODEL ANSWER
When a database supports locks at multiple granularities (row, page, table), it needs a way to know - without scanning
-  whether  locking  a  whole  table  would  conflict  with  a  row  lock  someone  holds  inside  it.  Intention  locks  solve  this:
before locking a row, a transaction sets an intention lock (IS or IX) on the table above it, signalling 'I intend to take
shared/exclusive locks at a finer level.' Then a transaction wanting a full-table lock sees the intention lock and knows
there's a conflict immediately. It makes multi-granularity locking efficient.

Q98. [Hard]  How does a phantom read occur and how is it prevented?
MODEL ANSWER
A  phantom  occurs  because  row-level  locks  only  protect  rows  that  exist  -  they  can't  stop  another  transaction  from
inserting a new row that matches your query's condition. So re-running 'SELECT ... WHERE age > 30' can return
extra 'phantom' rows.

Prevention needs locking the range/predicate, not just existing rows: predicate locks or, more practically, next-key
locking  (InnoDB)  which  locks  the  index  range  covering  the  condition  so  no  row  can  be  inserted  into  the  gap.  The
Serializable  isolation  level  uses  such  range  locks  (or  serialization-failure  detection  in  MVCC  systems)  to  eliminate
phantoms.

Q99. [Medium]  In an MVCC database, how can a read run without blocking concurrent writes?
MODEL ANSWER
Because the reader is handed a consistent snapshot. Each row version is tagged with the transaction that created
(and deleted) it; when a read transaction starts, it fixes a snapshot and only sees versions committed as of that point.
A concurrent writer creates a new version of the row rather than modifying the one the reader sees, so the reader
keeps reading the old version with no lock and no wait. The writer proceeds in parallel. That decoupling is the whole
appeal of MVCC for read-heavy systems.

Q100. [Medium]  What is application-level optimistic locking (the version column pattern)?
MODEL ANSWER
It's  a  common  way  apps  avoid  lost  updates  without  holding  database  locks  across  a  user's  think-time.  You  add  a
version (or timestamp) column to the row. When updating, you include the version you originally read in the WHERE
clause and increment it: UPDATE ... SET data = ?, version = version + 1 WHERE id = ? AND version = ?. If another
transaction already changed the row, the version no longer matches, zero rows are updated, and the app knows to
reload and retry. It's optimistic concurrency implemented in the application - widely used in ORMs like Hibernate and
JPA.

Q101. [Hard]  What is two-phase commit (2PC) in distributed transactions?
MODEL ANSWER
2PC is a protocol to commit a transaction atomically across multiple databases/nodes. A coordinator runs two phases:
prepare - it asks every participant 'can you commit?'; each does the work, writes it to its log, and replies yes/no but
doesn't commit yet. Commit - if all said yes, the coordinator tells everyone to commit; if any said no, it tells everyone
to abort.

It guarantees all-or-nothing across nodes, but its weakness is blocking: if the coordinator crashes after participants
prepared, they're stuck holding locks waiting for the decision. That fragility is why many modern systems prefer sagas
or consensus protocols (Raft/Paxos) over classic 2PC for distributed atomicity.

DBMS & SQL  |  SDE Fresher Question Bank

Page 21

7. Indexing & Storage

The performance half of DBMS interviews. Be ready to explain why an index speeds up reads, the B+ tree, clustered vs
non-clustered, and the crucial trade-off that every index slows down writes. The leftmost-prefix rule and 'when does an
index hurt' are strong-candidate follow-ups.

Q102. [Medium]  What is an index and why does it speed up queries?
n Asked at Amazon, Microsoft
MODEL ANSWER
An index is an auxiliary data structure (usually a B+ tree) that stores a sorted mapping from a column's values to the
locations of the matching rows - like the index at the back of a book. Instead of scanning every row (a full table scan,
O(n)), the database navigates the index to jump straight to matching rows in O(log n).

It  dramatically  speeds  up  lookups,  range  queries,  joins,  and  ORDER  BY  on  the  indexed  column.  The  cost  is  extra
storage  and  slower  writes  (every  INSERT/UPDATE/DELETE  must  also  maintain  the  index)  -  which  is  the  trade-off
interviewers always probe.

Q103. [Hard]  How does a B+ tree index work?
MODEL ANSWER
A B+ tree is a balanced, multi-way search tree kept shallow so lookups touch very few disk pages. Internal nodes hold
only keys and child pointers to guide the search; all actual data pointers live in the leaf nodes, which are linked
together in a sorted doubly linked list.

To find a value you descend from the root through internal nodes (a handful of levels even for millions of rows, since
each node has high fan-out), reaching the leaf with the data pointer. Range queries are especially efficient: find the
start leaf, then walk the linked leaves sequentially. The high fan-out keeps the tree height ~3-4, so a lookup is just a
few page reads.

Q104. [Hard]  What's the difference between a B-tree and a B+ tree, and why do databases prefer B+
trees?
n Asked at Amazon, Microsoft
MODEL ANSWER
In  a  B-tree,  data  pointers  can  live  in  both  internal  and  leaf  nodes;  in  a  B+  tree,  internal  nodes  hold  only  keys  (for
navigation) and all data is in the leaves, which are linked in sorted order.

Databases prefer B+ trees for two reasons. First, because internal nodes store no data, they pack more keys per node
-> higher fan-out -> shallower tree -> fewer disk I/Os per lookup. Second, the linked leaf nodes make range scans
and ordered traversal fast - critical for queries like WHERE x BETWEEN a AND b and ORDER BY. B-trees can't
range-scan as cleanly. That combination is why nearly all RDBMS indexes are B+ trees.

Q105. [Medium]  What's the difference between a clustered and a non-clustered index?
n Asked at Amazon, Microsoft, Oracle - very common
MODEL ANSWER
A clustered index determines the physical order of the rows on disk - the table is the index, with row data stored in
the leaf nodes in key order. So there can be only one per table (data can be physically sorted one way), usually on the
primary key. Lookups by the clustered key are very fast because the data is right there.

A non-clustered index is a separate structure that stores the indexed column values plus a pointer (the clustered key
or a row ID) back to the actual row. You can have many per table. A lookup finds the pointer in the index, then does a
second access to fetch the full row (a 'bookmark lookup'). Mnemonic: clustered = the data sorted itself; non-clustered
= a separate signpost pointing to the data.

Q106. [Medium]  What's the difference between a dense and a sparse index?
MODEL ANSWER
A dense index has an index entry for every search-key value in the table - more entries, more space, but you can
answer 'does this key exist?' from the index alone. A sparse index has an entry for only some keys (typically one per
data  block/page);  to  find  a  record  you  locate  the  largest  key  <=  your  target,  then  scan  within  that  block.  Sparse
indexes  are  smaller  and  need  the  data  to  be  sorted  (so  they  pair  with  clustered  indexes);  dense  indexes  are  more
flexible and used for non-clustered/secondary indexes.

DBMS & SQL  |  SDE Fresher Question Bank

Page 22

Q107. [Medium]  What's the difference between a primary and a secondary index?
MODEL ANSWER
A  primary  index  is  built  on  the  column  by  which  the  data  file  is  physically  ordered  (typically  the  primary  key)  -  it's
usually clustered and sparse. A secondary index is built on a non-ordering column to support lookups on it; since the
data isn't sorted by that column, a secondary index must be dense and stores pointers to the rows. A table has one
primary index but can have many secondary indexes.

Q108. [Medium]  What is a composite (multi-column) index, and does column order matter?
n Asked at Amazon, backend roles
MODEL ANSWER
A  composite  index  is  built  on  two  or  more  columns  together,  e.g.  (last_name,  first_name).  Column  order  matters  a
great deal because the index is sorted by the first column, then the second within that, and so on - like a phone book
sorted by last then first name.

This  leads  to  the  leftmost-prefix  rule:  the  index  can  serve  queries  that  filter  on  a  leading  prefix  of  the  columns  -
(last_name), or (last_name, first_name) - but not a query that filters only on first_name, because the data isn't sorted
by
/
most-frequently-filtered first.

first_name  alone.  So  you  order  composite-index  columns  by  how  queries

filter,  most  selective

Q109. [Medium]  What is a covering index?
MODEL ANSWER
A covering index is one that contains all the columns a query needs - both the filter columns and the selected columns
- so the query can be answered entirely from the index without touching the table at all (an 'index-only scan'). This
avoids the second lookup to fetch the row, which can make a query dramatically faster. You create one by including
the  selected  columns  in  the  index  (e.g.  INCLUDE  columns  in  SQL  Server,  or  adding  them  to  a  composite  index).
Great for hot read paths.

Q110. [Medium]  What is a hash index, and when is it better or worse than a B+ tree?
MODEL ANSWER
A  hash  index  stores  keys  in  a  hash  table,  giving  average  O(1)  lookups  for  exact-match  queries  (WHERE  id  =  5)  -
faster than a B+ tree's O(log n) for pure equality. But it's useless for range queries, ORDER BY, or prefix searches,
because  hashing  destroys  ordering.  B+  trees  handle  equality  and  ranges  and  ordering,  which  is  why  they're  the
default;  hash  indexes  are  a  niche  optimisation  for  equality-only  access  (and  are  what  hash  joins  and  in-memory
caches use internally).

Q111. [Medium]  When does an index hurt performance rather than help?
n Asked at Amazon, Microsoft - the trade-off
MODEL ANSWER
Indexes  speed  reads  but  slow  writes:  every  INSERT,  UPDATE  (of  an  indexed  column),  and  DELETE  must  also
update  each  affected  index,  so  a  table  with  many  indexes  has  expensive  writes.  They  also  consume  storage  and
memory.

Specific  cases  where  an  index  hurts  or  won't  help:  on  a  low-cardinality  column  (like  a  boolean  or  gender)  the
optimiser often ignores it and does a full scan anyway; on a small table a scan is cheaper than index navigation; on
write-heavy
in
WHERE/JOIN/ORDER BY on read-heavy, high-selectivity data - not everything.

the  maintenance  cost  can  outweigh  read  gains.  The  rule:

index  columns  used

tables

Q112. [Medium]  Which columns are good candidates for indexing?
MODEL ANSWER
Columns frequently used in WHERE clauses, JOIN conditions (especially foreign keys), and ORDER BY / GROUP
BY. Prefer columns with high selectivity (many distinct values, so the index narrows the result sharply) - a primary
key or email is ideal, a boolean is not. Avoid indexing columns that are rarely queried, very low cardinality, or on tables
that are tiny or extremely write-heavy. And consider composite indexes that match your common multi-column filters.

DBMS & SQL  |  SDE Fresher Question Bank

Page 23

Q113. [Medium]  What is index selectivity / cardinality, and why does it matter?
MODEL ANSWER
Selectivity is the fraction of distinct values in a column - high selectivity means many unique values (a near-unique
column), low selectivity means few (like a status flag). Cardinality is the count of distinct values. They matter because
an index is only worth using when it filters out most rows: on a high-selectivity column an index lookup returns very
few rows (big win), but on a low-selectivity column (say 50% of rows match) the optimiser will skip the index and do a
full scan, since random row fetches for half the table are slower than reading it sequentially.

Q114. [Medium]  When does the query optimiser choose a full table scan over an index scan?
MODEL ANSWER
When it estimates the scan is cheaper - chiefly when the query will return a large fraction of the rows. Using an index
means  random  I/O  (jump  to  the  index,  then  jump  to  each  row);  if  you're  fetching,  say,  40%  of  the  table,  doing  that
many random fetches is slower than one sequential full scan. The optimiser uses table statistics (row counts, value
distribution)  to  estimate  selectivity  and  pick  the  cheaper  plan.  Other  triggers  for  a  full  scan:  no  usable  index,  a
low-cardinality  predicate,  a  function  applied  to  the  indexed  column  (WHERE  UPPER(name)=...)  that  defeats  the
index, or a very small table.

Q115. [Hard]  Why is a B+ tree better than a balanced binary search tree for a database index?
MODEL ANSWER
Because databases live on disk, and disk reads happen in pages (blocks). A binary search tree has fan-out 2, so it's
tall  -  O(log2  n)  levels  -  and  each  level  is  potentially  a  separate  disk  page  read;  for  a  million  rows  that's  ~20  page
reads. A B+ tree node is sized to one page and holds hundreds of keys (high fan-out), so the tree is only 3-4 levels
deep for the same data - meaning 3-4 page reads instead of 20.

Since disk I/O dominates, minimising the number of pages touched is everything. The B+ tree is essentially a BST
redesigned to match the page-oriented, I/O-bound reality of disk storage.

Q116. [Easy]  What is a unique index?
MODEL ANSWER
A unique index enforces that all values in the indexed column(s) are distinct - it both speeds up lookups and acts as a
uniqueness  constraint,  rejecting  any  insert/update  that  would  create  a  duplicate.  Primary  keys  and  UNIQUE
constraints  are  backed  by  unique  indexes  automatically.  So  it  serves  double  duty:  a  performance  structure  and  an
integrity guarantee.

Q117. [Medium]  How is table data physically stored - pages and heap files?
MODEL ANSWER
Data is stored on disk in fixed-size pages (commonly 4-16 KB), the unit of I/O - the database reads and writes whole
pages, not individual rows. A table's rows are packed into these pages. A heap file is the simplest organisation: rows
are stored in no particular order, wherever there's free space, so inserts are fast but lookups need an index or a full
scan.

The  buffer  pool  /  page  cache  keeps  hot  pages  in  memory  to  avoid  disk  reads.  Indexes  sit  on  top  of  this  to  avoid
scanning every page. Understanding 'everything is pages' is key to reasoning about I/O cost.

Q118. [Easy]  What is a full-text index?
MODEL ANSWER
A full-text index is a specialised index for searching within text content - words and phrases inside large text columns -
rather than matching whole values. It tokenises the text into words and builds an inverted index (word -> list of rows
containing it), so queries like 'find all articles containing database AND tuning' are fast. A regular B+ tree index can't
do this (it only matches prefixes/whole values), which is why search-heavy features use full-text indexes or dedicated
engines like Elasticsearch.

Q119. [Easy]  Is it possible to have too many indexes? What's the downside?
MODEL ANSWER
table,  so  over-indexing  makes
Yes.  Every  additional
INSERT/UPDATE/DELETE progressively slower and consumes extra storage and memory. It can also confuse the
optimiser and lengthen maintenance (rebuilds, statistics). The discipline is to index for your actual query patterns and
periodically drop unused indexes - more indexes is not better, the right indexes are.

index  must  be  updated  on  every  write

the

to

DBMS & SQL  |  SDE Fresher Question Bank

Page 24

Q120. [Medium]  What happens to indexes when you INSERT, UPDATE, or DELETE rows?
MODEL ANSWER
The database must keep every affected index consistent with the data. An INSERT adds the new key to each index
(possibly  splitting  a  B+  tree  node).  A  DELETE  removes  the  key  from  each  index.  An  UPDATE  that  changes  an
indexed  column  is  effectively  a  delete-plus-insert  in  that  index  (and  if  it  changes  the  clustered  key,  the  row  may
physically  move).  This  maintenance  is  exactly  why  writes  get  slower  as  you  add  indexes,  and  why  you  index
selectively on write-heavy tables.

Q121. [Medium]  Is one composite index better than two separate single-column indexes?
MODEL ANSWER
It depends on the queries. A composite index on (a, b) is best when you filter on both columns together, or on a alone
(leftmost prefix) - it can satisfy 'WHERE a=? AND b=?' in a single index seek, which two separate indexes can't do as
efficiently. Two separate indexes on a and b each are better when queries filter on a or b independently.

Databases can sometimes combine two single-column indexes (index merge / bitmap AND), but that's usually slower
than  one  well-chosen  composite.  The  practical  guidance:  design  composite  indexes  to  match  your  most  frequent
multi-column  filters,  ordering  the  columns  by  how  queries  use  them  (equality/most-selective  first),  rather  than
reflexively indexing each column on its own.

DBMS & SQL  |  SDE Fresher Question Bank

Page 25

8. SQL: Queries & Operators

SQL shows up in nearly every backend interview, and ~70% of company SQL questions involve multiple tables. Master
the JOIN family, WHERE vs HAVING, the logical clause-execution order, and the DELETE/TRUNCATE/DROP and
EXISTS/IN distinctions - these are asked relentlessly.

Q122. [Hard]  What is the logical order in which SQL clauses are executed?
n Asked at Amazon, Microsoft - trips up many candidates
MODEL ANSWER
SQL is written SELECT-first but executed in a different logical order:

1. FROM / JOIN     -&gt; build the working set of rows
2. WHERE           -&gt; filter rows (no aggregates yet)
3. GROUP BY         -&gt; form groups
4. HAVING           -&gt; filter groups (can use aggregates)
5. SELECT           -&gt; compute/select columns, aliases
6. DISTINCT
7. ORDER BY         -&gt; sort
8. LIMIT / OFFSET   -&gt; take a slice

This order explains two classic gotchas: you can't use a SELECT alias in WHERE (WHERE runs before SELECT),
and  you  can't  filter  aggregates  in  WHERE  (use  HAVING,  which  runs  after  GROUP  BY).  Knowing  this  sequence
answers a whole family of 'why doesn't this query work' questions.

Q123. [Medium]  What's the difference between WHERE and HAVING?
n Asked everywhere
MODEL ANSWER
WHERE  filters  individual  rows  before  grouping  and  cannot  use  aggregate  functions.  HAVING  filters  groups  after
GROUP BY and is where aggregate conditions go.

Example: to find departments with average salary > 50000, you GROUP BY department then HAVING AVG(salary) >
50000  -  you  couldn't  put  AVG(salary)  in  WHERE  because  the  average  doesn't  exist  until  rows  are  grouped.  Use
WHERE to cut rows early (it's also more efficient), HAVING only for post-aggregation conditions.

Q124. [Medium]  Explain GROUP BY and the aggregate functions.
MODEL ANSWER
GROUP BY collapses rows that share the same value(s) in the grouping column(s) into one row per group, so you
can compute a summary per group with aggregate functions: COUNT, SUM, AVG, MIN, MAX. For example, SELECT
department, COUNT(*), AVG(salary) FROM employees GROUP BY department gives one row per department with
its headcount and average salary.

The  rule  that  catches  people:  every  column  in  the  SELECT  must  either  be  in  the  GROUP  BY  or  wrapped  in  an
aggregate - you can't select a bare column that isn't grouped, because the database wouldn't know which row's value
to show for the group.

Q125. [Medium]  Explain the different types of JOINs.
n Asked at Amazon, Microsoft, every SQL round
MODEL ANSWER
INNER JOIN - returns only rows with a match in both tables. LEFT (OUTER) JOIN - all rows from the left table plus
matches  from  the  right,  NULLs  where  there's  no  match.  RIGHT  JOIN  -  the  mirror:  all  right  rows  plus  left  matches.
FULL OUTER JOIN - all rows from both, matched where possible, NULLs elsewhere. CROSS JOIN - the Cartesian
product,  every  left  row  paired  with  every  right  row.  SELF  JOIN  -  a  table  joined  to  itself  (using  aliases),  e.g.  to  pair
employees with their managers.

The most common is INNER; LEFT JOIN is the workhorse for 'all X and their Y if any' (e.g. all customers and their
orders, including customers with none).

Q126. [Medium]  Show the difference between INNER JOIN and LEFT JOIN with a concrete example.
MODEL ANSWER
Say Customers has 3 rows and only 2 have orders. INNER JOIN returns just the 2 matched customers; LEFT JOIN
returns all 3, with NULLs for the orderless one.

-- customers with their orders, including those with none

DBMS & SQL  |  SDE Fresher Question Bank

Page 26

SELECT c.name, o.id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;

-- find customers who have NEVER ordered
SELECT c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;

That second query - LEFT JOIN then filter WHERE the right side IS NULL - is the standard 'find rows with no match'
(anti-join) pattern and a very common interview ask.

Q127. [Medium]  What is a self join and when would you use one?
MODEL ANSWER
A self join joins a table to itself using table aliases, to relate rows within the same table. The classic use is a hierarchy:
an Employees table with a manager_id that references employee id. To list each employee with their manager's name
you  join  Employees  e  to  Employees  m  ON  e.manager_id  =  m.id.  Self  joins  also  find  pairs  -  e.g.  employees  in  the
same department, or duplicate records.

Q128. [Easy]  What is a cross join?
MODEL ANSWER
A cross join produces the Cartesian product - every row of the first table paired with every row of the second, so M
rows x N rows = M*N rows, with no join condition. It's rarely what you want directly (and an accidental cross join from
a  missing  ON  clause  is  a  common  bug  that  explodes  row  counts),  but  it's  useful  deliberately  for  generating
combinations - like pairing every product with every region to build a report grid.

Q129. [Medium]  JOIN vs subquery - which should you use?
MODEL ANSWER
They often produce the same result, and modern optimisers frequently rewrite one into the other, so it's usually about
readability.  JOINs  are  typically  clearer  and  faster  when  you  need  columns  from  multiple  tables  in  the  output.
Subqueries  read  more  naturally  for  existence  checks  (EXISTS)  or  when  you  need  a  single  computed  value  to
compare against.

Performance  rule  of  thumb:  a  correlated  subquery  that  runs  once  per  outer  row  can  be  slow  and  is  often  better
expressed as a JOIN; but EXISTS can beat a JOIN when you just need to test for a match without duplicating rows.
Check the execution plan rather than assuming.

Q130. [Hard]  What's the difference between a correlated and a non-correlated subquery?
MODEL ANSWER
A non-correlated subquery is independent - it can run on its own, once, and its result is used by the outer query (e.g.
WHERE salary > (SELECT AVG(salary) FROM employees)). A correlated subquery references a column from the
outer query, so it is conceptually re-evaluated for each outer row (e.g. find employees earning more than their own
department's average).

-- correlated: inner query depends on outer row 'e'
SELECT e.name
FROM employees e
WHERE e.salary &gt; (SELECT AVG(s.salary)
                  FROM employees s
                  WHERE s.dept_id = e.dept_id);

Correlated subqueries are more powerful but potentially slower (per-row evaluation), so the optimiser often converts
them into joins under the hood.

Q131. [Easy]  What's the difference between UNION and UNION ALL?
n Commonly asked
MODEL ANSWER
Both combine the result sets of two queries (which must have compatible columns). UNION removes duplicate rows
from the combined result, which requires an extra sort/hash step to deduplicate. UNION ALL keeps all rows including
duplicates and is therefore faster. Use UNION ALL whenever you know there are no duplicates or you don't care - it
avoids the needless dedup cost. Reach for UNION only when you actually need distinct rows.

DBMS & SQL  |  SDE Fresher Question Bank

Page 27

Q132. [Hard]  What's the difference between EXISTS and IN, including the NULL gotcha?
MODEL ANSWER
IN compares a value against a list/subquery result; EXISTS tests whether a subquery returns any row. For correlated
existence checks EXISTS often performs better because it can stop at the first match, whereas IN may materialise the
whole list.

The crucial gotcha is with NOT IN and NULLs: if the subquery returns even one NULL, NOT IN returns no rows at all -
because 'x NOT IN (1, 2, NULL)' evaluates to UNKNOWN, never true. NOT EXISTS doesn't have this problem and is
the safe choice for anti-joins. So prefer NOT EXISTS over NOT IN whenever NULLs are possible.

Q133. [Medium]  What's the difference between DELETE, TRUNCATE, and DROP?
n Asked at Amazon, Microsoft, service companies - classic
MODEL ANSWER
DELETE (DML) removes rows one at a time based on an optional WHERE clause, is fully logged, can be rolled back,
and  fires  triggers  -  flexible  but  slower  for  large  deletes.  TRUNCATE  (DDL)  removes  all  rows  by  deallocating  data
pages - very fast, minimally logged, resets identity counters, but has no WHERE clause and (in most DBs) can't be
easily rolled back or fire row triggers. DROP (DDL) removes the entire table - structure, data, indexes, and constraints
- so the table no longer exists.

One-liner: DELETE removes selected rows (recoverable), TRUNCATE empties the table fast, DROP deletes the table
itself.

Q134. [Medium]  What's the difference between COUNT(*), COUNT(column), and COUNT(DISTINCT
column)?
MODEL ANSWER
COUNT(*) counts all rows, including those with NULLs in any column. COUNT(column) counts only rows where that
column  is  not  NULL  -  so  it  can  be  less  than  COUNT(*).  COUNT(DISTINCT  column)  counts  the  number  of  distinct
non-NULL values. This NULL-skipping behaviour applies to other aggregates too (AVG, SUM ignore NULLs), which is
a common source of surprising results and a frequent interview check.

Q135. [Easy]  What does DISTINCT do, and how does it differ from GROUP BY?
MODEL ANSWER
DISTINCT  removes  duplicate  rows  from  a  result  set,  returning  only  unique  combinations  of  the  selected  columns.
GROUP  BY  also  produces  one  row  per  distinct  group  but  is  meant  for  aggregation  -  it  lets  you  compute
COUNT/SUM/AVG per group. So for just deduplicating, DISTINCT is clearer; when you need a summary per group,
use GROUP BY. SELECT DISTINCT dept FROM employees and SELECT dept FROM employees GROUP BY dept
return the same rows, but only GROUP BY lets you add COUNT(*).

Q136. [Easy]  How do LIMIT and OFFSET work, and what's the pagination pitfall?
MODEL ANSWER
LIMIT  n  returns  at  most  n  rows;  OFFSET  m  skips  the  first  m.  Together  (LIMIT  10  OFFSET  20)  they  implement
pagination - here, page 3 of 10-row pages. Always pair them with ORDER BY, or the 'order' is undefined and pages
can overlap or skip rows.

The pitfall: large OFFSETs are slow, because the database still scans and discards all the skipped rows. For deep
pagination, keyset pagination (WHERE id > last_seen_id ORDER BY id LIMIT 10) is far more efficient since it seeks
directly via the index instead of counting past thousands of rows.

Q137. [Easy]  What is the CASE expression used for?
MODEL ANSWER
CASE  is  SQL's  if-then-else,  letting  you  return  different  values  based  on  conditions  within  a  query  -  for  derived
columns,  conditional  aggregation,  or  custom  sorting.  For  example,  SELECT  name,  CASE  WHEN  salary  >  100000
THEN  'High'  WHEN  salary  >  50000  THEN  'Mid'  ELSE  'Low'  END  AS  band.  A  powerful  idiom  is  conditional
aggregation - SUM(CASE WHEN status='paid' THEN amount ELSE 0 END) - which is also how you pivot data without
a PIVOT clause.

DBMS & SQL  |  SDE Fresher Question Bank

Page 28

Q138. [Medium]  How do you handle NULLs in SQL - IS NULL, COALESCE, NULLIF?
MODEL ANSWER
You  can't  test  NULL  with  =  (since  NULL  =  anything  is  UNKNOWN);  you  must  use  IS  NULL  /  IS  NOT  NULL.
COALESCE(a, b, c) returns the first non-NULL argument - perfect for providing defaults, e.g. COALESCE(nickname,
first_name,  'Guest').  NULLIF(a,  b)  returns  NULL  if  a  equals  b,  else  a  -  handy  to  avoid  divide-by-zero:  amount  /
NULLIF(qty, 0) yields NULL instead of an error when qty is 0. Together they're the everyday NULL-handling toolkit.

Q139. [Easy]  How do LIKE and wildcard pattern matching work?
MODEL ANSWER
LIKE matches text against a pattern using two wildcards: % matches any sequence of characters (including none) and
_ matches exactly one character. So name LIKE 'A%' finds names starting with A, '%son' finds those ending in son,
and '_at' matches cat, bat, hat. A performance note worth mentioning: a leading wildcard ('%son') can't use a normal
B-tree index (the index is sorted by prefix), so it forces a scan - whereas a trailing wildcard ('A%') can use the index.

Q140. [Medium]  What is a VIEW, and can you update through one?
MODEL ANSWER
A view is a named, saved query that behaves like a virtual table - it stores no data itself, just the query definition, and
runs  underneath  whenever  you  select  from  it.  Views  simplify  complex  queries,  provide  a  stable  interface  over
changing schemas, and restrict access (expose only certain columns/rows for security).

You can update through a simple view (one that maps directly to a single table's rows and columns), and the change
propagates  to  the  base  table.  But  views  with  joins,  aggregates,  DISTINCT,  or  GROUP  BY  are  generally  not
updatable, because the database can't unambiguously map a change back to base rows.

Q141. [Medium]  What's the difference between a view and a materialized view?
n Asked at Amazon, data roles
MODEL ANSWER
A regular view stores only the query and re-executes it every time you access it, so it always reflects current data but
pays the full query cost each time. A materialized view physically stores the query's result set on disk, so reads are
fast  (no  recomputation),  but  the  data  is  a  snapshot  that  can  become  stale  and  must  be  refreshed  (manually,  on  a
schedule, or on commit).

Use a plain view for always-fresh, lightweight abstraction; use a materialized view for expensive aggregations/joins on
slowly-changing data where read speed matters more than real-time accuracy (dashboards, reports).

Q142. [Medium]  What is a stored procedure?
MODEL ANSWER
A stored procedure is a precompiled set of SQL statements (with control flow - variables, loops, conditionals) stored in
the database and invoked by name, optionally with parameters. Benefits: it runs logic close to the data (less network
round-tripping for multi-step operations), can be reused and permission-controlled, and is precompiled for efficiency.
The  trade-off  is  that  business  logic  in  the  database  is  harder  to  version-control  and  test  than  application  code,  so
modern apps use them selectively.

Q143. [Medium]  What's the difference between a stored procedure, a function, and a trigger?
MODEL ANSWER
A stored procedure is called explicitly, can perform actions (INSERT/UPDATE), may return zero or many result sets,
and can manage transactions. A function is designed to compute and return a value, is usually side-effect-free, and
can be used inline within a query (SELECT my_func(col)). A trigger is not called directly at all - it fires automatically in
response  to  a  data  event  (BEFORE/AFTER  INSERT/UPDATE/DELETE)  on  a  table.  Short  version:  procedures  do
work on demand, functions compute values for queries, triggers react to data changes automatically.

Q144. [Medium]  What is a trigger, and when should you use (or avoid) one?
MODEL ANSWER
A trigger is procedural code that the database runs automatically when a specified event (INSERT/UPDATE/DELETE)
occurs on a table, either BEFORE or AFTER the change. Good uses: enforcing complex integrity rules, maintaining
audit/history tables, and auto-updating derived columns.

The caution: triggers run invisibly, so they make behaviour hard to trace and debug, can hurt performance on bulk
operations, and can cascade unexpectedly (a trigger firing another trigger). Best practice is to use them sparingly for

DBMS & SQL  |  SDE Fresher Question Bank

Page 29

cross-cutting concerns like auditing, and keep ordinary business logic in the application.

Q145. [Medium]  What is a cursor, and why is it usually discouraged?
MODEL ANSWER
A  cursor  lets  you  process  a  query's  result  set  one  row  at  a  time  in  procedural  code,  rather  than  as  a  set.  It's
discouraged  because  it  defeats  SQL's  strength:  SQL  is  optimised  for  set-based  operations,  and  row-by-row
processing ('RBAR' - row by agonising row) is far slower and uses more resources. Almost anything a cursor does
can be rewritten as a set-based query (a JOIN, an UPDATE with a subquery, a window function). Use cursors only for
genuinely sequential logic that can't be expressed set-based.

Q146. [Easy]  What's the difference between an implicit (comma) join and an explicit JOIN?
MODEL ANSWER
An implicit join lists tables comma-separated and puts the join condition in WHERE: FROM a, b WHERE a.id = b.a_id.
An explicit join uses the JOIN ... ON syntax: FROM a JOIN b ON a.id = b.a_id. They produce the same result, but
explicit JOINs are strongly preferred - they separate join logic from filtering, support outer joins cleanly, and (critically)
make  it  much  harder  to  accidentally  omit  the  condition  and  produce  an  unintended  Cartesian  product.  Always  use
explicit JOIN syntax.

Q147. [Easy]  What's the difference between CHAR and VARCHAR, and how do you choose common
data types?
MODEL ANSWER
CHAR(n) is fixed-length - it always stores exactly n characters, padding shorter values with spaces; it's slightly faster
and  a  good  fit  for  values  that  are  genuinely  fixed  size  (a  2-letter  country  code,  a  status  flag).  VARCHAR(n)  is
variable-length - it stores only the actual characters (plus a small length prefix) up to a max of n, so it saves space for
variable data like names and emails, which is why it's the usual default.

Broader type sense: use the smallest integer type that fits (INT vs BIGINT), DECIMAL/NUMERIC for money (never
FLOAT - binary floats round badly), DATE/TIMESTAMP for time, BOOLEAN for flags, and TEXT for large free-form
content. Right-sizing types saves storage and keeps indexes compact.

Q148. [Easy]  What's the difference between UNION and JOIN?
MODEL ANSWER
They  combine  data  in  completely  different  directions.  A  JOIN  combines  columns  from  multiple  tables  side  by  side,
matching rows on a condition - it widens the result (more columns). A UNION stacks the rows of two result sets on top
of  each  other  -  it  lengthens  the  result  (more  rows),  and  requires  the  two  queries  to  have  the  same  number  and
compatible  types  of  columns.  Mnemonic:  JOIN  adds  columns  (horizontal),  UNION  adds  rows  (vertical).  People
confuse them, so stating that distinction cleanly helps.

DBMS & SQL  |  SDE Fresher Question Bank

Page 30

9. SQL: Window Functions, CTEs & Classic Problems

The advanced SQL that separates candidates - window functions, CTEs, and the recurring puzzle problems (Nth-highest
salary, top-N per group, running totals, consecutive logins). Every query here has been run and verified. Learn the
patterns, not just the answers.

Q149. [Hard]  What is a window function, and how does it differ from GROUP BY?
n Asked at Amazon, Microsoft - SQL rounds love these
MODEL ANSWER
A  window  function  performs  a  calculation  across  a  set  of  rows  related  to  the  current  row  (a  'window'),  without
collapsing  them  -  every  input  row  is  preserved  in  the  output,  with  the  computed  value  attached.  GROUP  BY,  by
contrast, collapses each group into a single row.

So  to  show  each  employee  alongside  their  department's  average  salary,  a  window  function  is  perfect:  AVG(salary)
OVER (PARTITION BY dept) keeps all employee rows and adds the average to each. GROUP BY would give you
one row per department and lose the individual employees. Window functions also enable rankings and running totals
that GROUP BY simply can't express.

Q150. [Hard]  What's the difference between ROW_NUMBER, RANK, and DENSE_RANK?
n Asked at Amazon, Microsoft
MODEL ANSWER
All assign a number to rows within an ordered window; they differ on how they handle ties. ROW_NUMBER gives
every row a unique sequential number even on ties (1,2,3,4). RANK gives tied rows the same rank but then skips the
next values (1,2,2,4). DENSE_RANK gives tied rows the same rank with no gaps (1,2,2,3).

salary  ROW_NUMBER  RANK  DENSE_RANK
90          1         1        1
70          2         2        2
70          3         2        2
60          4         4        3

Pick  ROW_NUMBER  when  you  need  a  strict  unique  order  (deduplication,  pagination),  RANK/DENSE_RANK  for
leaderboards. For 'Nth highest distinct value' you want DENSE_RANK, since it doesn't skip.

Q151. [Medium]  What do the LAG and LEAD window functions do?
MODEL ANSWER
They let a row access a value from another row in the window without a self-join. LAG(col, n) returns the value from n
rows  before  the  current  row;  LEAD(col,  n)  from  n  rows  after.  The  classic  use  is  comparing  to  the  previous  period:
SELECT  month,  revenue,  revenue  -  LAG(revenue)  OVER  (ORDER  BY  month)  AS  change  computes
month-over-month growth. They're the clean way to do row-to-row comparisons (deltas, gaps, trends).

Q152. [Medium]  What's the difference between PARTITION BY and GROUP BY?
MODEL ANSWER
Both divide rows into groups, but GROUP BY then collapses each group into one summary row, while PARTITION
BY (used with a window function) computes a per-group value but keeps every row. PARTITION BY is essentially
'GROUP  BY  for  window  functions.'  Use  GROUP  BY  when  you  want  aggregated  output  (one  row  per  group);  use
PARTITION BY when you want each detail row annotated with its group's aggregate or ranking.

Q153. [Medium]  What is a CTE (Common Table Expression / WITH clause)?
MODEL ANSWER
A CTE is a named temporary result set defined with WITH at the start of a query, usable like a table within that query.
It makes complex queries readable by breaking them into logical, named steps instead of deeply nested subqueries,
and a single CTE can be referenced multiple times in the main query.

WITH dept_avg AS (
  SELECT dept, AVG(salary) AS avg_sal
  FROM emp GROUP BY dept
)
SELECT e.name, e.salary, d.avg_sal
FROM emp e JOIN dept_avg d ON e.dept = d.dept
WHERE e.salary &gt; d.avg_sal;

DBMS & SQL  |  SDE Fresher Question Bank

Page 31

It reads top-to-bottom like a pipeline. CTEs don't inherently improve performance over subqueries (often the optimiser
treats them the same), but they hugely improve clarity and enable recursion.

Q154. [Hard]  What is a recursive CTE, and when would you use one?
MODEL ANSWER
A recursive CTE references itself to process hierarchical or graph-like data. It has two parts joined by UNION ALL: an
anchor (the base case - the starting rows) and a recursive member that repeatedly joins back to the CTE until no
new rows are produced.

WITH RECURSIVE org AS (
  SELECT id, name, mgr_id, 1 AS lvl       -- anchor: the CEO
  FROM emp WHERE mgr_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.mgr_id, o.lvl+1   -- recurse down the tree
  FROM emp e JOIN org o ON e.mgr_id = o.id
)
SELECT * FROM org;

Perfect for traversing org charts (employee -> manager chains), category trees, bill-of-materials, or finding paths in a
graph - anything with arbitrary depth you can't express with a fixed number of joins.

Q155. [Hard]  How do you find the Nth highest salary?
n Asked at Amazon, Microsoft, Flipkart - the #1 SQL puzzle
MODEL ANSWER
The cleanest, most general approach uses DENSE_RANK so ties are handled and no values are skipped (verified for
N=3 -> returns 75 on a 90/80/75/70/60/50 set):

SELECT DISTINCT salary FROM (
  SELECT salary,
         DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM emp
) t
WHERE rnk = N;

Alternatives  worth  naming:  a  correlated  subquery  'WHERE  N-1  salaries  are  greater',  or  ORDER  BY  salary  DESC
LIMIT 1 OFFSET N-1 (simple but doesn't dedupe ties). The DENSE_RANK version is the one to lead with because it
explicitly handles duplicate salaries - which is exactly the edge case interviewers poke at.

Q156. [Medium]  How do you find the second-highest salary without using LIMIT/TOP?
MODEL ANSWER
Use  a  subquery:  the  second  highest  is  the  maximum  salary  among  everyone  whose  salary  is  less  than  the  overall
maximum (verified -> returns 80):

SELECT MAX(salary) AS second_highest
FROM emp
WHERE salary &lt; (SELECT MAX(salary) FROM emp);

This neatly handles duplicates of the top salary (they're all excluded by the inner MAX) and returns NULL gracefully if
there's no second value. It's the answer interviewers expect when they explicitly forbid LIMIT.

Q157. [Hard]  How do you find the top N earners in each department?
n Asked at Amazon - top-N-per-group
MODEL ANSWER
Rank within each department using a window function partitioned by department, then filter (verified - this keeps tied
salaries, e.g. two people tied for 2nd both appear):

SELECT dept, name, salary FROM (
  SELECT dept, name, salary,
         DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS r
  FROM emp
) t
WHERE r &lt;= N
ORDER BY dept, salary DESC;

Choose  the  ranking  function  deliberately:  DENSE_RANK/RANK  include  all  tied  employees  at  the  cutoff,  while
ROW_NUMBER  returns  exactly  N  rows  per  group  (breaking  ties  arbitrarily).  Stating  that  trade-off  out  loud  is  what
makes the answer strong.

DBMS & SQL  |  SDE Fresher Question Bank

Page 32

Q158. [Medium]  How do you compute a running (cumulative) total?
MODEL ANSWER
Use SUM as a window function with an ORDER BY, which makes it accumulate row by row (verified -> 90, 160, 230,
... as it adds each salary):

SELECT name, salary,
       SUM(salary) OVER (ORDER BY id) AS running_total
FROM emp;

Add PARTITION BY to restart the running total per group (e.g. cumulative spend per customer). You can also control
the  window  frame  explicitly  with  ROWS  BETWEEN  UNBOUNDED  PRECEDING  AND  CURRENT  ROW.  This
replaces the old, slow self-join approach to cumulative sums.

Q159. [Medium]  How do you find duplicate rows in a table?
MODEL ANSWER
Group by the column(s) that define a duplicate and keep groups with more than one row (verified -> salaries 70 and
75 each appear twice):

SELECT salary, COUNT(*) AS cnt
FROM emp
GROUP BY salary
HAVING COUNT(*) &gt; 1;

To  find  fully  duplicate  rows,  group  by  all  the  relevant  columns.  To  then  see  the  actual  duplicate  rows  (not  just  the
values),  join  this  back  to  the  table  or  use  ROW_NUMBER()  OVER  (PARTITION  BY  the_columns)  and  pick  rows
where the number > 1.

Q160. [Medium]  How do you delete duplicate rows while keeping one copy?
MODEL ANSWER
Number  the  duplicates  with  ROW_NUMBER  partitioned  by  the  columns  that  define  equality,  then  delete  every  row
whose number is greater than 1 (keeping the first):

WITH ranked AS (
  SELECT id,
         ROW_NUMBER() OVER (
           PARTITION BY name, dept, salary ORDER BY id) AS rn
  FROM emp
)
DELETE FROM emp
WHERE id IN (SELECT id FROM ranked WHERE rn &gt; 1);

ROW_NUMBER (not DENSE_RANK) is essential here - you want each duplicate to get a distinct number so exactly
one survives per group. The ORDER BY decides which copy you keep.

Q161. [Hard]  How do you find users who logged in on N consecutive days?
n Asked at Amazon, analytics roles - gaps & islands
MODEL ANSWER
This  is  the  'gaps  and  islands'  problem.  The  trick:  subtract  a  per-user  row  number  (as  days)  from  each  login  date  -
consecutive dates then collapse to the same constant, so you can group by it to find streaks (verified -> finds the user
with a 3-day run):

WITH grouped AS (
  SELECT user_id, login_date,
         DATE(login_date, '-' ||
           ROW_NUMBER() OVER (PARTITION BY user_id
                              ORDER BY login_date)
           || ' days') AS grp
  FROM logins
)
SELECT user_id, COUNT(*) AS streak, MIN(login_date) AS start
FROM grouped
GROUP BY user_id, grp
HAVING COUNT(*) &gt;= 3;

Why  it  works:  in  a  consecutive  run,  the  date  increases  by  1  each  step  and  so  does  the  row  number,  so  (date  -
rownum) stays fixed; a gap breaks the constant and starts a new island. It's a pattern worth memorising - it appears
constantly in analytics SQL.

DBMS & SQL  |  SDE Fresher Question Bank

Page 33

Q162. [Medium]  How do you find employees who earn more than their manager?
MODEL ANSWER
Self-join the employee table to itself - once as the employee, once as the manager - and compare salaries:

SELECT e.name AS employee
FROM emp e
JOIN emp m ON e.mgr_id = m.id
WHERE e.salary &gt; m.salary;

The  key  idea  is  the  self-join:  the  same  table  aliased  as  e  and  m,  linked  by  e.mgr_id  =  m.id,  so  each  row  pairs  an
employee  with  their  manager  and  you  can  compare  their  columns  directly.  This  is  a  textbook  LeetCode/Amazon
question.

Q163. [Medium]  How do you find departments whose average salary exceeds the company-wide
average?
MODEL ANSWER
Group by department and use HAVING to compare each department's average to the overall average (computed in a
subquery):

SELECT dept, AVG(salary) AS dept_avg
FROM emp
GROUP BY dept
HAVING AVG(salary) &gt; (SELECT AVG(salary) FROM emp);

The aggregate condition belongs in HAVING (not WHERE) because it filters groups by an aggregate. The subquery
(SELECT AVG(salary) FROM emp) is non-correlated, so it's evaluated once - efficient and clear.

Q164. [Medium]  How do you pivot rows into columns without a PIVOT clause?
MODEL ANSWER
Use conditional aggregation - SUM (or MAX) of a CASE expression - to turn row values into columns. To show total
sales per region as columns:

SELECT
  SUM(CASE WHEN region='North' THEN amount ELSE 0 END) AS north,
  SUM(CASE WHEN region='South' THEN amount ELSE 0 END) AS south,
  SUM(CASE WHEN region='East'  THEN amount ELSE 0 END) AS east
FROM sales;

Each CASE isolates one category's values and the aggregate folds them into a single column. It's portable across all
databases (unlike vendor-specific PIVOT syntax) and is the standard way to reshape data in plain SQL.

DBMS & SQL  |  SDE Fresher Question Bank

Page 34

10. NoSQL, CAP Theorem & Scaling

Where DBMS meets system design. Even fresher rounds probe SQL-vs-NoSQL trade-offs, the CAP theorem, and the
basics of sharding and replication - especially if your resume mentions scalable or distributed projects (yours does).

Q165. [Medium]  SQL vs NoSQL - what's the difference and when do you choose each?
n Asked at Amazon, Microsoft, system-design-adjacent rounds
MODEL ANSWER
SQL databases are relational - structured tables with a fixed schema, strong ACID guarantees, and powerful joins;
they scale primarily vertically. NoSQL databases are non-relational with flexible/schema-less data, are built to scale
horizontally across many nodes, and often relax consistency for availability (BASE).

Choose SQL when you have structured, related data and need strong consistency and complex queries/transactions -
banking, orders, anything where correctness is paramount. Choose NoSQL when you need massive scale, high write
throughput, flexible/evolving schemas, or specific access patterns - user activity feeds, caching, real-time analytics,
IoT data. The honest answer is 'it depends on the data shape, consistency needs, and scale.'

Q166. [Medium]  What are the main types of NoSQL databases?
MODEL ANSWER
Key-value  (Redis,  DynamoDB)  -  a  giant  hash  map;  fastest,  simplest,  great  for  caching  and  sessions.  Document
(MongoDB,  Couchbase)  -  stores  JSON-like  documents;  flexible  schema,  good  for  content  and  catalogs.
Column-family/wide-column  (Cassandra,  HBase)  -  rows  with  dynamic  columns;  excellent  for  huge  write-heavy,
time-series  workloads.  Graph  (Neo4j)  -  nodes  and  edges;  ideal  for  highly  connected  data  like  social  networks  and
recommendations. You pick the family that matches your data's structure and access pattern.

Q167. [Hard]  Explain the CAP theorem.
n Asked at Amazon, Microsoft - very common
MODEL ANSWER
CAP states that a distributed data store can provide at most two of three guarantees simultaneously: Consistency
(every  read  sees  the  latest  write),  Availability  (every  request  gets  a  non-error  response),  and  Partition  tolerance
(the system keeps working despite network partitions between nodes).

The key insight: in any real distributed system, network partitions will happen, so P is non-negotiable - which means
the real choice during a partition is between C and A. A CP system refuses requests to stay consistent (e.g. a banking
system rejects writes it can't confirm); an AP system keeps serving but may return stale data (e.g. a social feed). So
CAP is really 'when the network splits, do you sacrifice consistency or availability?'

Q168. [Hard]  Give examples of CP, AP, and CA systems.
MODEL ANSWER
CP (consistency + partition tolerance, sacrifice availability during partitions): MongoDB (single-primary), HBase, and
traditional RDBMSs with synchronous replication - they'd rather reject a request than serve stale/divergent data. AP
(availability  +  partition  tolerance,  sacrifice  strict  consistency):  Cassandra,  DynamoDB,  CouchDB  -  they  stay  up  and
reconcile  later  (eventual  consistency).  CA  (consistency  +  availability,  no  partition  tolerance)  is  really  only  a
single-node  system  -  because  once  you're  distributed,  partitions  are  inevitable,  so  pure  CA  isn't  achievable  in  a
distributed setting. That last point is the nuance interviewers look for.

Q169. [Hard]  What is PACELC?
MODEL ANSWER
PACELC  extends  CAP  to  cover  normal  operation,  not  just  failures.  It  says:  if  there's  a  Partition  (P),  you  trade
between  Availability  and  Consistency  (the  CAP  part);  Else  (E),  in  normal  operation,  you  trade  between  Latency
and Consistency. The 'else' clause is the real addition - even with no partition, strong consistency (e.g. waiting for all
replicas to acknowledge) costs latency. So DynamoDB is 'PA/EL' (favours availability and low latency), while a fully
consistent system is 'PC/EC'. It's a more complete model of the consistency-vs-performance reality.

DBMS & SQL  |  SDE Fresher Question Bank

Page 35

Q170. [Medium]  What's the difference between ACID and BASE?
MODEL ANSWER
ACID (the SQL philosophy) prioritises correctness: Atomic, Consistent, Isolated, Durable - strong guarantees, typically
on  a  single  node  or  with  synchronous  replication.  BASE  (the  NoSQL  philosophy)  prioritises  availability  and  scale:
Basically Available, Soft state, Eventually consistent - the system stays up and converges to consistency over time
rather than guaranteeing it instantly.

They sit at opposite ends of the consistency-availability spectrum, and the choice follows CAP: ACID systems lean CP
(correctness first), BASE systems lean AP (availability and scale first, accept temporary staleness).

Q171. [Medium]  What is eventual consistency?
MODEL ANSWER
Eventual  consistency  is  a  weak  consistency  model  where,  if  no  new  updates  are  made,  all  replicas  will  eventually
converge  to  the  same  value  -  but  for  a  short  window  after  a  write,  different  replicas  (and  readers)  may  see
different/stale values. It's the trade-off AP systems accept to stay available and low-latency under partitions. It's fine
for things like a like-count or a social feed (briefly stale is okay) but unacceptable for a bank balance - which is why the
consistency model must match the use case.

Q172. [Medium]  What is sharding (horizontal partitioning)?
n Asked at Amazon, scaling questions
MODEL ANSWER
Sharding splits a large table's rows across multiple independent database servers (shards), each holding a subset of
the data, so the dataset and load are distributed rather than bottlenecked on one machine. For example, users A-M on
shard 1, N-Z on shard 2.

It  enables  horizontal  scaling  beyond  what  one  server  can  hold  or  handle.  The  cost  is  complexity:  choosing  a  good
shard key, routing queries to the right shard, and the pain of cross-shard queries and joins (which become expensive
or impossible) and cross-shard transactions.

Q173. [Medium]  What's the difference between horizontal and vertical partitioning?
MODEL ANSWER
Horizontal partitioning splits a table by rows - each partition has the same columns but a different subset of rows
(e.g.  by  date  range  or  user  ID).  Sharding  is  horizontal  partitioning  across  servers.  Vertical  partitioning  splits  by
columns - putting frequently-accessed columns in one table and rarely-used or large columns (like a big text blob) in
another, joined by key. Horizontal helps with row volume and load distribution; vertical helps when a table is wide and
only some columns are hot.

Q174. [Hard]  What are the common sharding strategies?
MODEL ANSWER
Range-based - partition by value ranges (users A-M, N-Z; or by date). Simple and good for range queries, but prone
to hotspots if data isn't evenly distributed. Hash-based - hash the shard key to pick a shard; distributes evenly and
avoids hotspots, but range queries become hard (adjacent keys scatter). Directory-based - a lookup service maps
keys  to  shards;  flexible  (you  can  rebalance)  but  the  directory  is  an  extra  component  and  potential  bottleneck.
Consistent  hashing  is  the  refined  approach  that  minimises  data  movement  when  adding/removing  shards  -  worth
name-dropping.

Q175. [Medium]  What is database replication, and what is the leader-follower model?
MODEL ANSWER
Replication  keeps  copies  of  the  data  on  multiple  servers  for  availability  and  read  scaling.  In  the  leader-follower
(primary-replica)  model,  one  node  is  the  leader  that  accepts  all  writes  and  propagates  them  to  follower  replicas;
followers serve reads. If the leader fails, a follower is promoted (failover).

Benefits: read scalability (spread reads across replicas), high availability, and geographic locality. The main issue is
replication lag - followers can be slightly behind the leader, so a read from a replica may return stale data right after a
write.  Other  models  are  multi-leader  (writes  anywhere,  conflict  resolution  needed)  and  leaderless  (Dynamo-style
quorums).

DBMS & SQL  |  SDE Fresher Question Bank

Page 36

Q176. [Medium]  What are read replicas and read/write splitting?
MODEL ANSWER
Read replicas are follower copies of the primary database used purely to serve read queries. Read/write splitting is
the application pattern of sending all writes to the primary and distributing reads across the replicas - which scales
read-heavy workloads (most apps are read-dominant) without overloading the primary. The catch is replication lag: a
user  who  just  wrote  data  and  immediately  reads  from  a  replica  might  not  see  their  own  change  ('read-your-writes'
problem), so critical reads are sometimes routed to the primary.

Q177. [Easy]  What's the difference between vertical and horizontal scaling?
MODEL ANSWER
Vertical scaling (scaling up) means making a single server more powerful - more CPU, RAM, faster disk. It's simple
(no  app  changes)  but  has  a  hard  ceiling  and  gets  expensive,  and  the  server  is  a  single  point  of  failure.  Horizontal
scaling (scaling out) means adding more servers and distributing load across them - effectively unlimited and more
fault-tolerant, but it requires handling distribution (sharding, replication, load balancing) and the complexity that brings.
Databases scale up easily but scale out with difficulty, which is much of why NoSQL emerged.

Q178. [Hard]  What new problems does sharding introduce?
MODEL ANSWER
Several. Cross-shard queries and joins become slow or impossible, since data for one query may live on different
servers.  Cross-shard  transactions  lose  easy  ACID  (you'd  need  distributed  commit).  Choosing  the  shard  key  is
critical  and  hard  to  change  later  -  a  bad  key  causes  hotspots  (uneven  load)  or  scatters  related  data.  Rebalancing
when adding/removing shards means moving data (mitigated by consistent hashing). And operational complexity rises
- more nodes to monitor, back up, and fail over. So you shard only when a single (replicated) database genuinely can't
cope.

Q179. [Medium]  What is a partition key (shard key), and why does choosing it well matter?
MODEL ANSWER
The partition/shard key is the column whose value decides which partition or shard a row lives on. Choosing it well is
critical because it determines load distribution and query efficiency: a good key spreads data and traffic evenly and
keeps data that's queried together on the same shard. A bad key creates hotspots - e.g. sharding by 'country' when
80% of users are in one country overloads that shard - or forces expensive cross-shard scatter-gather queries. And
it's painful to change after the fact, so it's a high-stakes early decision.

Q180. [Medium]  Why do NoSQL databases often denormalize data?
MODEL ANSWER
Because  many  NoSQL  stores  don't  support  joins  (or  make  them  expensive  across  nodes),  so  the  strategy  flips:
instead of normalizing and joining at read time, you model for your queries by embedding/duplicating related data
together so a single read returns everything needed. For example, a document database might embed a user's recent
orders inside the user document.

This trades storage and write complexity (you must update duplicated data in multiple places) for fast, single-lookup
reads  at  scale  -  exactly  the  opposite  priority  from  normalized  SQL.  It's  'denormalize  and  design  around  access
patterns,' which is the core mindset shift when moving from SQL to NoSQL.

DBMS & SQL  |  SDE Fresher Question Bank

Page 37

11. Practical, Optimization & Synthesis

The 'do you actually work with databases' round - query tuning, EXPLAIN, the N+1 problem, SQL injection, caching, and
real debugging scenarios. These are where backend interviewers spend time and where your project experience (Rails,
Postgres) becomes a strength.

Q181. [Medium]  How do you approach optimising a slow SQL query?
n Asked at Amazon, backend roles
MODEL ANSWER
Start by measuring, not guessing: run EXPLAIN/EXPLAIN ANALYZE to see the execution plan and find the expensive
step - usually a full table scan, a bad join order, or a sort. Then work through the usual levers: add or fix indexes on
the columns in WHERE/JOIN/ORDER BY; make sure predicates are 'sargable' (avoid wrapping indexed columns in
functions); select only needed columns instead of SELECT *; reduce rows early with better filtering; rewrite correlated
subqueries as joins; and check that table statistics are up to date so the optimiser chooses well.

If it's still slow at scale, consider denormalization, caching, materialized views, or partitioning. The structured story -
measure with EXPLAIN, identify the bottleneck, apply the targeted fix, re-measure - is what interviewers want.

Q182. [Medium]  What is a query execution plan, and what does EXPLAIN show you?
MODEL ANSWER
The execution plan is the step-by-step strategy the optimiser chose to run your query - which indexes it uses, the join
algorithm (nested loop, hash, merge), the order tables are accessed, and estimated row counts and costs. EXPLAIN
shows this plan; EXPLAIN ANALYZE actually runs the query and shows real timings and row counts.

You read it to spot problems: a 'Seq Scan'/'full table scan' on a big table, a row estimate wildly different from actual
(stale  statistics),  or  an  expensive  sort.  It  turns  query  tuning  from  guesswork  into  diagnosis  -  always  the  first  tool  to
reach for.

Q183. [Medium]  What is the N+1 query problem?
n Asked at backend roles - you can speak to this from Rails
MODEL ANSWER
The N+1 problem is when code runs 1 query to fetch a list of N items, then fires 1 additional query per item to load
related data - N+1 queries total instead of a constant few. It usually sneaks in through ORM lazy loading: you fetch
100 posts, then access post.author in a loop, triggering 100 separate author queries.

It's a major performance killer because of per-query round-trip overhead. The fix is eager loading - fetch the related
data  in  one  go  with  a  JOIN  or  an  IN  query  (Rails  'includes',  SQL  'JOIN',  or  a  batched  'WHERE  author_id  IN  (...)').
Recognising and naming this is a strong signal you've built real apps.

Q184. [Hard]  What is SQL injection and how do you prevent it?
n Asked at Amazon, Microsoft, security-aware teams
MODEL ANSWER
SQL injection is an attack where user input is concatenated directly into a SQL string, letting an attacker inject SQL
that the database executes. The classic example: a login that builds "... WHERE user='" + input + "'" can be broken
with input like ' OR '1'='1, turning the condition always-true, or '; DROP TABLE users;-- to run arbitrary commands.

The  primary  defence  is  parameterised  queries  /  prepared  statements:  you  send  the  SQL  and  the  values
separately,  so  user  input  is  always  treated  as  data,  never  as  executable  SQL.  Supplement  with  input  validation,
least-privilege  database  accounts,  and  ORMs  (which  parameterise  by  default).  Never  build  SQL  by  string
concatenation - that's the whole vulnerability.

Q185. [Medium]  What is a prepared statement, and how does it help with both performance and security?
MODEL ANSWER
A prepared statement is a SQL template with placeholders (e.g. WHERE id = ?) that you send to the database once to
be  parsed  and  planned,  then  execute  repeatedly  with  different  parameter  values.  Performance:  the  parse/plan
happens once and is reused, so running the same query many times (different values) is cheaper. Security: because
parameters are sent separately from the SQL text, user input can never be interpreted as SQL - which is exactly what
prevents SQL injection. So prepared statements give you speed and safety, which is why they're the standard way to
run parameterised queries.

DBMS & SQL  |  SDE Fresher Question Bank

Page 38

Q186. [Medium]  What is connection pooling and why is it important?
MODEL ANSWER
Opening a new database connection is expensive (TCP handshake, authentication, session setup). A connection pool
maintains a set of reusable open connections that the application borrows for a query and returns when done, instead
of  opening/closing  one  per  request.  This  dramatically  cuts  latency  and  lets  the  app  handle  high  request  volumes
without overwhelming the database with connection churn. It also caps concurrent connections (databases handle a
limited number well), preventing the DB from being swamped - a key reliability tool in any backend service.

Q187. [Medium]  What's the difference between OLTP and OLAP?
n Commonly asked
MODEL ANSWER
OLTP (Online Transaction Processing) handles many small, fast read/write transactions - the day-to-day operational
workload  (placing  orders,  updating  profiles).  It's  normalized,  row-oriented,  and  optimised  for  quick  single-record
operations with ACID. OLAP (Online Analytical Processing) handles complex analytical queries over huge volumes of
historical data - aggregations, trends, reporting. It's often denormalized (star schema), column-oriented, and optimised
for scanning and aggregating many rows. In short: OLTP runs the business in real time; OLAP analyses it.

Q188. [Medium]  What is a data warehouse, and what are star and snowflake schemas?
MODEL ANSWER
A  data  warehouse  is  a  central  repository  of  integrated  historical  data  from  many  sources,  built  for  OLAP/analytics
rather than day-to-day transactions. Its data is modelled dimensionally. A star schema has a central fact table (the
measurements - sales amounts) surrounded by denormalized dimension tables (date, product, customer) - simple and
fast for queries. A snowflake schema normalizes those dimensions into sub-tables, saving space but adding joins.
Star is the common default in warehouses because query simplicity and speed usually beat the storage savings.

Q189. [Medium]  What's the difference between a row-store and a column-store database?
MODEL ANSWER
A row-store keeps all of a row's columns together on disk - ideal for OLTP, where you read/write whole records (fetch
a user, insert an order). A column-store keeps each column's values together - ideal for OLAP, where queries scan
one  or  two  columns  across  millions  of  rows  (SUM  all  sales),  because  you  read  only  the  needed  columns  and  they
compress  extremely  well  (similar  values  adjacent).  So  row-store  for  transactional  workloads,  column-store  (e.g.
Redshift, ClickHouse, Parquet) for analytical aggregation.

Q190. [Medium]  How is caching used with databases, and what are the write strategies?
MODEL ANSWER
A cache (often Redis/Memcached) holds frequently accessed data in memory to avoid hitting the database for every
read - the single biggest lever for read-heavy performance. Common patterns: cache-aside (app checks cache, on
miss reads DB and populates cache - the most common), write-through (write to cache and DB together, keeping
them consistent at write cost), write-back (write to cache, flush to DB later - fast but risks loss), and write-around
(write to DB only, cache fills on read). The hard part is always invalidation - keeping the cache from serving stale data.

Q191. [Medium]  What is a cache stampede (thundering herd), and how do you prevent it?
MODEL ANSWER
A cache stampede happens when a popular cached key expires and suddenly many concurrent requests all miss the
cache  at  once  and  hammer  the  database  to  recompute  the  same  value  -  a  traffic  spike  that  can  overload  the  DB.
Prevention: use a lock/mutex so only one request recomputes while others wait or serve stale data; add small random
jitter to expiry times so keys don't all expire together; or proactively refresh hot keys before they expire. It's a great
answer that shows you think about failure modes at scale.

Q192. [Medium]  What is replication lag and the read-after-write consistency problem?
MODEL ANSWER
Replication  lag  is  the  delay  between  a  write  committing  on  the  primary  and  that  change  appearing  on  the  read
replicas.  It  causes  the  read-after-write  problem:  a  user  updates  their  profile  (write  ->  primary),  then  immediately
reloads (read -> replica) and sees the old data because the replica hasn't caught up - confusing and bug-like.

Fixes: route a user's reads to the primary for a short window after they write; or track the write position and only read
from  a  replica  that's  caught  up  to  it;  or  read  the  user's  own  recent  writes  from  the  primary  while  others  come  from
replicas. It's the practical cost of scaling reads with replicas.

DBMS & SQL  |  SDE Fresher Question Bank

Page 39

Q193. [Medium]  What's the difference between partitioning and sharding?
MODEL ANSWER
They're  related  and  often  conflated.  Partitioning  generally  means  splitting  one  table  into  pieces  within  a  single
database  instance  (e.g.  partition  orders  by  month)  -  the  DB  manages  it,  and  it  improves  manageability  and  query
pruning.  Sharding  is  partitioning  across  multiple  separate  database  servers,  so  each  shard  is  an  independent
machine. So all sharding is a form of partitioning, but sharding specifically distributes across nodes for horizontal scale
- and brings the cross-node complexity that in-instance partitioning avoids.

Q194. [Medium]  How would you run a schema migration safely on a live production database?
MODEL ANSWER
Use backward-compatible, incremental changes - the expand-contract pattern. To rename or restructure a column
without downtime: expand (add the new column, deploy code that writes to both old and new), backfill existing rows,
switch  reads  to  the  new  column,  then  contract  (stop  using  and  finally  drop  the  old  column).  Make  each  step
independently deployable and reversible.

Also: avoid long-locking operations on big tables (adding a NOT NULL column with a default, or an index, can lock -
use online/concurrent index builds), do it in low-traffic windows, and always have a rollback plan and a backup. The
principle is that old and new code must both work during the rollout.

Q195. [Medium]  What is an ORM, and what are its trade-offs?
MODEL ANSWER
An ORM (Object-Relational Mapper, e.g. ActiveRecord, Hibernate, SQLAlchemy) maps database tables to objects in
your  code,  so  you  work  with  objects  and  methods  instead  of  writing  raw  SQL.  Pros:  faster  development,  less
boilerplate, database portability, and built-in protection against SQL injection. Cons: it hides what SQL actually runs,
which  can  cause  performance  surprises  -  the  N+1  problem  is  the  classic  example  -  and  complex  queries  are
sometimes  awkward  or  inefficient  through  the  ORM.  The  pragmatic  stance:  use  the  ORM  for  the  90%  of
straightforward queries, and drop to raw SQL for the performance-critical or complex ones.

Q196. [Hard]  What's the difference between a B-tree-based and an LSM-tree-based storage engine?
n Relevant to infra/backend roles
MODEL ANSWER
B-trees (used by most RDBMSs, e.g. InnoDB) update data in place, which gives fast reads and good range queries
but  does  random  writes  that  are  slower  under  heavy  write  load.  LSM  trees  (Log-Structured  Merge  trees,  used  by
Cassandra,  RocksDB,  LevelDB)  buffer  writes  in  memory  and  flush  them  as  sorted  files  sequentially,  then  merge
('compact') them in the background - giving very high write throughput at the cost of read amplification (a read may
check several files) and background compaction work.

Rule  of  thumb:  B-trees  for  read-heavy/transactional  workloads,  LSM  trees  for  write-heavy  workloads  (time-series,
logging, high-ingest). Good to know given your Mini-Redis / systems interest.

Q197. [Medium]  Auto-increment integer vs UUID for a primary key - what's the trade-off?
MODEL ANSWER
Auto-increment  integers  are  compact  (4-8  bytes),  human-readable,  and  sequential  -  which  keeps  B-tree  inserts
efficient (appends at the end) and clustered indexes tight. But they leak information (count/ordering), require the DB to
coordinate the next value (harder across shards), and collide when merging databases.

UUIDs  are  globally  unique  (great  for  distributed  systems  and  client-side  generation,  no  coordination)  but  larger  (16
bytes) and random - and random insertion into a clustered B-tree causes page splits and fragmentation. The middle
ground is time-ordered UUIDs (UUIDv7/ULID), which are unique but roughly sortable, getting most of both benefits.

Q198. [Medium]  How do you check whether a query is actually using an index, and why might it not?
MODEL ANSWER
Check with EXPLAIN - look for an 'Index Scan'/'Index Seek' versus a 'Seq Scan'/'full table scan' on the relevant table.
If  it's  not  using  your  index,  common  reasons:  a  function  or  type-cast  on  the  indexed  column  (WHERE
YEAR(created)=2026 or comparing a string column to a number) makes it non-sargable; a leading-wildcard LIKE '%x';
low selectivity so the optimiser judges a scan cheaper; stale statistics misleading the optimiser; or the query returning
most of the table anyway. The fix depends on the cause - rewrite the predicate to be sargable, update statistics, or
add a better-suited index.

DBMS & SQL  |  SDE Fresher Question Bank

Page 40

Q199. [Medium]  In practice, which isolation level would you choose and why?
MODEL ANSWER
Default  to  Read  Committed  (Postgres/Oracle  default)  for  most  applications  -  it  prevents  dirty  reads  with  good
concurrency and is enough for typical CRUD. Step up to Repeatable Read when a transaction reads the same data
multiple  times  and  needs  stable  values  (e.g.  generating  a  report  mid-transaction).  Use  Serializable  only  for
operations where correctness is critical and conflicts are rare (financial calculations, inventory decrements), accepting
more aborts/retries and lower concurrency. Rarely use Read Uncommitted. The principle: pick the lowest level that's
still correct for the operation, since higher isolation costs concurrency.

Q200. [Easy]  What's the difference between a logical and a physical backup?
MODEL ANSWER
A logical backup exports the data as SQL statements or a portable dump (e.g. pg_dump, mysqldump) - the schema
and INSERTs to recreate the data. It's portable across versions/platforms and lets you restore selectively, but it's slow
for huge databases. A physical backup copies the actual data files/blocks on disk - fast to take and restore for large
databases  and  supports  point-in-time  recovery  with  the  logs,  but  it's  tied  to  the  same  engine/version  and  is
all-or-nothing. Big production systems usually rely on physical backups plus WAL archiving for point-in-time recovery.

Q201. [Medium]  Should you index foreign key columns?
MODEL ANSWER
Usually  yes.  Most  databases  automatically  index  the  primary  key  but  not  the  foreign  key  columns  that  reference  it.
Indexing  FKs  helps  in  two  ways:  joins  on  the  relationship  are  faster,  and  -  importantly  -  it  speeds  up  parent
deletes/updates, because without an FK index the DB may have to full-scan the child table to check for referencing
rows (and some databases take a more aggressive lock). The exception is very write-heavy child tables where the
index maintenance cost outweighs the benefit, but as a default, index your foreign keys.

Q202. [Medium]  How would you store hierarchical data (like a category tree) in a relational database?
MODEL ANSWER
A few standard models. Adjacency list - each row stores its parent_id; dead simple and great for direct parent/child,
but querying an arbitrary-depth subtree needs a recursive CTE. Path enumeration - store the full path ('/1/4/9/') in a
column; easy subtree queries via LIKE, but fragile on moves. Nested set - store left/right traversal numbers; very fast
subtree  reads  but  expensive  to  update.  Closure  table  -  a  separate  table  storing  every  ancestor-descendant  pair;
flexible and fast to query at the cost of extra storage. Adjacency list + recursive CTE is the common default; closure
table when you query hierarchies heavily.

Q203. [Easy]  What is a database connection leak, and how do you avoid it?
MODEL ANSWER
A connection leak is when application code borrows a connection from the pool but never returns it (often due to an
exception path that skips the close/release). Over time the pool is exhausted, and new requests hang or fail waiting
for  a  free  connection  -  the  app  grinds  to  a  halt  even  though  the  database  is  healthy.  Avoid  it  by  always  releasing
connections  in  a  finally  block  or  using  language  constructs  that  auto-close  (try-with-resources,  context  managers,
RAII), and set pool timeouts so a leaked connection eventually surfaces as an error rather than a silent hang.

Q204. [Medium]  Scenario: login lookups on your users table have gotten slow. How do you diagnose and
fix it?
MODEL ANSWER
First confirm the query and run EXPLAIN - a login filters by email/username, so check whether that column is indexed;
a missing index means a full table scan that degrades as the table grows. If there's no index on the lookup column,
add a unique index on it - that's usually the whole fix.

If an index exists but isn't used, look for non-sargable predicates (e.g. WHERE LOWER(email) = ? without a matching
functional index, or a type mismatch). Beyond indexing: ensure the query selects only needed columns, check for lock
contention or replication lag if reads hit a busy replica, and consider caching the hot lookups. The method - reproduce,
EXPLAIN, find the scan, add the right index, re-measure - is the answer.

DBMS & SQL  |  SDE Fresher Question Bank

Page 41

Q205. [Medium]  Why is it generally harder to scale writes than reads in a database?
MODEL ANSWER
Reads scale out easily: add read replicas and spread queries across them, since reads don't change state and can be
served from any up-to-date copy. Writes are harder because every write must be applied consistently everywhere - in
a  single-leader  setup  all  writes  funnel  through  one  primary  (a  bottleneck),  and  replicating  them  adds  lag;  in  a
multi-leader/sharded setup you face conflicts and the loss of easy cross-node transactions.

So the usual scaling path is: first scale reads with replicas and caching, and only when write throughput itself is the
ceiling  do  you  shard  -  accepting  the  complexity  of  shard  keys,  cross-shard  queries,  and  distributed  consistency.
'Reads scale with copies, writes scale only with partitioning' is the crisp takeaway.

DBMS & SQL  |  SDE Fresher Question Bank

Page 42


