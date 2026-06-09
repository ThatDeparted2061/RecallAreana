LLD + SYSTEM DESIGN

SDE Fresher Interview Question Bank

Product & service-based company interviews  -  India 2026 cycle

Complete, interview-ready coverage of Low-Level Design (machine-coding rounds at Flipkart,
Atlassian, Uber, Adobe) and High-Level / System Design basics that surface for freshers - the LLD
framework, SOLID & patterns in practice, the classic problems (Parking Lot, LRU Cache, Splitwise,
Rate Limiter), plus scaling, caching, sharding, messaging, and the canonical designs (URL shortener,
news feed, chat, Uber). Tailored for a backend/systems profile.

Prepared for: Harsh Rao - BITS Pilani Goa, SDE-1 prep
Volume 5 of 5 - Core CS Interview Series - June 2026
Total questions in this volume: 201
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

LLD + System Design  |  SDE Fresher Question Bank

Page 2

Table of Contents

1. LLD Fundamentals & Interview Approach

2. SOLID & Design Patterns Applied to LLD

3. Classic LLD Problems - Part 1

4. Classic LLD Problems - Part 2

5. System Design Fundamentals

6. Scaling, Load Balancing & Caching

7. Databases & Storage at Scale

8. Messaging, Async Processing & Microservices

9. API Design & Networking in System Design

10. Canonical System Designs

11. Reliability, Observability & Synthesis

4

7

10

14

18

21

25

29

33

37

42

LLD + System Design  |  SDE Fresher Question Bank

Page 3

1. LLD Fundamentals & Interview Approach

Machine-coding/LLD rounds appear at Flipkart, Atlassian, Adobe, Uber and many startups. They grade extensible,
SOLID, readable code - not cleverness. Master the approach (clarify -> entities -> relationships -> patterns -> code core)
before the specific problems.

Q1. [Easy]  What is Low-Level Design (LLD)?
MODEL ANSWER
LLD is the detailed, object-level design of a system component - deciding the classes, their attributes and methods,
the relationships between them, the interfaces and abstractions, and how objects collaborate to fulfil the requirements.
It's the bridge between high-level architecture and actual code, and it's what a machine-coding round tests: can you
translate requirements into clean, extensible, working classes?

Q2. [Medium]  What's the difference between LLD and HLD?
n Commonly asked
MODEL ANSWER
HLD (High-Level Design) is the big-picture architecture - the major components/services, databases, load balancers,
caches, queues, and how they interact at a system level. It answers 'what are the building blocks and how do they fit
together at scale.' LLD (Low-Level Design) zooms into one component and designs its internal classes, methods,
and interactions - 'how do I implement this piece in clean OO code.'

So HLD is about distributed components and scalability (boxes and arrows); LLD is about classes and design patterns
(UML and code). A system design interview is HLD; a machine coding interview is LLD.

Q3. [Medium]  How should you approach a low-level design problem in an interview?
n Asked at Flipkart, Atlassian, Uber - the framework
MODEL ANSWER
Use  a  consistent  framework  so  you  don't  freeze:  (1)  Clarify  requirements  and  scope  -  functional  features,  edge
cases, scale, whether concurrency matters. (2) Identify entities - the nouns in the problem become your classes. (3)
Define  their  attributes,  methods,  and  relationships  (association/aggregation/composition,  inheritance).  (4)  Apply
SOLID  and  the  right  design  patterns  where  they  genuinely  fit.  (5)  Code  the  core  classes  and  the  main  flow  with
clean naming, enums/constants, and encapsulation. (6) Discuss extensions - concurrency, new features, scale.

Narrate as you go - the interviewer grades your design reasoning, not just the final code.

Q4. [Medium]  Why is clarifying requirements so important in an LLD round?
MODEL ANSWER
Because LLD problems are deliberately under-specified - the interviewer wants to see you scope the problem rather
than  code  blindly.  Clarifying  decides  which  entities  and  features  you  need  and  prevents  you  from  over-  or
under-building. Key questions: which features are in scope (and which to skip), the expected scale, whether you need
thread-safety,  what  edge  cases  matter,  and  whether  persistence/UI  is  required.  Pinning  scope  early  lets  you  build
something complete and clean in the limited time, which is exactly what's graded.

Q5. [Medium]  How do you identify the classes/entities from a problem statement?
MODEL ANSWER
The classic technique: pick out the nouns in the requirements - they usually map to classes/entities (in 'a parking lot
has  floors  with  spots  for  vehicles',  the  nouns  ParkingLot,  Floor,  Spot,  Vehicle  become  classes).  The  verbs  tend  to
become methods (park, unpark, calculateFee). Then identify relationships (a Floor has-many Spots) and which nouns
are  really  attributes  vs  full  classes.  Write  the  class  names  down  first  to  show  the  interviewer  your  model  before
fleshing out members.

LLD + System Design  |  SDE Fresher Question Bank

Page 4

Q6. [Medium]  What makes code 'good' in a machine-coding round (how is it graded)?
n Asked at Flipkart - grading criteria
MODEL ANSWER
Graders look for: modularity (small, single-responsibility classes, separated into models/services/etc.); extensibility
(can you add a feature without rewriting - SOLID, especially Open/Closed); clean code (meaningful names, no magic
numbers - use enums/constants, no dead code); encapsulation (private fields, clear interfaces); appropriate design
patterns (used where they fit, not forced); working demo (a main/driver exercising the core flow); and ideally a few
tests. Completeness matters less than clean, extensible structure - they'd rather see a well-designed subset than a
messy 'everything.'

Q7. [Medium]  What is a UML class diagram, and what do the relationship arrows mean?
MODEL ANSWER
A  UML  class  diagram  depicts  classes  (name,  attributes,  methods)  and  the  relationships  between  them.  The  key
relationships: inheritance (a hollow triangle arrow, 'is-a'), association (a plain line, 'uses-a'), aggregation (a hollow
diamond, weak 'has-a', parts can outlive the whole), composition (a filled diamond, strong 'has-a', parts die with the
whole),  and  dependency  (a  dashed  arrow,  'depends-on').  Multiplicities  (1,  *,  0..1)  annotate  how  many.  You  sketch
these to communicate your design before coding.

Q8. [Hard]  How do you handle concurrency / thread-safety in an LLD problem?
n Asked at Uber, BookMyShow-style problems
MODEL ANSWER
First  ask  if  concurrency  is  in  scope  -  many  problems  (BookMyShow  seat  booking,  parking  allocation,  rate  limiter)
require  it.  Then  protect  the  critical  sections  where  shared  state  is  mutated.  Techniques:  synchronized  blocks  /
ReentrantLock  around
for  counters;
(AtomicInteger)
ConcurrentHashMap for shared maps; or optimistic locking (version check) to avoid long-held locks.

the  booking/allocation  step;  atomic  operations

The  classic  example  is  two  users  booking  the  same  seat:  you  must  make  'check  seat  is  free  and  mark  it  booked'
atomic, or both succeed. Mentioning the race condition and how you'd make the operation atomic (lock the seat/row,
or a DB transaction with a unique constraint) is exactly the depth interviewers want.

Q9. [Easy]  What's the role of enums and constants in LLD?
MODEL ANSWER
They  replace  'magic  values'  (raw  strings/numbers)  with  named,  type-safe  options  -  which  is  a  graded  code-quality
signal.  Use  enums  for  a  fixed  set  of  categories  (VehicleType.{CAR,  BIKE,  TRUCK},  OrderStatus.{PLACED,
SHIPPED,  DELIVERED})  and  constants  for  fixed  values  (MAX_RETRIES).  Benefits:  the  compiler  catches  invalid
values,  switch  statements  are  exhaustive,  and  the  code  self-documents.  Java  enums  can  also  carry  data  and
behaviour, which is handy for things like pricing per vehicle type.

Q10. [Medium]  How do you design for extensibility - adding new features later without rewriting?
MODEL ANSWER
Program  to  abstractions  (interfaces)  and  apply  the  Open/Closed  principle  so  new  behaviour  is  added  as  new
classes, not edits to existing ones. Use the Strategy pattern for swappable algorithms (parking-spot allocation, pricing,
payment  methods),  the  Factory  pattern  for  creating  new  types,  and  avoid  long  type-switches  (replace  with
polymorphism).  Keep  responsibilities  separated  (SRP)  so  a  change  touches  one  class.  When  the  interviewer  says
'now  add  electric  vehicles'  or  'add  a  new  payment  method',  a  good  design  lets  you  answer  'I  just  add  a  new  class
implementing this interface' - that's the signal they're testing for.

Q11. [Medium]  How much should you code versus design in a 60-90 minute LLD round?
MODEL ANSWER
Spend the first ~10-15 minutes clarifying requirements and sketching entities/relationships, then the bulk of the time
coding  the  core  classes  and  the  main  flow  -  you  usually  won't  code  everything,  and  that's  expected.  Prioritise  the
central use case end-to-end (e.g. for a parking lot: park a vehicle, find a spot, generate a ticket, calculate fee) and a
runnable demo, over breadth. Leave a few minutes to discuss extensions and edge cases. The mistake is spending
too long designing and running out of time to show working, clean code.

LLD + System Design  |  SDE Fresher Question Bank

Page 5

Q12. [Medium]  What are common mistakes candidates make in LLD interviews?
MODEL ANSWER
Jumping straight to coding without clarifying scope; creating a single 'god class' that does everything (violating SRP);
over-engineering  with  unnecessary  patterns;  using  magic  strings/numbers  instead  of  enums/constants;  ignoring
extensibility  (hard-coding  so  a  new  type  means  rewriting);  forgetting  concurrency  when  the  problem  needs  it;  poor
naming;  and  not  leaving  a  working  demo.  Also:  silence  -  not  narrating  the  design  reasoning.  The  antidotes  are  the
framework (clarify first), SOLID, and talking through trade-offs.

Q13. [Medium]  How do you decide between inheritance and composition in a design?
MODEL ANSWER
Use inheritance only for a genuine 'is-a' relationship where the subtype is fully substitutable for the base (passes the
Liskov test) - e.g. Car is-a Vehicle. Use composition ('has-a' / 'uses-a') for everything else, and as the default - it's
more flexible (swap parts at runtime), avoids tight coupling and the fragile base class problem, and you expose only
what  you  choose.  The  guideline  'favour  composition  over  inheritance'  means:  reach  for  composition  unless
inheritance is clearly the right model. A Car has-an Engine (composition), but a SportsCar is-a Car (inheritance).

Q14. [Medium]  How do you structure the packages/layers in an LLD solution?
MODEL ANSWER
Separate by responsibility into layers: models/entities (the domain objects - Vehicle, Ticket), services (the business
logic
in  scope),
controllers/managers  (orchestrate  a  flow),  and  strategies/factories  (pluggable  behaviour  and  creation).  This
separation  demonstrates  SRP  and  makes  the  design  easy  to  navigate  and  extend.  Even  in  a  single-file
machine-coding answer, grouping classes by these roles signals mature structure.

-  ParkingService,  PricingService),  repositories/DAOs

(data  access,

if  persistence

is

Q15. [Medium]  What is the difference between an entity, a value object, and a DTO?
MODEL ANSWER
An  entity  has  a  distinct  identity  that  persists  over  time  (a  User  with  an  id  -  two  users  with  the  same  name  are  still
different). A value object is defined entirely by its attributes and has no identity (a Money amount or an Address - two
with equal fields are interchangeable, and they're typically immutable). A DTO (Data Transfer Object) is a plain data
carrier used to move data between layers/over the network, with no behaviour. Distinguishing these shows you think
about modelling, not just classes.

LLD + System Design  |  SDE Fresher Question Bank

Page 6

2. SOLID & Design Patterns Applied to LLD

LLD rounds reward applying SOLID and patterns to real design decisions - not reciting definitions (those are in the OOP
volume). The key skill is recognising which pattern a requirement calls for, and resisting the urge to force one where it
doesn't fit.

Q16. [Medium]  How do the SOLID principles show up concretely in an LLD problem?
n Asked at Flipkart, Atlassian
MODEL ANSWER
Take a parking lot: SRP - separate ParkingService (allocation), PricingService (fees), and Ticket (data) instead of one
mega-class.  OCP  -  add  a  new  vehicle  type  or  pricing  rule  by  adding  a  class,  not  editing  existing  logic.  LSP  -  any
Vehicle  subtype  works  wherever  Vehicle  is  expected.  ISP  -  small  focused  interfaces  (a  PaymentProcessor  needn't
implement  parking  methods).  DIP  -  ParkingService  depends  on  a  SpotAllocationStrategy  interface,  not  a  concrete
strategy.

Naming the principle as you make each design choice is what separates a strong candidate from someone who just
writes classes.

Q17. [Medium]  Which design patterns appear most often in LLD interviews, and for what?
MODEL ANSWER
Strategy  -  swappable  algorithms  (parking  allocation,  pricing,  payment,  sorting).  Factory  -  creating  objects  by  type
(vehicle/shape/notification factory). Observer - notifications/events (notify subscribers, update views). State - lifecycle
behaviour (vending machine, ATM, order status). Singleton - a single manager/registry (use sparingly). Decorator -
stackable  add-ons  (pizza  toppings,  coffee).  Chain  of  Responsibility  -  sequential  handlers  (logger,  approval  flow).
Knowing the trigger for each ('whenever I see swappable behaviour -> Strategy') is more useful than memorising all
23 GoF patterns.

Q18. [Medium]  When would you reach for the Strategy pattern in a design?
MODEL ANSWER
Whenever  a  behaviour  has  multiple  interchangeable  implementations  that  you  want  to  select  at  runtime  or  extend
later - the tell is 'there are several ways to do X.' Examples: a parking lot's spot-allocation (nearest, random, by size),
a pricing engine (hourly, flat, surge), a payment method (card, UPI, wallet), or a ride-matching algorithm. You define a
strategy interface and inject the chosen implementation, which satisfies Open/Closed (add a new strategy class, don't
touch the context) and replaces if/else-on-type chains.

Q19. [Medium]  When would you use the Factory pattern in a design?
MODEL ANSWER
When object creation depends on some input/type and you want to centralise it so clients don't hard-code concrete
classes. The tell is 'create the right kind of object based on a type/parameter.' Examples: a VehicleFactory creating
Car/Bike/Truck  from  a  type,  a  NotificationFactory  creating  Email/SMS/Push  senders,  or  a  ShapeFactory.  It  keeps
creation  logic  in  one  place  (so  adding  a  type  changes  only  the  factory)  and  decouples  callers  from  concrete
constructors - supporting DIP and OCP.

Q20. [Medium]  When would you use the Observer pattern in a design?
MODEL ANSWER
When  one  object's  state  change  must  notify  many  others,  and  you  want  them  loosely  coupled  -  the  tell  is  'when  X
happens, several things should react.' Examples: a notification system (an event notifies all subscribed channels), an
order  system  (order-placed  notifies  inventory,  email,  analytics),  or  a  stock  ticker  updating  multiple  displays.  The
subject  holds  a  list  of  observers  and  calls  their  update()  on  change,  without  knowing  their  concrete  types  -  so  you
add/remove reactors freely. It underlies event-driven and pub-sub designs.

Q21. [Medium]  When would you use the State pattern in a design?
MODEL ANSWER
When an object behaves differently depending on an internal state and transitions through a lifecycle - the tell is 'it
acts  differently  in  each  phase,  and  the  phases  change.'  Examples:  a  vending  machine  (NoCoin  ->  HasCoin  ->
Dispensing),  an  ATM,  an  order  (Placed  ->  Shipped  ->  Delivered  ->  Cancelled),  or  a  document  (Draft  ->  Review  ->
Published). Each state is a class encapsulating its behaviour and valid transitions, replacing a tangle of if/else on a
status field and making invalid transitions easy to forbid.

LLD + System Design  |  SDE Fresher Question Bank

Page 7

Q22. [Medium]  When would you use the Decorator pattern in a design?
MODEL ANSWER
When you need to add optional, stackable features to objects in arbitrary combinations without a class explosion - the
tell is 'base thing plus any mix of add-ons.' Examples: a pizza with toppings, a coffee with milk/sugar, a notification
with extra formatting, or a text stream wrapped with buffering/encryption. Each decorator wraps the object and adds
behaviour while keeping the same interface, so 'CheesePizza wrapped in ExtraToppings' composes at runtime - far
better than a subclass for every combination.

Q23. [Medium]  When is Singleton appropriate in LLD, and what's the caution?
MODEL ANSWER
Appropriate when exactly one instance must coordinate shared state or a shared resource - a configuration registry, a
logging  service,  a  connection/thread  pool,  or  an  in-memory  store  for  a  coding  problem.  The  caution:  Singletons
introduce global state, hidden dependencies, and testing difficulty, so use them sparingly and make them thread-safe
(enum  singleton  or  holder  idiom).  In  larger  designs,  dependency  injection  (one  instance  managed  and  injected)  is
preferred over the Singleton pattern - mention this to show design maturity.

Q24. [Medium]  How do you avoid over-using design patterns in a design?
MODEL ANSWER
Apply  patterns  only  when  a  real,  recurring  problem  justifies  them  -  follow  KISS  and  YAGNI.  Signs  you're
over-engineering:  introducing  a  Factory  for  a  single,  never-changing  type;  an  interface  with  exactly  one
implementation and no prospect of more; or layering abstractions for hypothetical future needs. Start with the simplest
design  that  meets  the  requirements,  and  introduce  a  pattern  when  the  requirement  actually  demands  flexibility  (a
second strategy appears, a type-switch grows). Interviewers penalise both messy code and needless pattern soup.

Q25. [Medium]  The interviewer says 'now also support electric vehicles / a new payment method.' How
does a good design handle it?
n Asked at Flipkart, Uber - the extensibility test
MODEL ANSWER
A good design answers 'I just add a new class' - no edits to existing, tested code (Open/Closed). If VehicleType is an
enum and behaviour is polymorphic, you add an ElectricVehicle subtype (or enum constant) and, if needed, a strategy
for its handling. If PaymentMethod is an interface, you add a WalletPayment class implementing it and register it - the
checkout flow is untouched.

If your earlier design used a giant switch on type, this question exposes it (you'd have to edit the switch everywhere).
That's  exactly  why  interviewers  ask  it  -  to  see  whether  you  designed  for  extension  via  polymorphism/strategy  or
hard-coded the types.

Q26. [Easy]  What's the Builder pattern's role in LLD problems?
MODEL ANSWER
Builder shines when an object has many fields, especially optional ones, or requires controlled multi-step construction
- it avoids telescoping constructors and makes creation readable. In LLD, reach for it for things like building a complex
Pizza  order,  a  configuration  object,  an  HTTP  request,  or  any  entity  assembled  from  many  parts.  The  fluent  'new
X.Builder().a(..).b(..).build()' is self-documenting and lets you validate in build() and produce immutable objects.

Q27. [Medium]  How would you use Chain of Responsibility in a design (e.g. a logger or approval flow)?
MODEL ANSWER
Chain of Responsibility fits when a request should pass through a sequence of handlers, each deciding to handle it or
pass  it  on.  For  a  logger:  DEBUG,  INFO,  and  ERROR  handlers  chained,  each  logging  if  the  level  matches  and
forwarding otherwise. For an approval flow: an expense passes Manager -> Director -> VP, each approving up to
their limit or escalating. For middleware: auth -> validation -> handler. The sender doesn't know which handler acts,
and you can add/reorder handlers without touching it - flexible and decoupled.

LLD + System Design  |  SDE Fresher Question Bank

Page 8

Q28. [Medium]  How do you make business rules or policies pluggable in a design?
MODEL ANSWER
Encapsulate  each  rule/policy  behind  an  interface  and  select  or  compose  them  at  runtime  -  essentially  the  Strategy
pattern  applied  to  rules.  For  example  a  discount  engine  with  a  DiscountPolicy  interface  and  implementations
(PercentageDiscount, BuyOneGetOne, SeasonalDiscount), or a rate limiter with a pluggable RateLimitStrategy. You
can even chain or prioritise rules. This keeps the core logic stable while rules evolve - new rule = new class - and
makes rules independently testable. It's a very common need in pricing, fraud, and validation designs.

Q29. [Medium]  When would the Composite pattern be the right choice in a design?
MODEL ANSWER
When the domain is a part-whole hierarchy and you want to treat leaves and containers uniformly - the tell is 'a thing
that can contain more of the same thing.' Examples: a file system (File and Folder, where Folder contains both), a UI
component  tree,  an  organisation  chart,  or  a  nested  menu.  Both  leaf  and  composite  implement  a  common  interface
(e.g. getSize()), and a composite delegates recursively to its children - so client code handles the whole tree without
special-casing leaves vs branches.

LLD + System Design  |  SDE Fresher Question Bank

Page 9

3. Classic LLD Problems - Part 1

The most-asked machine-coding problems. For each, lead with entities and relationships, then the pattern that fits, then
the core methods. Parking Lot and LRU Cache are the two you must be able to design fluently.

Q30. [Hard]  Design a Parking Lot.
n Asked at Flipkart, Amazon, Uber - the #1 LLD problem
MODEL ANSWER
Clarify: multiple floors, multiple spot sizes, different vehicle types, ticketing, and fee calculation. Identify entities and
relationships:

ParkingLot ---has--&gt; Floor[] ---has--&gt; ParkingSpot[]
Vehicle (abstract) &lt;- Car, Bike, Truck   (enum VehicleType)
ParkingSpot { id, SpotType, isFree, Vehicle }
Ticket { id, Vehicle, spot, entryTime }
ParkingLot { park(Vehicle):Ticket, unpark(Ticket):fee }

Key  design  choices:  use  a  Strategy  for  spot  allocation  (nearest/by-size)  so  it's  pluggable;  a  Strategy/Factory  for
pricing; an enum for VehicleType/SpotType (no magic values); and make park()/unpark() thread-safe since spots are
shared. Code the core flow: find a free compatible spot, assign it, issue a Ticket, and on exit compute the fee and free
the spot. Mention extensions (EV charging spots, monthly passes) to show Open/Closed thinking.

Q31. [Medium]  In the parking lot, how do you allocate spots flexibly?
MODEL ANSWER
Use  the  Strategy  pattern:  define  a  SpotAllocationStrategy  interface  with  findSpot(vehicle,  floors),  and  provide
implementations like NearestFirstStrategy, BestFitBySizeStrategy, or RandomStrategy. The ParkingService depends
on the interface and is given a concrete strategy (dependency injection), so you can switch allocation policy without
touching  the  service  -  and  add  a  new  policy  by  adding  a  class.  This  is  the  textbook  'pluggable  algorithm'  use  of
Strategy, and it directly demonstrates Open/Closed and DIP.

Q32. [Medium]  How do you handle fee calculation in the parking lot design?
MODEL ANSWER
Encapsulate  it  behind  a  PricingStrategy  (or  FeeCalculator)  interface  so  different  schemes  -  hourly,  flat  daily,
per-vehicle-type,  surge/peak  -  are  interchangeable  and  extensible.  The  strategy  takes  the  ticket  (entry  time,
vehicle/spot  type)  and  computes  the  fee  on  exit.  Keep  rates  in  configuration/enums  rather  than  hard-coded.  This
separates  pricing  from  allocation  (SRP),  and  lets  you  add  a  'weekend  pricing'  rule  by  adding  a  strategy  -  again
Open/Closed in action.

Q33. [Hard]  Design an LRU Cache.
n Asked at Amazon, Microsoft, Google - asked as LLD and DSA
MODEL ANSWER
Requirements: get(key) and put(key,value) both in O(1), with a fixed capacity that evicts the least recently used item
when full. The trick is combining two data structures:

HashMap&lt;key, Node&gt;            // O(1) lookup of a node
Doubly Linked List            // O(1) move-to-front + remove-tail
  head &lt;-&gt; [MRU] &lt;-&gt; ... &lt;-&gt; [LRU] &lt;-&gt; tail

get(k):  if present, move node to front, return value
put(k,v): upsert node at front; if over capacity, remove tail node + its map entry

Every access moves the node to the front (most-recently-used); eviction removes the tail (least-recently-used). The
HashMap  gives  O(1)  location  of  any  node,  and  the  doubly  linked  list  gives  O(1)  removal  and  insertion.  (In  Java,
LinkedHashMap with accessOrder does this out of the box - worth mentioning as the library answer.)

Q34. [Hard]  Why does the LRU Cache specifically need a HashMap plus a doubly linked list?
MODEL ANSWER
Because you need both O(1) lookup and O(1) reordering. A HashMap alone gives O(1) get/put but has no notion of
recency  order,  so  finding  the  least-recently-used  item  would  be  O(n).  A  linked  list  alone  tracks  order  but  finding  a
specific key is O(n).

Combining  them:  the  HashMap  maps  key  ->  node  so  you  locate  any  node  in  O(1);  the  doubly  linked  list  lets  you
unlink that node and move it to the front in O(1) (you need doubly linked so you have the previous pointer to splice it

LLD + System Design  |  SDE Fresher Question Bank

Page 10

out without traversal). Together every operation is O(1). It's the canonical example of using two structures to get the
best of both.

Q35. [Hard]  Design a Vending Machine.
n Asked at Amazon, Adobe - classic State pattern problem
MODEL ANSWER
This  is  the  textbook  State  pattern  problem.  The  machine  behaves  differently  depending  on  its  current  state,  and
actions trigger transitions:

interface State { insertCoin(); selectProduct(); dispense(); }
States: IdleState -&gt; HasMoneyState -&gt; DispensingState -&gt; (back to Idle)
VendingMachine { State current; Inventory; balance; setState(s) }

Each  state  class  implements  the  actions  and  decides  the  next  state  (e.g.  inserting  a  coin  in  IdleState  moves  to
HasMoneyState; selecting a product with enough balance moves to DispensingState). Invalid actions (dispense while
Idle)  are  handled  per  state.  This  replaces  a  giant  if/else  on  a  status  flag,  makes  transitions  explicit,  and  is  easy  to
extend with new states (e.g. OutOfStock). Also handle inventory and change/refund.

Q36. [Medium]  Design Tic-Tac-Toe.
MODEL ANSWER
Entities:  Board  (a  grid  of  Cells),  Player  (with  a  Symbol/Piece  X  or  O),  Game  (orchestrates  turns  and  checks  for  a
result).  Core  methods:  Game.move(player,  row,  col)  validates  the  cell  is  empty  and  in-bounds,  places  the  symbol,
then checks for a win (row, column, or diagonal full of one symbol) or a draw (board full).

Design  notes:  use  an  enum  for  Symbol;  keep  win-checking  efficient  by  tracking  row/column/diagonal  counts  per
symbol (so a move is O(1) to check, not O(n^2)); separate Board (state) from Game (rules) for SRP. It generalises to
an  n  x  n  board,  and  you  can  make  the  win-check  or  board  size  configurable  -  which  interviewers  often  ask  as  an
extension.

Q37. [Medium]  Design Snake and Ladder.
MODEL ANSWER
Entities: Board (with Snakes and Ladders as jump mappings from->to), Dice (roll 1-6), Player (with current position),
and Game (manages the player queue and turns). Core loop: a player rolls the dice, advances, and if they land on a
snake head or ladder bottom, their position jumps to the snake tail or ladder top; first to the final cell wins.

Design  notes:  model  Snake  and  Ladder  uniformly  as  a  Jump  (start,  end)  so  the  board  just  has  a  map  of
cell->destination (a snake is a backward jump, a ladder forward) - cleaner than two separate structures. Use a queue
for turn order, an enum/strategy if you want configurable dice, and validate that a move doesn't overshoot the final
cell. It tests clean state management more than algorithms.

Q38. [Medium]  Design a logging framework.
MODEL ANSWER
Use  the  Chain  of  Responsibility  for  log  levels  and  the  Strategy  for  output  destinations.  A  LogProcessor  chain
(DEBUG -> INFO -> ERROR) decides which handler logs a message based on its level; each appender (Strategy)
writes to a destination (console, file, network).

abstract LogProcessor { next; log(level, msg) }
Levels via chain: Debug -&gt; Info -&gt; Error
Appender (Strategy): ConsoleAppender, FileAppender, ...
Logger (Singleton) -&gt; formats + dispatches

Use  enums  for  levels,  make  the  Logger  a  (thread-safe)  singleton  or  injected,  and  keep  formatting  separate  from
writing (SRP). It's extensible - add a new level or a new appender without touching existing code - which is exactly the
point.

Q39. [Medium]  Design an ATM.
MODEL ANSWER
Another  State  pattern  problem.  States:  NoCardState  ->  HasCardState  ->  AuthenticatedState  (PIN  verified)  ->
TransactionState -> back to NoCard. The ATM delegates actions (insertCard, enterPin, selectTransaction, withdraw)
to the current state, which enforces valid operations and transitions.

Other  components:  a  CashDispenser  (with  a  strategy/greedy  logic  to  dispense  notes),  an  Account/BankService  for
balance and withdrawal, and Transaction objects (withdraw, balance inquiry) - possibly via a small command/factory.

LLD + System Design  |  SDE Fresher Question Bank

Page 11

Handle edge cases: wrong PIN (limit attempts), insufficient funds, insufficient cash in the machine. The state machine
keeps the flow correct and is the core thing being tested.

Q40. [Medium]  Design a Chess game (board and pieces).
MODEL ANSWER
Entities:  Board  (8x8  of  Cells),  Piece  (abstract,  with  subclasses  King,  Queen,  Rook,  Bishop,  Knight,  Pawn),  Player,
Move,  and  Game.  The  key  polymorphism:  each  Piece  subclass  implements  canMove(board,  from,  to)  encoding  its
own movement rules - so the Game doesn't switch on piece type (Open/Closed).

Core flow: Game.makeMove validates it's the player's turn, the piece's movement is legal, the path is clear, and the
move doesn't leave the king in check; then it executes (handling captures, castling, en passant as extensions). Use
enums for Color/PieceType, separate move-validation from board state, and discuss check/checkmate detection. The
per-piece polymorphic movement is the design highlight.

Q41. [Medium]  Design a pizza ordering system with customizable toppings.
MODEL ANSWER
This  is  the  Decorator  pattern's  showcase.  A  base  Pizza  (with  cost()  and  description())  is  wrapped  by  topping
decorators that each add to the cost and description:

Pizza p = new ExtraCheese(new Mushroom(new MargheritaBase()));
p.cost();          // base + mushroom + cheese
p.description();   // "Margherita, mushroom, extra cheese"

toppings  composes  without  a  class  per  combination.  Contrast  with  subclassing

Each decorator implements the Pizza interface and holds a Pizza, delegating and adding its bit - so any combination
(CheesePizza,
of
CheeseMushroomPizza, ...) which explodes combinatorially. Add an OrderService and PaymentStrategy to complete
the flow.

Q42. [Hard]  Design an LFU (Least Frequently Used) cache.
MODEL ANSWER
LFU  evicts  the  item  used  least  often  (vs  LRU's  least  recently).  To  get  O(1)  operations  you  keep:  a  HashMap
key->node  (value  +  frequency);  a  HashMap  freq->doubly  linked  list  of  nodes  at  that  frequency  (preserving  recency
within a frequency to break ties LRU-style); and a minFrequency pointer.

On  access,  move  the  node  from  its  current  frequency  list  to  the  freq+1  list  and  update  minFrequency.  On  eviction,
remove the LRU node from the minFrequency list. It's notably trickier than LRU because you track frequency buckets -
a good follow-up that tests whether you really understand the LRU structure or just memorised it.

Q43. [Medium]  Design a text editor with undo/redo.
MODEL ANSWER
Combine the Command and Memento patterns. Each editing action (insert, delete, replace) is a Command object
that  knows  how  to  execute()  and  undo()  itself,  pushed  onto  an  undo  stack;  redo  uses  a  second  stack.
Alternatively/additionally, Memento snapshots the document state before a change so you can restore it.

interface Command { void execute(); void undo(); }
Deque&lt;Command&gt; undoStack, redoStack;
undo(): cmd = undoStack.pop(); cmd.undo(); redoStack.push(cmd)

Command is more memory-efficient (store the operation, not the whole document); Memento is simpler but heavier
(store snapshots). Mention the trade-off and you've shown real design judgement.

Q44. [Hard]  Design an in-memory key-value store (mini Redis).
n Relevant to your Mini-Redis project
MODEL ANSWER
Core:  a  thread-safe  map  (ConcurrentHashMap)  behind  a  clean  interface  -  get(k),  set(k,v),  del(k),  exists(k).  Add
TTL/expiry (store expiry timestamps; lazily expire on access and/or a background sweeper), support multiple value
types (string, list, hash) via a Value abstraction, and an eviction policy (LRU) when memory-bounded.

Design notes: separate the command parsing/dispatch (a CommandFactory mapping a command name to a handler -
Strategy/Command)  from  the  storage  engine  (SRP);  make  operations  atomic  for  concurrency;  and  consider
persistence (an append-only log) as an extension. This maps directly to your Mini-Redis build, so you can speak to it
from real experience - a strong differentiator.

LLD + System Design  |  SDE Fresher Question Bank

Page 12

Q45. [Easy]  Design a deck of cards and a card-dealing system.
MODEL ANSWER
Entities: Card (Rank + Suit, both enums - 52 unique cards), Deck (a list of Cards with shuffle() and dealCard()), and
optionally Hand/Player and a Game. Build the deck by iterating over all Suit x Rank combinations. shuffle() uses the
Fisher-Yates algorithm; dealCard() pops from the deck and handles the empty-deck case.

Design  notes:  enums  make  Card  type-safe  and  naturally  orderable;  keep  Deck  (state)  separate  from  any  specific
Game's rules (SRP) so the same Deck works for poker, blackjack, etc. It's an easy warm-up that still lets you show
clean modelling with enums and separation of concerns.

LLD + System Design  |  SDE Fresher Question Bank

Page 13

4. Classic LLD Problems - Part 2

The second tier of machine-coding favourites - several involve concurrency (BookMyShow), non-trivial algorithms
(Splitwise settlement, rate-limiter buckets), or the Observer pattern (notifications). Lead with entities, call out the tricky
part, then code the core.

Q46. [Hard]  Design Splitwise (group expense sharing).
n Asked at Amazon, Splitwise-style problems
MODEL ANSWER
Entities:  User,  Group,  Expense  (amount,  paidBy,  split  details),  and  a  SplitStrategy  (EqualSplit,  ExactSplit,
PercentageSplit) - a clean Strategy use. A central BalanceSheet/ExpenseManager tracks who owes whom (a map of
user -> map of user -> amount).

Expense { amount, User paidBy, List&lt;Split&gt; splits }
SplitStrategy: Equal | Exact | Percentage
BalanceManager { Map&lt;User, Map&lt;User, Double&gt;&gt; balances; addExpense(e) }

When an expense is added, the strategy computes each person's share and the manager updates pairwise balances.
Use the Observer pattern to notify members. The interesting extension is debt simplification (below). Highlight SRP
(split logic vs balance tracking) and the Strategy for split types.

Q47. [Hard]  In Splitwise, how do you simplify/settle debts to minimise transactions?
MODEL ANSWER
Compute  each  person's  net  balance  (total  paid  minus  total  owed).  People  with  positive  net  are  owed  money
(creditors),  negative  net  owe  money  (debtors);  the  sum  is  zero.  Then  greedily  settle:  repeatedly  match  the  largest
debtor with the largest creditor, transferring min(|debt|, credit), and remove whoever hits zero - using a max-heap on
each side.

This  minimises  the  number  of  transactions  (you  don't  need  everyone  to  pay  everyone).  Note  finding  the  absolute
minimum  number  of  settlements  is  NP-hard,  so  the  greedy  heap  approach  is  the  practical,  expected  answer  -
mentioning that nuance is a strong signal.

Q48. [Hard]  Design BookMyShow (movie ticket booking).
n Asked at Amazon, BookMyShow, Paytm
MODEL ANSWER
Entities: Movie, Theatre, Screen, Show (movie + screen + time), Seat, Booking, User, and Payment. Relationships: a
Theatre has Screens, a Screen runs Shows, a Show has Seats.

Theatre -&gt; Screen[] -&gt; Show[] -&gt; Seat[] (status: AVAILABLE/LOCKED/BOOKED)
Booking { user, show, List&lt;Seat&gt;, status, payment }
BookingService.book(user, show, seats)  // must be atomic

The core challenge is concurrency on seat booking (next question). Core flow: search shows -> select seats -> lock
them temporarily -> pay -> confirm (or release on timeout/failure). Use a PaymentStrategy and a temporary seat-lock
with expiry. Discuss SRP across search/booking/payment services.

Q49. [Hard]  How do you prevent two users from booking the same seat in BookMyShow?
n Asked at Amazon, Uber - the concurrency question
MODEL ANSWER
The 'check seat free, then mark booked' must be atomic, or both users pass the check and double-book. Options: (1)
a  per-seat/per-show  lock  (synchronized  /  ReentrantLock)  around  the  select-and-mark  step;  (2)  a  temporary  seat
lock with a short expiry (seat goes LOCKED for ~5 min while the user pays, auto-released if they don't) - this is what
real systems do; (3) at the database level, a transaction with a row lock or a unique constraint on (show, seat) so the
second insert fails; or (4) optimistic locking via a version column.

The  key  is  recognising  the  race  condition  and  making  the  critical  section  atomic.  The  temporary-lock-with-timeout
approach also handles abandoned bookings gracefully - mention it for bonus points.

LLD + System Design  |  SDE Fresher Question Bank

Page 14

Q50. [Hard]  Design an elevator system.
n Asked at Uber, Google
MODEL ANSWER
Entities: Elevator (current floor, direction, state, request queue), ElevatorController (manages multiple elevators and
dispatches  requests),  Request  (source  floor  +  direction  for  external  calls,  or  target  floor  for  internal),  and  a
SchedulingStrategy.

Elevator { floor, Direction(UP/DOWN/IDLE), State, TreeSet&lt;Integer&gt; stops }
ElevatorController { List&lt;Elevator&gt;; SchedulingStrategy; handleRequest(req) }

The  controller  picks  which  elevator  serves  a  request  (the  scheduling  strategy  -  next  question)  and  each  elevator
services its sorted stop set in its current direction (the elevator/SCAN algorithm, like disk scheduling). Use enums for
Direction/State  and  a  Strategy  for  scheduling  so  the  policy  is  swappable.  Discuss  multi-elevator  coordination  and
edge cases (request while moving).

Q51. [Medium]  How do you schedule which elevator serves a request, and how does one elevator order
its stops?
MODEL ANSWER
Across elevators (the controller): pick the best elevator for a request via a strategy - e.g. the nearest idle one, or one
already moving in the right direction that will pass the floor (minimise wait). Within an elevator: it serves stops using
the elevator/LOOK algorithm - keep going in the current direction servicing all stops, then reverse (exactly like SCAN
disk  scheduling).  Keeping  stops  in  a  sorted  set  makes  'next  stop  in  this  direction'  easy.  Making  the  scheduling  a
pluggable Strategy lets you swap policies (nearest-car, fixed-sectoring) - the main design lever.

Q52. [Hard]  Design a rate limiter.
n Asked at Amazon, Uber, Razorpay - and your project!
MODEL ANSWER
Goal:  allow  at  most  N  requests  per  time  window  per  client/key,  returning  allow/block.  Core  design:  a  RateLimiter
interface with isAllowed(clientId), and a pluggable Strategy for the algorithm, backed by a store (in-memory map, or
Redis for distributed).

interface RateLimiter { boolean allow(String key); }
Strategies: TokenBucket | LeakyBucket | FixedWindow | SlidingWindowLog
store: key -&gt; counter/timestamps (Redis for distributed, atomic via Lua)

For  a  distributed  limiter,  the  counter/bucket  lives  in  Redis  and  updates  must  be  atomic  (Lua  script)  so  concurrent
requests across servers are counted correctly. This maps directly to your Distributed Rate Limiter project - you can
discuss real implementation details (token bucket in Redis, p99 latency) which is a major differentiator.

Q53. [Hard]  Compare the rate-limiting algorithms (token bucket, leaky bucket, fixed/sliding window).
MODEL ANSWER
Fixed window - count requests per fixed interval (per minute); simple but allows bursts at window edges (2x at the
boundary). Sliding window log - store request timestamps and count those within the trailing window; accurate but
memory-heavy. Sliding window counter - a weighted blend of current and previous window; a good approximation,
low  memory.  Token  bucket  -  tokens  refill  at  a  fixed  rate  up  to  a  capacity,  each  request  consumes  one;  allows
controlled bursts (up to bucket size) - the most popular. Leaky bucket - requests queue and drain at a constant rate;
smooths output but no bursts.

Token bucket is the usual default (bursty-friendly, simple); pick sliding-window for strict accuracy. Knowing the burst
behaviour of each is the key differentiator.

Q54. [Medium]  Design a notification system (email/SMS/push).
MODEL ANSWER
Use a Factory to create the right channel sender and the Observer/strategy to dispatch. A NotificationService takes a
notification  and  sends  it  via  one  or  more  channels,  each  implementing  a  common  Notifier  interface  (EmailNotifier,
SMSNotifier, PushNotifier).

interface Notifier { void send(User u, Message m); }
NotifierFactory.create(channel) -&gt; Email | SMS | Push
NotificationService { send(user, msg, channels[]) }

Add  user  preferences  (which  channels  they  want),  templating,  retries  with  backoff,  and  a  queue  for  async/bulk
sending  (decouple  producing  from  sending).  The  Strategy/Factory  for  channels  makes  adding  a  new  channel

LLD + System Design  |  SDE Fresher Question Bank

Page 15

(WhatsApp)  trivial  -  Open/Closed.  For  scale,  mention  pushing  notifications  onto  a  message  queue  consumed  by
workers.

Q55. [Hard]  Design a cab booking system (Uber-lite).
n Asked at Uber, Ola
MODEL ANSWER
Entities:  Rider,  Driver  (with  location  +  availability),  Trip,  Location,  and  core  services  for  matching,  pricing,  and  trip
management. Core flow: rider requests a ride -> MatchingService finds nearby available drivers -> a driver accepts ->
Trip is created and tracked -> fare computed on completion -> payment.

Key  design  points:  driver  matching  by  proximity  (a  geospatial  index  /  quadtree  /  geohash  to  find  nearby  drivers
efficiently - the interesting algorithmic part); a PricingStrategy for fare and surge; Trip as a state machine (Requested
->  Assigned  ->  Started  ->  Completed/Cancelled);  and  the  Observer  pattern  for  live  location  updates.  Discuss
concurrency (two riders for one driver) and the matching being the hard part at scale.

Q56. [Medium]  Design a library management system.
MODEL ANSWER
Entities: Book and BookItem (a Book is the title/metadata, a BookItem is a physical copy with a barcode - an important
distinction), Member, Librarian, and a Catalog for search. Services handle lending: checkout (with limits on books per
member and a due date), return, reservation/hold, and fine calculation for late returns.

Design notes: separating Book (abstract title) from BookItem (copy) lets you have multiple copies and search by title -
a  modelling  subtlety
item  status
for.  Use  a  FineStrategy
(AVAILABLE/LOANED/RESERVED),  and  keep  search/lending/membership  as  separate  services  (SRP).  Discuss
notifications for due dates (Observer).

fees,  enums

interviewers

look

late

for

for

Q57. [Medium]  Design an online shopping cart and checkout.
MODEL ANSWER
Entities: Product, CartItem (product + quantity), Cart, Order, User, and services for pricing, discounts, inventory, and
payment. The Cart holds items and computes a subtotal; checkout converts it to an Order, applies discounts, reserves
inventory, and processes payment.

Design  highlights:  a  DiscountStrategy  (percentage,  BOGO,  coupon)  -  pluggable  rules  -  and  a  PaymentStrategy
(card/UPI/wallet);  inventory  checks  with  concurrency  (don't  oversell  -  atomic  decrement);  and  Order  as  a  state
machine  (Created  ->  Paid  ->  Shipped  ->  Delivered).  Keep  pricing/discount/payment  in  separate  services.  The
extensibility of discounts and payments is the typical follow-up.

Q58. [Medium]  Design Stack Overflow (a Q&A system).
MODEL ANSWER
Entities: User (with reputation), Question, Answer, Comment, Vote, Tag, and Badge. Relationships: a Question has
many  Answers  and  Comments  and  Tags;  users  cast  Votes  (up/down)  on  questions  and  answers,  which  adjust
reputation.

Design notes: model Question and Answer as sharing a Votable/Commentable abstraction (both can be voted and
commented - DRY); use the Observer pattern for notifications (answer posted -> notify the asker); a reputation service
that  reacts  to  vote  events;  and  tag-based  search.  Discuss  how  reputation  rules  and  badges  are  pluggable
(Strategy/rules). It tests clean modelling of a content-and-voting domain.

Q59. [Medium]  Design a meeting-room / calendar scheduler.
MODEL ANSWER
Entities: User, Room, Meeting (interval + attendees + room), and a scheduling service. The core problem is interval
management: booking a room requires that the requested time interval doesn't overlap any existing booking for that
room  -  so  you  check  for  interval  conflicts  (and  find  free  slots)  efficiently,  e.g.  with  a  sorted  structure  (TreeMap)  of
intervals per room or an interval tree.

Add  attendee  availability  checks  (no  double-booking  a  person),  notifications/invites  (Observer),  and  recurring
meetings as an extension. The interval-overlap logic and concurrency (two people booking the same room at once -
make the check-and-book atomic) are the parts interviewers probe.

LLD + System Design  |  SDE Fresher Question Bank

Page 16

Q60. [Medium]  Design a generic publish-subscribe (pub-sub) system.
MODEL ANSWER
Entities: Topic, Publisher, Subscriber, and a Broker/MessageBus. Publishers send messages to a Topic; subscribers
register  interest  in  topics;  the  broker  delivers  each  message  to  all  subscribers  of  that  topic  -  a  decoupled,
many-to-many version of Observer.

Broker { Map&lt;Topic, List&lt;Subscriber&gt;&gt;; publish(topic, msg); subscribe(topic, sub) }

Design notes: decouple publishers from subscribers entirely (they only know the broker/topic), support async delivery
via  a  queue  per  subscriber,  and  consider  delivery  guarantees  (at-least-once  with  acks),  offset/cursor  tracking  per
subscriber (like Kafka), and thread-safety on the subscriber lists. It's essentially a mini message queue and a great
bridge from LLD into system design.

LLD + System Design  |  SDE Fresher Question Bank

Page 17

5. System Design Fundamentals

For freshers, HLD usually appears as a 'scaling discussion' rather than a full design round - but knowing the approach,
the functional/non-functional split, estimation, and the core vocabulary (availability, consistency, CAP) lets you shine
when it comes up. Your distributed-systems projects are a big asset here.

Q61. [Medium]  How do you approach a system design interview?
n Asked at Amazon, Microsoft
MODEL ANSWER
Follow  a  structured  flow  so  you  don't  ramble:  (1)  Clarify  requirements  -  functional  (features)  and  non-functional
(scale,  latency,  availability,  consistency).  (2)  Estimate  -  back-of-envelope  QPS,  storage,  bandwidth  to  size  the
system. (3) Define the API and data model. (4) Sketch a high-level architecture - clients, load balancer, services,
databases, cache, queues. (5) Deep-dive into the components that matter (the bottleneck or the interesting part). (6)
Address bottlenecks and trade-offs - scaling, caching, sharding, single points of failure.

Drive  the  conversation,  state  assumptions,  and  discuss  trade-offs  out  loud  -  there's  no  single  right  answer;  they're
assessing structured reasoning.

Q62. [Medium]  What's the difference between functional and non-functional requirements?
MODEL ANSWER
Functional requirements are what the system does - the features and behaviours (a URL shortener must create a
short URL and redirect it; a chat app must send and deliver messages). Non-functional requirements are how well it
does them - qualities like scalability, latency, availability, consistency, durability, and security (handle 10M users, p99
latency under 200ms, 99.99% availability). In an interview, nail the functional scope first (so you build the right thing),
then the non-functional targets (which drive the architecture choices).

Q63. [Medium]  What is back-of-the-envelope estimation and why do it?
MODEL ANSWER
It's  quickly  approximating  the  scale  of  a  system  -  QPS  (queries/sec),  storage,  bandwidth,  memory  -  using  round
numbers, to justify architectural decisions. For example: 100M daily active users x 10 requests = 1B requests/day ~
12K  QPS  average  (and  maybe  5x  at  peak  ~  60K  QPS);  if  each  record  is  1KB  and  you  store  100M/day,  that's
~100GB/day -> need sharding.

It matters because the numbers drive the design: a few QPS needs a single server; 100K QPS needs load balancing,
caching, and sharding. Useful anchors: 1 day ~ 86,400s (~10^5), and know the latency numbers (memory ns, SSD
us, disk/network ms).

Q64. [Medium]  What are the 'latency numbers every engineer should know'?
MODEL ANSWER
Rough orders of magnitude (Jeff Dean's numbers): an L1 cache reference is ~1 ns, main memory ~100 ns, a read
from  SSD  ~100  us  (microseconds),  a  disk  seek  ~10  ms,  and  a  round  trip  within  a  datacenter  ~0.5  ms  while  a
cross-continent round trip is ~100-150 ms. The takeaways: memory is ~100,000x faster than disk; network calls dwarf
local computation; and sending data across the world is expensive. These justify caching (avoid disk/network), CDNs
(reduce  distance),  and  minimising  round  trips  -  so  quoting  the  relative  magnitudes  shows  you  reason  about
performance.

Q65. [Medium]  What is scalability, and what are vertical and horizontal scaling?
n Commonly asked
MODEL ANSWER
Scalability is a system's ability to handle increased load by adding resources. Vertical scaling (scale up) - make one
machine more powerful (more CPU/RAM); simple, no app changes, but has a hard ceiling, gets expensive, and is a
single point of failure. Horizontal scaling (scale out) - add more machines and distribute load; effectively unlimited
and  fault-tolerant,  but  requires  handling  distribution  (load  balancing,  stateless  services,  data  partitioning)  and  the
complexity that brings. Large systems scale horizontally; the design work is making that possible.

LLD + System Design  |  SDE Fresher Question Bank

Page 18

Q66. [Medium]  What is availability, and what do 'nines' mean?
MODEL ANSWER
Availability is the percentage of time a system is operational and able to serve requests. It's expressed in 'nines': 99%
('two  nines')  allows  ~3.65  days  of  downtime  per  year;  99.9%  ('three  nines')  ~8.76  hours;  99.99%  ('four  nines')  ~52
minutes;  99.999%  ('five  nines')  ~5  minutes.  Each  extra  nine  is  dramatically  harder  and  costlier  to  achieve  (needs
redundancy, failover, no single points of failure). You design to the availability target the use case actually needs - a
bank vs a blog differ.

Q67. [Medium]  What's the difference between availability, reliability, and durability?
MODEL ANSWER
Availability - the system is up and responding when you need it (uptime %). Reliability - it performs correctly and
consistently  over  time  without  failures  (a  system  can  be  available  but  returning  wrong  results  =  available  but  not
reliable).  Durability  -  once  data  is  committed,  it's  not  lost  even  through  failures  (achieved  via  replication,  backups;
e.g. S3's '11 nines' of durability). So: availability = reachable, reliability = behaves correctly, durability = data survives.
Distinguishing them precisely is a strong signal.

Q68. [Medium]  What is the CAP theorem, and how does it guide system design?
n Asked at Amazon, Microsoft
MODEL ANSWER
CAP  says  a  distributed  system  can  guarantee  at  most  two  of  Consistency  (every  read  sees  the  latest  write),
Availability  (every  request  gets  a  response),  and  Partition  tolerance  (works  despite  network  splits).  Since  network
partitions are inevitable in distributed systems, P is mandatory - so the real choice during a partition is C vs A.

It guides design by forcing the question 'when nodes can't talk, do I reject requests to stay consistent (CP - banking,
inventory) or keep serving possibly-stale data to stay available (AP - social feeds, likes)?' You pick per feature based
on whether stale data or unavailability is worse.

Q69. [Medium]  What's the difference between strong and eventual consistency?
MODEL ANSWER
Strong  consistency  -  after  a  write  completes,  every  subsequent  read  (from  any  node)  returns  that  latest  value;
simpler to reason about but costs latency and availability (must coordinate replicas). Eventual consistency - reads
may  return  stale  data  for  a  while,  but  all  replicas  converge  to  the  latest  value  if  no  new  writes  happen;  higher
availability and lower latency, at the cost of temporary staleness.

Choose  per  use  case:  strong  for  bank  balances,  inventory,  anything  where  stale  =  wrong;  eventual  for  likes,  view
counts,  feeds,  where  brief  staleness  is  harmless.  Many  systems  mix  them  (strong  for  critical  paths,  eventual
elsewhere).

Q70. [Medium]  What are SLA, SLO, and SLI?
MODEL ANSWER
SLI (Service Level Indicator) - a measured metric of service quality (e.g. request latency, error rate, availability %).
SLO (Service Level Objective) - the internal target for an SLI (e.g. 'p99 latency < 200ms', '99.9% availability'). SLA
(Service Level Agreement) - a formal contract with customers promising a level of service, with penalties if breached
(usually  a  looser  bound  than  the  SLO).  So  SLI  =  what  you  measure,  SLO  =  your  goal,  SLA  =  your  promise  to
customers (and the consequences).

Q71. [Easy]  What is a single point of failure (SPOF), and how do you eliminate it?
MODEL ANSWER
A SPOF is any component whose failure brings down the whole system - a single database, a single load balancer, a
single  server.  You  eliminate  it  with  redundancy:  replicate  components  and  add  failover  so  a  backup  takes  over
(multiple  app  servers  behind  a  load  balancer,  a  replicated/failover  database,  redundant  load  balancers,
multi-availability-zone  deployment).  The  goal  is  no  single  component  whose  loss  is  fatal  -  identifying  and  removing
SPOFs is a core part of designing for high availability.

LLD + System Design  |  SDE Fresher Question Bank

Page 19

Q72. [Medium]  Why are stateless services important for scaling?
n Asked at backend roles
MODEL ANSWER
A  stateless  service  keeps  no  client/session  state  locally  between  requests  -  any  request  can  be  handled  by  any
instance. This makes horizontal scaling trivial: a load balancer can route requests to any server, you can add/remove
servers  freely,  and  a  server  crash  loses  no  session  data.  State  (sessions,  data)  is  pushed  to  shared  stores  (a
database, Redis, or a token like a JWT carried by the client).

Stateful services, by contrast, tie a client to a specific server (sticky sessions), which complicates load balancing and
failover. So a key scaling move is making the app tier stateless and externalising state.

Q73. [Medium]  What are the typical components of a large-scale web application architecture?
MODEL ANSWER
From  client  to  data:  a  DNS  +  CDN  (serve  static  content  near  users);  a  load  balancer  distributing  across  stateless
application servers; a cache (Redis/Memcached) in front of the database; a primary database with read replicas
(and  sharding  at  scale);  a  message  queue  for  async  work  with  worker  services;  blob/object  storage  (S3)  for
files/media; and supporting infra for monitoring/logging. The request flow: client -> DNS/CDN -> LB -> app server ->
cache/DB,  with  heavy/slow  work  offloaded  to  queues  and  workers.  Knowing  this  skeleton  lets  you  design  most
systems by composing these blocks.

Q74. [Hard]  Walk through estimating QPS and storage for a system like a URL shortener.
MODEL ANSWER
Assume 100M new URLs/month. Writes: 100M / (30 x 86400s) ~ 40 writes/sec. Reads usually dominate - assume a
100:1 read:write ratio -> ~4000 reads/sec (so it's a read-heavy system -> caching matters). Storage: if each record
(short code, long URL, metadata) is ~500 bytes, 100M/month x 500B = 50 GB/month, ~600 GB/year, ~3 TB over 5
years -> fits on a sharded DB, no exotic storage needed.

These rough numbers justify the design: low write QPS (a single DB can handle writes), high read QPS (add a cache
+ read replicas), modest storage (sharding for growth). The method - assume usage, compute QPS and storage, then
let the numbers drive the architecture - is what's graded.

Q75. [Easy]  What's the difference between latency and throughput, and can you optimise both?
MODEL ANSWER
Latency is how long one request takes; throughput is how many requests you handle per unit time. They're related but
distinct  -  and  sometimes  in  tension:  batching  requests  raises  throughput  but  increases  individual  latency,  while
handling  each  request  immediately  lowers  latency  but  may  cap  throughput.  You  can  improve  both  up  to  a  point
(caching cuts latency and frees capacity for throughput; more servers raise throughput), but past a point you optimise
for the one the use case cares about - interactive systems prioritise latency, batch/analytics prioritise throughput.

Q76. [Medium]  What trade-offs should you explicitly discuss in any system design?
MODEL ANSWER
Consistency  vs  availability  (CAP)  and  strong  vs  eventual  consistency;  latency  vs  throughput;  normalization  (write
integrity)  vs  denormalization  (read  speed);  SQL  vs  NoSQL;  synchronous  vs  asynchronous  processing;  cost  vs
performance vs complexity; and read-heavy vs write-heavy optimisations. There's rarely a 'correct' answer - the signal
you  give  is  recognising  that  each  choice  has  a  cost,  stating  the  trade-off,  and  justifying  your  pick  for  the  given
requirements. Interviewers explicitly look for 'I'd choose X because... but the downside is Y' reasoning.

Q77. [Medium]  What does it mean for a system to be 'highly available', and how do you achieve it?
MODEL ANSWER
High  availability  means  minimal  downtime  -  the  system  keeps  serving  even  when  components  fail.  You  achieve  it
through  redundancy  (no  single  points  of  failure  -  multiple  app  servers,  replicated  databases,  redundant  load
balancers), failover (automatically promote a standby when the primary dies), multi-AZ/region deployment (survive
a  datacenter  outage),  health  checks  (route  away  from  unhealthy  nodes),  and  graceful  degradation  (serve  a
reduced experience rather than failing entirely). It often trades off against consistency (CAP) and cost.

LLD + System Design  |  SDE Fresher Question Bank

Page 20

6. Scaling, Load Balancing & Caching

The workhorse techniques of system design - load balancers, caching strategies, CDNs, and consistent hashing. These
come up constantly because almost every 'how would you scale this' answer uses them. Know the caching write
strategies and consistent hashing cold.

Q78. [Medium]  What is a load balancer, and where does it sit in the architecture?
n Commonly asked
MODEL ANSWER
A load balancer sits between clients and a pool of backend servers, distributing incoming requests across them so no
single server is overwhelmed. It improves scalability (add servers behind it), availability (route around dead servers via
health checks), and can also do TLS termination and request routing. You often have load balancers at multiple tiers -
in front of the web/app servers, and sometimes between app servers and a service tier. It's the entry point that makes
horizontal scaling transparent to clients.

Q79. [Medium]  What's the difference between L4 and L7 load balancing?
MODEL ANSWER
L4 (transport layer) load balancing routes based on IP and TCP/UDP port without looking at the request content - it's
very  fast  and  protocol-agnostic,  but  can't  make  content-based  decisions.  L7  (application  layer)  load  balancing
inspects the actual HTTP request (URL path, headers, cookies) and can route intelligently - send /api to one pool and
/images to another, do sticky sessions, or A/B routing - at the cost of more processing per request. L4 for raw speed,
L7 for smart, content-aware routing (most web setups use L7).

Q80. [Medium]  What are the common load-balancing algorithms?
MODEL ANSWER
Round robin - rotate through servers evenly; simple, good when servers are equal. Weighted round robin - give
more  powerful  servers  a  larger  share.  Least  connections  -  send  to  the  server  with  the  fewest  active  connections;
good for long-lived/uneven requests. Least response time - factor in latency. IP hash - hash the client IP to a server,
giving  session  stickiness  without  shared  state.  The  choice  depends  on  whether  requests  are  uniform,  whether  you
need stickiness, and whether servers are homogeneous.

Q81. [Easy]  How does a load balancer know to stop sending traffic to a failed server?
MODEL ANSWER
Through  health  checks  -  the  load  balancer  periodically  probes  each  backend  (e.g.  an  HTTP  GET  to  a  /health
endpoint, or a TCP connection check) on an interval. If a server fails a configured number of consecutive checks, the
LB marks it unhealthy and removes it from rotation, so no user traffic is routed to it until it passes checks again. This is
the  core  mechanism  that  keeps  a  single  dead  server  from  causing  user-facing  errors,  and  a  key  part  of  high
availability.

Q82. [Easy]  What is caching and why is it so impactful?
MODEL ANSWER
Caching  stores  copies  of  frequently  accessed  or  expensive-to-compute  data  in  a  fast  layer  (memory)  so  future
requests are served quickly without redoing the work or hitting the slow backend. It's impactful because memory is
~100,000x faster than disk and avoids expensive DB queries and network calls - so it dramatically cuts latency and
offloads the database, often being the single biggest performance lever for read-heavy systems. The catch is keeping
cached data fresh (invalidation).

Q83. [Hard]  What are the cache write strategies (cache-aside, write-through, write-back, write-around)?
n Asked at Amazon, Microsoft
MODEL ANSWER
Cache-aside (lazy loading) - the app checks the cache, and on a miss reads the DB and populates the cache; the
most  common,  but  the  first  request  is  slow  and  data  can  go  stale.  Write-through  -  writes  go  to  cache  and  DB
together, so the cache is always fresh, at the cost of write latency. Write-back (write-behind) - write to cache and
flush to DB asynchronously later; very fast writes but risk data loss if the cache fails before flushing. Write-around -
write  directly  to  the  DB,  bypassing  the  cache  (cache  fills  on  later  reads);  good  when  written  data  isn't  immediately
re-read.

LLD + System Design  |  SDE Fresher Question Bank

Page 21

Pick  based  on  the  read/write  pattern  and  how  much  staleness/loss  you  can  tolerate.  Cache-aside  +  TTL  is  the
common default.

Q84. [Medium]  What are the common cache eviction policies?
MODEL ANSWER
LRU  (Least  Recently  Used)  -  evict  what  hasn't  been  accessed  for  the  longest  time;  the  most  common,  exploits
temporal locality. LFU (Least Frequently Used) - evict the least-frequently-accessed item; better when popularity is
stable. FIFO - evict the oldest inserted, regardless of use; simple but ignores access patterns. TTL (Time To Live) -
expire items after a set duration, useful to bound staleness. Real caches (Redis) offer several and often combine them
(e.g. LRU with TTL). LRU is the safe default answer.

Q85. [Medium]  Where can you cache in a typical web stack?
MODEL ANSWER
At many layers: the browser (HTTP cache for static assets), a CDN (edge caching of static/cacheable content near
users), a reverse proxy (e.g. nginx caching responses), the application layer (in-memory or a distributed cache like
Redis/Memcached  for  query  results  and  sessions),  and  the  database  (its  own  buffer/page  cache,  and  materialized
views).  Caching  as  close  to  the  user  as  possible  saves  the  most  -  so  static  content  goes  to  CDN/browser,  while
dynamic data is cached at the app layer. Layered caching is the norm.

Q86. [Hard]  Why is cache invalidation considered hard?
n Asked at Amazon - 'one of the two hard problems'
MODEL ANSWER
Because keeping cached data consistent with the source of truth, across many cache copies, is genuinely tricky. If the
underlying  data  changes,  every  cached  copy  is  now  stale  -  and  deciding  when  and  how  to  update  or  evict  them
without serving wrong data, while not killing performance, is hard. Approaches each have downsides: TTL (simple, but
stale  within  the  window),  write-through  (consistent,  but  slower  writes),  explicit  invalidation  on  writes  (precise,  but
complex and easy to miss a path). In distributed caches you also race between update and invalidation. Hence the
famous joke: 'there are only two hard things in CS - cache invalidation and naming things.'

Q87. [Medium]  What is a CDN and how does it work?
MODEL ANSWER
A CDN (Content Delivery Network) is a globally distributed network of edge servers that cache content close to users.
When  a  user  requests  content,  they're  routed  (via  anycast/GeoDNS)  to  the  nearest  edge,  which  serves  cached
content  directly  or  fetches  it  from  the  origin  on  a  miss  and  caches  it.  Benefits:  lower  latency  (shorter  distance),
reduced origin load and bandwidth cost, and DDoS absorption. It's used for static assets (images, CSS, JS, video)
and  increasingly  for  cacheable  dynamic  content.  A  near-default  for  any  system  serving  a  geographically  spread
audience.

Q88. [Medium]  What is Redis, and what are its common uses in system design?
n Relevant to your projects
MODEL ANSWER
Redis is an in-memory data store (key-value, with rich data structures - strings, lists, sets, sorted sets, hashes) prized
for  sub-millisecond  latency.  Common  uses:  a  cache  in  front  of  a  database,  session  storage  for  stateless  app
servers,  rate  limiting  (atomic  counters,  Lua  scripts),  leaderboards  (sorted  sets),  a  lightweight  message  broker  /
pub-sub,  and  distributed  locks.  Its  single-threaded  model  and  atomic  commands  make  it  great  for  counters  and
coordination. Given your Mini-Redis and rate-limiter projects, you can speak to its internals and real usage - a strong
advantage.

Q89. [Hard]  What is consistent hashing, and why is it used for caching and sharding?
n Asked at Amazon, Microsoft - the depth question
MODEL ANSWER
Consistent hashing maps both servers and keys onto a conceptual ring (hash space); each key is owned by the next
server clockwise. Its key property: when you add or remove a server, only a small fraction of keys (those between
the changed node and its neighbour) need to move - unlike naive 'hash(key) % N', where changing N remaps almost
every key.

That's  why  it's  used  for  distributed  caches  and  sharded  databases:  it  minimises  data  movement  and  cache  misses
when the cluster scales up/down or a node fails. Virtual nodes (each physical server placed at many ring positions)

LLD + System Design  |  SDE Fresher Question Bank

Page 22

are added to balance load evenly and avoid hotspots. It's a favourite for testing whether you understand distributed
data partitioning.

Q90. [Medium]  How do you scale a database that's becoming a bottleneck?
n Asked at Amazon, Microsoft
MODEL ANSWER
Work through the cheap-to-expensive options: (1) add indexes and optimise queries; (2) add a cache (Redis) in front
to absorb reads; (3) add read replicas and route reads to them (most apps are read-heavy) while writes go to the
primary; (4) vertical scale the primary as a stopgap; (5) when writes/storage outgrow one machine, shard (partition
data  across  servers  by  a  shard  key);  and  (6)  consider  denormalization  or  a  different  datastore  for  specific  access
patterns.  The  order  matters  -  you  exhaust  caching  and  replicas  before  sharding,  since  sharding  adds  the  most
complexity (cross-shard queries, rebalancing).

Q91. [Easy]  What is database connection pooling and why does it matter at scale?
MODEL ANSWER
A  connection  pool  maintains  a  set  of  reusable  open  DB  connections  that  the  app  borrows  and  returns,  instead  of
opening a new connection per request (which is expensive - handshake, auth, setup). At scale it's essential: it cuts
per-request  latency,  and  crucially  it  bounds  the  number  of  concurrent  connections  so  a  traffic  spike  doesn't  open
thousands of connections and overwhelm the database (databases handle a limited number well). It's a key reliability
tool - without it, the DB often falls over before the app does.

Q92. [Medium]  Why is it generally harder to scale writes than reads?
MODEL ANSWER
Reads  scale  easily  by  adding  read  replicas  and  caches  -  any  up-to-date  copy  can  serve  a  read.  Writes  are  harder
because every write must be applied consistently everywhere: in a single-primary setup all writes funnel through one
node (a bottleneck) and replication adds lag; going multi-primary or sharded introduces write conflicts and the loss of
easy  cross-node  transactions.  So  the  usual  path  is:  cache  +  replicas  for  reads  first,  and  only  shard  when  write
throughput itself is the ceiling - accepting the complexity that brings. 'Reads scale with copies, writes scale only with
partitioning' is the crisp summary.

Q93. [Medium]  How does autoscaling work?
MODEL ANSWER
Autoscaling automatically adjusts the number of running instances based on load. It monitors metrics (CPU, memory,
request rate, queue depth) and, against defined thresholds/policies, adds instances when load rises (scale out) and
removes  them  when  it  falls  (scale  in)  -  so  you  pay  for  capacity  you  need  and  absorb  spikes  without  manual
intervention. It requires stateless services (so any new instance can take traffic) and works with a load balancer that
picks up new instances. Note it reacts with some lag, so sudden spikes may need pre-warming or buffering (queues).

Q94. [Medium]  What is the hot key / hotspot problem, and how do you mitigate it?
MODEL ANSWER
A  hotspot  occurs  when  a  disproportionate  share  of  traffic  targets  a  single  key,  shard,  or  server  -  e.g.  a  celebrity's
profile, a viral item, or a poorly chosen shard key that concentrates load. That node gets overwhelmed while others
idle,  defeating  horizontal  scaling.  Mitigations:  cache  the  hot  key  aggressively  (and  replicate  the  cache  entry);  add
randomness  to  the  key  (sharding  a  hot  counter  into  N  sub-counters  that  you  sum);  choose  a  higher-cardinality,
evenly-distributed shard key; or use consistent hashing with virtual nodes to spread load. Recognising hotspots is
a key part of choosing a good partitioning scheme.

Q95. [Medium]  What is a sticky session, and when do you need it?
MODEL ANSWER
A  sticky  session  (session  affinity)  makes  a  load  balancer  route  a  given  client  to  the  same  backend  server  for  the
duration of their session - usually by a cookie or IP hash. You need it when the server holds session state locally (in
memory),  so  the  client  must  keep  hitting  the  server  that  has  their  data.  The  downside  is  it  undermines  even  load
distribution  and  failover  (if  that  server  dies,  the  session  is  lost).  The  better  modern  approach  is  to  make  services
stateless and store session data in a shared store (Redis) - then any server can handle any request and you don't
need stickiness at all.

LLD + System Design  |  SDE Fresher Question Bank

Page 23

Q96. [Medium]  What's the risk with a write-back (write-behind) cache?
MODEL ANSWER
A  write-back  cache  acknowledges  a  write  as  soon  as  it  hits  the  cache  and  flushes  to  the  durable  database
asynchronously  later.  That  makes  writes  very  fast,  but  the  risk  is  data  loss:  if  the  cache  node  crashes  before  the
pending writes are flushed, those writes are gone, and the database is left inconsistent/stale. So it trades durability for
speed.  You  use  it  only  where  occasional  loss  is  acceptable,  or  you  add  safeguards  (replication  of  the  cache,  a
persistent write log) to reduce the risk. Contrast with write-through, which is durable but slower.

LLD + System Design  |  SDE Fresher Question Bank

Page 24

7. Databases & Storage at Scale

Choosing the right datastore and scaling it is central to system design. Know the SQL-vs-NoSQL decision,
sharding/replication, and which specialised store fits which workload (blob, search, time-series, graph). Some of this
overlaps the DBMS volume - here it's framed for architecture decisions.

Q97. [Medium]  How do you choose between SQL and NoSQL for a system?
n Asked at Amazon, Microsoft
MODEL ANSWER
Choose  SQL  when  you  have  structured,  related  data,  need  ACID  transactions  and  strong  consistency,  and  run
complex queries/joins - banking, orders, anything where correctness is paramount. Choose NoSQL when you need
massive horizontal scale, very high write throughput, flexible/evolving schemas, or specific access patterns - feeds,
activity logs, caching, real-time analytics, huge key-value workloads.

Also  match  the  NoSQL  type  to  the  data:  key-value  for  simple  fast  lookups,  document  for  semi-structured  records,
wide-column for huge write-heavy/time-series, graph for highly connected data. The honest answer is 'it depends on
consistency needs, data shape, and scale' - and many systems use both (polyglot persistence).

Q98. [Medium]  What are the types of NoSQL databases and their use cases?
MODEL ANSWER
Key-value  (Redis,  DynamoDB)  -  simplest,  fastest;  caching,  sessions,  leaderboards.  Document  (MongoDB)  -
JSON-like  docs,  flexible  schema;  catalogs,  user  profiles,  content.  Wide-column  (Cassandra,  HBase)  -  rows  with
dynamic columns, excellent write throughput; time-series, logging, IoT, messaging. Graph (Neo4j) - nodes and edges;
social networks, recommendations, fraud detection. Pick the family whose data model and access pattern matches
your workload - that's the reasoning interviewers want.

Q99. [Hard]  What is sharding, and what are the common strategies?
n Asked at Amazon, Microsoft
MODEL ANSWER
Sharding splits a dataset's rows across multiple database servers so each holds a subset - enabling horizontal scale
beyond one machine. Strategies: range-based (by value ranges/date - good for range queries but prone to hotspots),
hash-based  (hash  the  shard  key  -  even  distribution  but  range  queries  scatter),  directory-based  (a  lookup  service
maps keys to shards - flexible but an extra component), and consistent hashing (minimises data movement when
shards change).

The hard parts: choosing a good shard key (high cardinality, even distribution, co-locates data queried together), and
the loss of easy cross-shard joins/transactions. You shard only when caching and read replicas no longer suffice.

Q100. [Medium]  What is replication, and what are the replication models?
MODEL ANSWER
Replication  keeps  copies  of  data  on  multiple  nodes
for  availability  and  read  scaling.  Leader-follower
(primary-replica)  -  one  node  takes  writes  and  propagates  to  read-only  followers;  simple,  but  the  leader  is  a  write
bottleneck  and  there's  replication  lag.  Multi-leader  -  multiple  nodes  accept  writes  (e.g.  multi-region);  better  write
availability but needs conflict resolution. Leaderless (Dynamo-style) - any node takes reads/writes, using quorums (R
+ W > N) for consistency. The trade-off across all: stronger consistency vs availability and latency.

Q101. [Medium]  What's the difference between replication and sharding?
MODEL ANSWER
Replication copies the same data to multiple nodes - it improves read scalability, availability, and durability, but every
node holds the full dataset (so it doesn't help with data size or write throughput). Sharding splits different data across
nodes - each shard holds a subset, which scales storage and write throughput, but a single shard failure loses that
slice unless also replicated. They're complementary and used together: shard for size/write-scale, and replicate each
shard for availability.

LLD + System Design  |  SDE Fresher Question Bank

Page 25

Q102. [Medium]  What's the difference between horizontal and vertical partitioning?
MODEL ANSWER
Horizontal partitioning splits a table by rows (each partition has all columns but a subset of rows - e.g. by user ID or
date);  sharding  is  horizontal  partitioning  across  servers.  Vertical  partitioning  splits  by  columns  -  putting  hot,
frequently-accessed  columns  in  one  table  and  rarely-used  or  large  columns  (a  big  blob)  in  another,  joined  by  key.
Horizontal handles row volume and write distribution; vertical helps when a table is very wide and only some columns
are hot.

Q103. [Medium]  When and why would you denormalize data in a system design?
MODEL ANSWER
When reads vastly outnumber writes and join cost is a bottleneck - you trade some write complexity and redundancy
for fast reads by pre-joining or duplicating data so a single query/lookup returns everything needed. Examples: storing
an order's total instead of summing line items each time, embedding a user's recent activity in their feed document, or
NoSQL stores that model data per access pattern. The cost is keeping duplicates in sync (via app logic, events, or
triggers),  risking  temporary  inconsistency.  It's  a  deliberate  read-performance-for-write-complexity  trade,  common  in
feeds and analytics.

Q104. [Medium]  How would you implement a high-volume counter (like likes or views)?
MODEL ANSWER
A single row with 'UPDATE ... SET count = count + 1' becomes a write hotspot and lock contention at scale. Better
approaches: use an in-memory atomic counter in Redis (INCR) and periodically flush to the DB; shard the counter
into N sub-counters (write to a random one, sum on read) to spread write load; or aggregate asynchronously - push
increment  events  to  a  queue  and  batch-update.  For  approximate  counts  at  huge  scale,  probabilistic  structures
(HyperLogLog) work. The key insight is avoiding a single contended row by distributing or buffering the writes.

Q105. [Medium]  What is object/blob storage (like S3), and when do you use it?
MODEL ANSWER
Object storage stores files ('objects') - images, videos, documents, backups - as blobs with metadata, accessed via an
API/URL,  with  effectively  unlimited  scale  and  very  high  durability  (S3  advertises  11  nines).  You  use  it  for  large,
unstructured  files  rather  than  cramming  them  into  a  database  (databases  are  bad  at  large  blobs).  Typical  pattern:
store the file in S3 and keep just its URL/key in your database, and serve it via a CDN. It's the default for any system
handling user uploads or media.

Q106. [Medium]  How do you store and serve large media (images/video) in a system?
MODEL ANSWER
Store the binary in object storage (S3), not the database, and keep only metadata + the object key in the DB. Serve it
through  a  CDN  so  it's  cached  near  users.  For  uploads,  use  pre-signed  URLs  so  clients  upload  directly  to  object
storage  (bypassing  your  servers).  For  video  specifically,  transcode  into  multiple  resolutions/bitrates  and  serve  via
adaptive streaming (HLS/DASH) from the CDN. This keeps your app servers and DB out of the heavy data path - the
database holds pointers, object storage holds bytes, the CDN does delivery.

Q107. [Medium]  When would you add a search index like Elasticsearch?
MODEL ANSWER
When you need full-text search, fuzzy matching, relevance ranking, or complex filtering/aggregation that a relational
DB  does  slowly  (a  B-tree  index  can't  efficiently  do  'find  all  docs  containing  these  words  ranked  by  relevance').
Elasticsearch builds an inverted index (term -> documents) for fast text search. The pattern: keep the source of truth
in your primary DB and sync searchable data into Elasticsearch (via events/CDC), querying ES for search and the DB
for transactional reads. Used for product search, log search, autocomplete.

Q108. [Hard]  What is quorum-based consistency (R + W > N) in a distributed database?
MODEL ANSWER
In a leaderless system with N replicas, you require a write to be acknowledged by W replicas and a read to query R
replicas. If R + W > N, the read and write sets are guaranteed to overlap on at least one replica, so a read always
sees the latest acknowledged write - giving strong consistency.

Tuning R and W trades consistency vs latency/availability: W=N (write to all) makes writes slow but reads fast (R=1);
W=1, R=1 is fast but eventually consistent (R+W not > N). A common balanced choice is R=W=(N/2)+1. This quorum

LLD + System Design  |  SDE Fresher Question Bank

Page 26

model (Dynamo/Cassandra) is how you dial the consistency-availability knob.

Q109. [Medium]  What is a Write-Ahead Log (WAL) and how does it provide durability?
MODEL ANSWER
A WAL is a sequential, append-only log to which a database writes a record of every change before applying it to the
actual data files. On a crash, the database replays the log to recover committed changes that hadn't yet been flushed,
and rolls back uncommitted ones - guaranteeing durability and atomicity. It's also faster than writing scattered data
pages on every commit (the log write is sequential), and it's the basis of replication (followers replay the leader's log).
Most databases (Postgres, MySQL/InnoDB) and your Mini-Redis-style AOF persistence use this idea.

Q110. [Hard]  What is a bloom filter and where is it used in systems?
n Asked at infra/systems roles
MODEL ANSWER
A bloom filter is a space-efficient probabilistic data structure that tests set membership: it can say 'definitely not in the
set'  or  'possibly  in  the  set'  (false  positives  possible,  false  negatives  never).  It  uses  a  bit  array  and  multiple  hash
functions, using far less memory than storing the actual elements.

Use it as a cheap pre-check to avoid expensive lookups: databases (Cassandra, LSM-tree stores) use bloom filters to
skip reading SST files that definitely don't contain a key; caches use them to avoid querying for keys that don't exist;
web  crawlers  use  them  to  check  'have  I  seen  this  URL.'  The  trade-off  (occasional  false  positive)  is  acceptable
because it only causes an unnecessary lookup, never a wrong answer.

Q111. [Medium]  What database would you choose for a leaderboard, and why?
MODEL ANSWER
Redis  sorted  sets  (ZSET)  are  the  classic  choice.  A  sorted  set  keeps  members  ordered  by  score,  with  O(log  n)
updates  and  O(log  n  +  k)  range  queries  -  so  'add/update  a  player's  score',  'get  top  10'  (ZREVRANGE),  and  'get  a
player's rank' (ZRANK) are all fast and built-in. A relational DB would need an ORDER BY + LIMIT on every read (and
ranking is expensive at scale). For a global, real-time leaderboard with frequent updates, Redis ZSET is purpose-built
- a great concrete answer that shows you match the data structure to the access pattern.

Q112. [Medium]  What's the difference between OLTP and OLAP databases in system design?
MODEL ANSWER
OLTP  (Online  Transaction  Processing)  databases  handle  the  operational  workload  -  many  small,  fast  reads/writes
with ACID (placing orders, updating profiles); they're row-oriented and normalized (Postgres, MySQL). OLAP (Online
Analytical  Processing)  databases  handle  analytics  -  complex  aggregations  over  huge  historical  datasets;  they're
column-oriented and often denormalized (Redshift, BigQuery, ClickHouse). In architecture you keep them separate:
OLTP  serves  the  app,  and  data  is  piped  (ETL/CDC)  into  an  OLAP  warehouse  for  reporting  -  so  heavy  analytics
queries don't slow down the operational database.

Q113. [Medium]  How do you perform a database schema migration on a live system without downtime?
MODEL ANSWER
Use backward-compatible, incremental changes - the expand-contract pattern. To change a column: expand (add
the new column, deploy code that writes to both old and new), backfill existing rows in batches, switch reads to the
new column, then contract (stop using and finally drop the old column). Make each step independently deployable and
reversible.  Avoid  long-locking  operations  on  big  tables  (build  indexes  concurrently),  run  in  low-traffic  windows,  and
always keep a rollback path. The principle: old and new code must both work during the rollout, so you never need a
big-bang cutover.

Q114. [Easy]  When would you choose a graph database?
MODEL ANSWER
When relationships are first-class and you query them deeply - 'friends of friends', 'shortest path between two people',
recommendation  traversals,  or  fraud  rings.  Graph  databases  (Neo4j)  store  nodes  and  edges  and  traverse
relationships  in  near-constant  time  per  hop,  whereas  a  relational  DB  would  need  many  expensive  self-joins  for
multi-hop  queries.  So  choose  a  graph  DB  for  social  networks,  recommendation  engines,  knowledge  graphs,  and
network/dependency analysis - workloads where the connections matter more than the individual records.

LLD + System Design  |  SDE Fresher Question Bank

Page 27

Q115. [Medium]  What is Change Data Capture (CDC) and why is it useful?
MODEL ANSWER
CDC captures row-level changes (inserts/updates/deletes) from a database - typically by reading its transaction log
(WAL/binlog) - and streams them as events to other systems. It's useful for keeping derived systems in sync without
dual-writes:  updating  a  search  index  (Elasticsearch),  invalidating  caches,  feeding  a  data  warehouse,  or  driving
event-driven workflows - all reacting to DB changes reliably. It decouples the source DB from consumers and avoids
the consistency problems of writing to two systems in app code (it reads the authoritative log instead). Debezium is a
common CDC tool.

LLD + System Design  |  SDE Fresher Question Bank

Page 28

8. Messaging, Async Processing & Microservices

Asynchronous processing with queues, and the microservices vocabulary (API gateway, idempotency, circuit breaker,
saga) increasingly appear even in fresher discussions - especially if you mention distributed systems. These pair
naturally with your rate-limiter and Redis projects.

Q116. [Medium]  What is a message queue, and why use one?
n Asked at Amazon, backend roles
MODEL ANSWER
A message queue is an intermediary that lets services communicate asynchronously - a producer puts messages on
the queue and a consumer processes them later, without the two being online at the same time. Benefits: decoupling
(producer  and  consumer  evolve  independently),  buffering  (absorb  traffic  spikes  -  the  queue  holds  work  until
consumers  catch  up),  reliability  (messages  persist  until  processed,  with  retries),  and  load  leveling.  Classic  use:
offload  slow  work  (sending  emails,  image  processing,  notifications)  from  the  request  path  so  the  user  gets  a  fast
response while the work happens in the background.

Q117. [Medium]  What's the difference between Kafka, RabbitMQ, and SQS?
MODEL ANSWER
Kafka  -  a  distributed,  durable  log;  high-throughput  streaming,  messages  retained  and  replayable,  consumers  track
their  own  offset.  Great  for  event  streaming,  analytics  pipelines,  and  many  consumers  reading  the  same  stream.
RabbitMQ - a traditional message broker with flexible routing (exchanges/queues), good for complex routing and task
queues; messages typically removed once consumed. SQS - AWS's fully-managed, simple, infinitely-scalable queue;
minimal  ops,  at-least-once  delivery.  Rule  of  thumb:  Kafka  for  high-volume  streams/replay,  RabbitMQ  for  rich
routing/task queues, SQS for managed simplicity on AWS.

Q118. [Medium]  What's the difference between a point-to-point queue and publish-subscribe?
MODEL ANSWER
In  point-to-point  (work  queue),  each  message  is  consumed  by  exactly  one  consumer  -  used  to  distribute  tasks
among workers (a job is done once). In publish-subscribe, each message is delivered to all subscribers of a topic -
used to broadcast events so multiple independent systems react (an 'order placed' event going to inventory, email,
and  analytics).  So  point-to-point  splits  work;  pub-sub  fans  out  the  same  event.  Kafka  supports  both  via  consumer
groups (one consumer per group gets each message; multiple groups each get all messages).

Q119. [Medium]  What is asynchronous processing and when should you use it?
MODEL ANSWER
Asynchronous  processing  decouples  a  request  from  the  work  it  triggers:  instead  of  doing  everything  before
responding, you accept the request, enqueue the heavy work, respond immediately, and process it in the background
(with  workers).  Use  it  when  the  work  is  slow,  can  tolerate  slight  delay,  or  doesn't  need  to  block  the  user  -  sending
emails/notifications,  generating  reports,  processing  uploads,  video  transcoding,  or  fanning  out  a  social  post  to
followers.  It  improves  responsiveness  and  lets  you  absorb  spikes  (the  queue  buffers).  Keep  synchronous  only  the
work the user must wait for.

Q120. [Medium]  What is event-driven architecture?
MODEL ANSWER
Event-driven  architecture  is  a  style  where  services  communicate  by  producing  and  reacting  to  events  (facts  that
something  happened  -  'OrderPlaced')  rather  than  calling  each  other  directly.  Services  publish  events  to  a  broker;
interested  services  subscribe  and  react  independently.  Benefits:  loose  coupling  (the  producer  doesn't  know  who
consumes),  easy  extensibility  (add  a  new  consumer  without  touching  producers),  and  scalability/resilience.  The
trade-offs: eventual consistency, harder debugging/tracing (flows are implicit), and the need to handle out-of-order or
duplicate events (idempotency). It's the backbone of large decoupled systems.

LLD + System Design  |  SDE Fresher Question Bank

Page 29

Q121. [Medium]  Microservices vs monolith - what are the trade-offs?
n Asked at Amazon, Microsoft
MODEL ANSWER
A monolith is one deployable unit - simpler to develop, test, deploy, and debug early on, with easy in-process calls
and transactions; but it gets hard to scale selectively, slow to build/deploy as it grows, and a single bug can take it all
down.  Microservices  split  the  app  into  small,  independently  deployable  services  -  enabling  independent
scaling/deployment,  team  autonomy,  and  fault  isolation;  but  they  add  huge  operational  complexity  (network  calls,
distributed transactions, service discovery, monitoring, eventual consistency).

The pragmatic stance interviewers like: start with a (well-structured) monolith and extract microservices only when
scale, team size, or deployment friction justify the complexity. Microservices solve organisational/scale problems, not
small-project problems.

Q122. [Hard]  What are the main challenges of microservices?
MODEL ANSWER
Distributed-system complexity: network calls can fail/be slow (need retries, timeouts, circuit breakers); distributed
transactions are hard (no easy ACID across services - use sagas); data consistency becomes eventual; service
discovery  and  routing  are  needed;  observability  is  harder  (a  request  spans  many  services  -  need  distributed
tracing);  testing  integration  is  complex;  and  operational  overhead  multiplies  (many  deployments,  configs,
monitoring).  Plus  defining  the  right  service  boundaries  is  genuinely  hard.  These  costs  are  why  you  shouldn't  adopt
microservices prematurely.

one.

Q123. [Medium]  What is an API gateway?
MODEL ANSWER
An API gateway is a single entry point that sits in front of a set of backend services and routes client requests to the
right
them:
authentication/authorization,  rate  limiting,  request  routing,  load  balancing,  SSL  termination,  request/response
transformation, caching, and logging/metrics. It also lets clients call one endpoint instead of knowing every service's
location  (and  can  aggregate  multiple  service  calls  into  one  response).  It's  a  near-standard  component  in  a
microservices architecture.

cross-cutting

reimplement

centralises

concerns

doesn't

service

each

so

It

Q124. [Medium]  What is service discovery?
MODEL ANSWER
Service  discovery  is  how  services  find  each  other's  network  locations  in  a  dynamic  environment  where  instances
come  and  go  (autoscaling,  failures,  deployments)  and  IPs  change.  Instead  of  hard-coding  addresses,  services
register themselves in a service registry (Consul, Eureka, etcd) and look up others by name. Client-side discovery:
the  client  queries  the  registry  and  picks  an  instance.  Server-side:  a  load  balancer/gateway  does  the  lookup.  It's
essential in microservices/containerised systems where you can't rely on fixed addresses.

Q125. [Medium]  What is idempotency, and why is it critical for retries?
n Asked at Amazon, backend roles
MODEL ANSWER
An operation is idempotent if performing it multiple times has the same effect as doing it once. It's critical because in
distributed systems requests get retried (timeouts, network blips, at-least-once delivery), and without idempotency a
retry could double-charge a payment or create duplicate orders.

You achieve it with an idempotency key: the client sends a unique key with the request, and the server records it - if
it sees the same key again, it returns the original result instead of reprocessing. Naturally idempotent operations (set a
value,  PUT,  delete)  are  safe;  'create'  and  'increment'  need  explicit  idempotency  keys.  Always  design  retryable
operations to be idempotent.

LLD + System Design  |  SDE Fresher Question Bank

Page 30

Q126. [Medium]  What is a circuit breaker?
MODEL ANSWER
A circuit breaker prevents a failing downstream service from cascading failures upstream. Like an electrical breaker, it
monitors  calls  to  a  dependency:  when  failures  exceed  a  threshold  it  'trips'  (opens),  and  subsequent  calls  fail  fast
(return  an  error/fallback  immediately)  instead  of  piling  up  waiting  on  the  dead  service.  After  a  cooldown  it  goes
'half-open' to test if the service recovered, then closes if calls succeed. This protects resources (threads, connections)
from  being  exhausted  by  a  struggling  dependency  and  gives  it  room  to  recover  -  a  key  resilience  pattern
(Hystrix/Resilience4j).

Q127. [Hard]  What is the Saga pattern for distributed transactions?
MODEL ANSWER
A saga manages a transaction that spans multiple microservices (each with its own database) without a distributed
lock/2PC. It breaks the transaction into a sequence of local transactions, each publishing an event that triggers the
next;  if  a  step  fails,  the  saga  runs  compensating  transactions  to  undo  the  prior  steps  (e.g.  refund  a  payment,
release inventory).

Two  styles:  choreography  (services  react  to  each  other's  events,  no  central  coordinator)  and  orchestration  (a
central orchestrator directs each step). It gives you eventual consistency across services where ACID isn't possible -
the standard answer to 'how do you do a transaction across microservices.'

Q128. [Hard]  What delivery guarantees do message queues offer (at-most-once, at-least-once,
exactly-once)?
MODEL ANSWER
At-most-once  -  messages  may  be  lost  but  never  redelivered  (fire  and  forget);  lowest  overhead,  used  when
occasional  loss  is  fine.  At-least-once  -  messages  are  never  lost  but  may  be  redelivered  (the  common  default);
consumers must be idempotent to handle duplicates. Exactly-once - each message processed precisely once; the
hardest and often partly an illusion - achieved with deduplication/idempotency keys and transactional processing, not
magic.  In  practice  most  systems  use  at-least-once  delivery  plus  idempotent  consumers  to  get  effectively-once
behaviour.

Q129. [Medium]  What is back-pressure?
MODEL ANSWER
Back-pressure is a mechanism for a system to signal upstream that it's overwhelmed and to slow down the rate of
incoming  work,  rather  than  collapsing.  If  a  consumer  can't  keep  up  with  a  producer,  unbounded  buffering  leads  to
memory  exhaustion  -  so  the  consumer  pushes  back  (e.g.  bounded  queues  that  block/reject  when  full,  TCP  flow
control,  reactive  streams'  demand  signalling,  or  returning  429  Too  Many  Requests).  It  keeps  systems  stable  under
overload by matching intake to capacity instead of accepting work it can't process.

Q130. [Easy]  What is a dead-letter queue (DLQ)?
MODEL ANSWER
A dead-letter queue is a separate queue where messages that can't be processed successfully - after exhausting
retries, or that are malformed/poisonous - are sent aside instead of being lost or blocking the main queue forever. This
isolates  problematic  messages  so  the  main  pipeline  keeps  flowing,  and  lets  engineers  inspect,  debug,  and  replay
them later. It's a standard reliability feature of message systems (SQS, RabbitMQ, Kafka) and a sign you think about
failure handling.

Q131. [Hard]  How does Kafka achieve high throughput and scale (partitions, consumer groups)?
MODEL ANSWER
Each Kafka topic is split into partitions, which are append-only logs distributed across brokers - this is the unit of
parallelism and ordering (order is guaranteed within a partition, not across). Producers append (sequential disk writes
= fast), and messages are retained for a configured time and replayable.

Consumer groups: within a group, each partition is consumed by exactly one consumer, so you scale consumption
by adding consumers up to the partition count; multiple groups each get the full stream (pub-sub). Throughput comes
from sequential I/O, zero-copy transfer, batching, and horizontal partitioning. Partition count is the key scaling knob,
and the partition key controls ordering/distribution.

LLD + System Design  |  SDE Fresher Question Bank

Page 31

Q132. [Hard]  What is the dual-write problem, and how does the outbox pattern solve it?
MODEL ANSWER
The dual-write problem: when an operation must update the database and publish an event (or write to a second
system), doing both as separate steps risks inconsistency - if the app crashes between them, you get one without the
other (DB updated but event lost, or vice versa).

The outbox pattern fixes it: write the event into an 'outbox' table in the same database transaction as the business
change, so both commit atomically. A separate process (or CDC reading the log) then reliably reads the outbox and
publishes the events to the broker. This guarantees the event is published if and only if the DB change committed -
achieving consistency without distributed transactions.

Q133. [Medium]  What's the difference between orchestration and choreography in microservices?
MODEL ANSWER
Orchestration  -  a  central  coordinator  (orchestrator)  explicitly  directs  each  step  of  a  workflow,  telling  each  service
what to do and when; the logic is centralised and easy to follow/monitor, but the orchestrator is a dependency and
potential bottleneck. Choreography - there's no central brain; each service reacts to events and emits its own, so the
workflow emerges from their interactions; it's more decoupled and scalable, but the overall flow is implicit and harder
to trace/debug. Sagas can be built either way - orchestration for complex flows you want to control, choreography for
simple, loosely-coupled ones.

LLD + System Design  |  SDE Fresher Question Bank

Page 32

9. API Design & Networking in System Design

How clients talk to your system - REST/gRPC choices, pagination, versioning, rate limiting, idempotency, and real-time
options. API design comes up in both system design and 'design the API for X' sub-questions; clean, evolvable APIs are
a strong signal.

Q134. [Medium]  What makes a good REST API design?
n Asked at backend roles
MODEL ANSWER
Resource-oriented URLs with nouns, not verbs (/users/42/orders, not /getUserOrders); use HTTP methods correctly
(GET read, POST create, PUT/PATCH update, DELETE remove) and return proper status codes; keep it stateless
(each  request  self-contained);  use  consistent  naming  and  plurals;  support  filtering,  sorting,  and  pagination  on
collections; version the API; return clear, structured error responses; and make write operations idempotent where
possible.  Good  APIs  are  predictable,  consistent,  and  evolvable  -  so  clients  can  rely  on  them  and  you  can  change
internals freely.

Q135. [Medium]  REST vs gRPC vs GraphQL - which would you choose for what?
MODEL ANSWER
REST  (HTTP/JSON)  -  simple,  universal,  cacheable;  best  for  public  APIs  and  straightforward  CRUD,  but  can
over-/under-fetch  and  need  multiple  round  trips.  gRPC  (HTTP/2,  Protobuf,  binary)  -  fast,  strongly-typed,  supports
streaming; ideal for internal service-to-service communication where performance matters, but not browser-friendly or
human-readable. GraphQL - clients request exactly the fields they need in one query; great for flexible front-ends with
varied data needs, but caching and complexity are harder. Rule of thumb: REST for public/simple, gRPC for internal
high-performance microservices, GraphQL for flexible client-driven data.

Q136. [Medium]  How do you implement pagination in an API?
n Commonly asked
MODEL ANSWER
Two  main  approaches.  Offset  pagination  (?page=3&limit=20  /  LIMIT  OFFSET)  -  simple  and  lets  you  jump  to  any
page,  but  slow  for  deep  pages  (the  DB  scans  and  discards  skipped  rows)  and  can  show  duplicates/skips  if  data
changes  between  pages.  Cursor  (keyset)  pagination  (?after=)  -  returns  items  after  a  stable  cursor  (WHERE  id  >
last_id ORDER BY id LIMIT 20); efficient at any depth (uses the index, no scanning) and stable under inserts, but you
can't jump to an arbitrary page. For large or real-time datasets (feeds), prefer cursor pagination.

Q137. [Medium]  How do you version an API?
MODEL ANSWER
Common strategies: URI versioning (/v1/users, /v2/users) - explicit and easy to see/route, the most common; header
versioning  (an  Accept  header  or  custom  version  header)  -  keeps  URLs  clean  but  less  visible;  and  query  param
(?version=2) - simple but mixes versioning with parameters. The goal is to evolve the API without breaking existing
clients:  introduce  v2  while  keeping  v1  running,  migrate  clients,  then  deprecate  v1.  Better  yet,  make  changes
backward-compatible (add fields, don't remove/rename) so you need new versions less often.

Q138. [Medium]  How would you add rate limiting to an API?
n Relevant to your rate-limiter project
MODEL ANSWER
Identify the client (API key, user ID, or IP), and apply a rate-limit algorithm per key - token bucket (allow bursts up to
a  capacity,  refill  at  a  steady  rate)  is  the  usual  choice.  Implement  it  at  the  API  gateway  or  a  middleware  so  it's
centralised, and back the counters with Redis (atomic INCR / Lua scripts) so the limit is enforced consistently across
all server instances. Return 429 Too Many Requests with a Retry-After header when exceeded. You've built exactly
this (distributed rate limiter), so you can speak to atomicity and latency from real experience.

LLD + System Design  |  SDE Fresher Question Bank

Page 33

Q139. [Medium]  What are idempotency keys and how do they work in an API?
MODEL ANSWER
An  idempotency  key  is  a  unique  value  (often  a  UUID)  the  client  sends  with  a  non-idempotent  request  (typically  a
POST, like a payment). The server stores the key with the result of the first successful processing; if the same key
arrives again (a retry after a timeout), the server returns the stored original result instead of processing it again. This
makes  'create  order'  or  'charge  card'  safe  to  retry  without  duplicates  -  critical  because  networks  make  retries
inevitable. Stripe's API is the canonical example (Idempotency-Key header).

Q140. [Medium]  What is a webhook?
MODEL ANSWER
A webhook is a way for a server to push events to another system by making an HTTP callback to a URL that the
receiver  registered  -  'reverse  API'  /  'push  instead  of  poll.'  Instead  of  you  repeatedly  polling  'has  the  payment
completed?', the payment provider POSTs to your webhook URL when it does. It's efficient (no wasted polling) and
near-real-time.  Considerations:  verify  authenticity  (signatures),  handle  retries  and  duplicate  deliveries  (be
idempotent),  and  respond  quickly  (do  heavy  work  async).  Used  for  payment  confirmations,  CI  events,  and
integrations.

Q141. [Medium]  For real-time updates, would you use WebSockets, long polling, or SSE?
MODEL ANSWER
Long  polling  -  the  client's  request  is  held  open  until  there's  data,  then  re-issued;  works  over  plain  HTTP,
near-real-time,  but  resource-heavy.  SSE  (Server-Sent  Events)  -  a  persistent  one-way  server->client  stream  over
HTTP;  great  for  feeds/notifications,  auto-reconnects,  but  can't  send  client->server.  WebSockets  -  full-duplex,
lowest-latency, persistent two-way connection; best for truly interactive apps (chat, multiplayer, collaborative editing).
Choose the lightest that fits: SSE for one-way pushes, WebSockets for bidirectional, long polling as a fallback where
WebSockets aren't available.

Q142. [Medium]  How do you secure an API (authentication options)?
MODEL ANSWER
Common  mechanisms:  API  keys  (simple,  for  server-to-server  or  identifying  an  app,  but  coarse).  OAuth  2.0
(delegated authorization - 'log in with Google', issues scoped access tokens; the standard for third-party access). JWT
(a  signed,  self-contained  token  carrying  claims,  verified  without  a  server  lookup  -  good  for  stateless  auth).  Plus:
always use HTTPS, validate/sanitise input, enforce authorization (not just authentication) per resource, rate-limit, and
use short-lived tokens with refresh. Match the mechanism to the caller - API keys for internal/partners, OAuth+JWT for
user-facing.

Q143. [Easy]  What status codes and error format should an API return?
MODEL ANSWER
Use  HTTP  status  codes  meaningfully:  200/201/204  for  success,  400  for  bad  input,  401  unauthenticated,  403
forbidden, 404 not found, 409 conflict, 422 validation error, 429 rate-limited, 500 server error, 503 unavailable. Return
a  consistent,  structured  error  body  -  typically  an  error  code,  a  human-readable  message,  and  optionally
details/field errors - so clients can program against it. Don't leak stack traces or internals. Consistent, correct status
codes plus a predictable error schema make an API pleasant and safe to integrate with.

Q144. [Medium]  How do you handle large file uploads in an API?
MODEL ANSWER
Don't  stream  big  files  through  your  application  servers.  Use  pre-signed  URLs:  the  client  asks  your  API  for  a
temporary signed URL, then uploads the file directly to object storage (S3), bypassing your servers entirely - which
keeps  your  app  tier  light  and  scalable.  For  very  large  files,  use  multipart/chunked  upload  (upload  in  parts,
resumable on failure). Store only the resulting object key + metadata in your DB, and serve downloads via the CDN.
This pattern keeps the heavy data path off your compute tier.

LLD + System Design  |  SDE Fresher Question Bank

Page 34

Q145. [Medium]  How do you design an API to remain backward compatible as it evolves?
MODEL ANSWER
Make only additive, non-breaking changes: add new optional fields and new endpoints, but never remove or rename
existing fields, change their types, or change the meaning of responses - existing clients must keep working. Provide
sensible defaults for new fields, tolerate unknown fields on input, and avoid making previously-optional fields required.
When a breaking change is unavoidable, introduce a new version (v2) and run both during a deprecation window. The
principle mirrors the expand-contract DB migration: never break the contract clients already depend on.

Q146. [Easy]  What's the difference between rate limiting and throttling?
MODEL ANSWER
They're closely related and often used interchangeably, but the nuance: rate limiting enforces a hard cap - once a
client  exceeds  the  allowed  requests  in  a  window,  further  requests  are  rejected  (429).  Throttling  tends  to  mean
slowing down or shaping the request rate - queuing or delaying excess requests rather than outright rejecting them
(smoothing traffic, like a leaky bucket). Both protect the system from overload; rate limiting blocks excess, throttling
paces it.

Q147. [Easy]  Where does TLS termination happen, and why does it matter?
MODEL ANSWER
TLS termination is where the encrypted HTTPS connection is decrypted - usually at the load balancer, reverse proxy,
or  API  gateway  at  the  edge,  rather  than  on  each  application  server.  Doing  it  at  the  edge  offloads  the  CPU  cost  of
encryption  from  your  app  servers  (centralising  certificate  management),  and  traffic  continues  internally  over  the
trusted  network  (or  re-encrypted  for  sensitive  segments).  It  matters  for  performance  (one  place  handles  crypto),
operational simplicity (one place manages certs), and it's where features like routing and WAF inspection can act on
decrypted requests.

Q148. [Medium]  What's the difference between synchronous and asynchronous API styles?
MODEL ANSWER
A  synchronous  API  processes  the  request  and  returns  the  result  in  the  same  call  -  the  client  waits  (simple,
immediate  result,  but  ties  up  resources  for  slow  operations).  An  asynchronous  API  accepts  the  request,  returns
immediately (often 202 Accepted with a job/status URL), and processes the work in the background; the client later
polls  the  status  endpoint  or  receives  a  webhook/callback.  Use  sync  for  fast  operations  where  the  caller  needs  the
answer  now;  use  async  for  long-running  work  (report  generation,  video  processing)  so  you  don't  hold  connections
open and can absorb load via queues.

Q149. [Medium]  How do you serve a large or streaming response efficiently?
MODEL ANSWER
Don't build the entire response in memory. Stream it - send data in chunks as it's produced (HTTP chunked transfer
encoding,  or  streaming  JSON/NDJSON),  so  memory  stays  bounded  and  the  client  starts  receiving  sooner  (better
time-to-first-byte). For large datasets, combine with pagination so clients pull in pages rather than one giant payload.
Apply compression (gzip/brotli) to cut bandwidth. For files, redirect to object storage/CDN rather than proxying bytes.
Streaming + pagination + compression keeps both server memory and client latency in check.

Q150. [Easy]  What is response compression and when should you use it?
MODEL ANSWER
Response  compression  (gzip,  or  the  more  efficient  brotli)  shrinks  the  response  body  before  sending,  so  less  data
travels  the  network  -  the  client  advertises  support  via  Accept-Encoding  and  the  server  compresses  and  sets
Content-Encoding. It significantly speeds up transfer of text-based responses (JSON, HTML, CSS, JS), trading a little
CPU for much less bandwidth and lower latency. Use it for text/compressible payloads; skip it for already-compressed
data (images, video, zip files) where it adds CPU for no gain. It's a cheap, high-impact optimisation.

LLD + System Design  |  SDE Fresher Question Bank

Page 35

Q151. [Medium]  What is an API contract, and why does it matter in microservices?
MODEL ANSWER
An API contract is the agreed specification of how a service can be called - its endpoints, request/response schemas,
types,  and  error  formats  (often  expressed  in  OpenAPI/Swagger  for  REST  or  .proto  for  gRPC).  It  matters  in
microservices  because  services  are  developed  and  deployed  independently:  a  clear  contract  lets  teams  work  in
parallel against the spec (and generate clients/mocks), and contract testing catches breaking changes before they
hit  production.  The  contract  is  the  stable  interface  that  decouples  services  -  change  the  implementation  freely,  but
honour the contract.

LLD + System Design  |  SDE Fresher Question Bank

Page 36

10. Canonical System Designs

The 'design X' catalogue. For freshers these usually stay high-level, so know each one's core components and the
single hardest part (the crux). Practice narrating: requirements -> estimate -> API/data -> architecture -> the crux. URL
shortener, news feed, and chat are the most common.

Q152. [Hard]  Design a URL shortener (like bit.ly / TinyURL).
n Asked at Amazon, Microsoft - the #1 system design starter
MODEL ANSWER
Functional:  create  a  short  code  for  a  long  URL,  and  redirect  short->long.  It's  read-heavy  (far  more  redirects  than
creations). Core: generate a unique short key (base-62 encode an auto-increment ID or a counter from a distributed
ID service - avoids collisions and is short), store key->URL mapping in a DB, and cache hot mappings in Redis for fast
redirects.

Architecture: client -> LB -> app servers -> cache -> DB (sharded by key as it grows). Redirect returns a 301/302. The
crux  is  unique  short-key  generation  at  scale  (use  a  counter/ID  generator,  not  random  with  collision  checks)  and
serving redirects fast (caching). Extensions: custom aliases, expiry, analytics.

Q153. [Hard]  Design a distributed unique ID generator.
MODEL ANSWER
Need  globally  unique,  roughly  time-ordered  IDs  at  high  throughput,  without  a  single  bottleneck.  Options:  UUIDs
(simple, no coordination, but 128-bit and not sortable); a DB auto-increment (simple but a single point of contention);
range allocation (each server grabs a block of IDs from a central service); or the popular Snowflake approach - a
64-bit ID composed of a timestamp + machine/worker ID + per-ms sequence number, so IDs are unique, sortable by
time,  and  generated  locally  without  coordination.  Snowflake-style  is  the  standard  answer  for  scalable,  sortable  IDs
(used by Twitter/Discord).

Q154. [Hard]  Design a news feed (like Twitter/Facebook).
n Asked at Amazon, Meta, Microsoft
MODEL ANSWER
The  core  decision  is  fan-out  on  write  vs  read.  Fan-out  on  write  (push)  -  when  a  user  posts,  push  it  into  each
follower's precomputed feed (fast reads, but expensive for users with millions of followers - the 'celebrity problem').
Fan-out on read (pull) - build the feed on demand by querying followees' recent posts (cheap writes, slower reads).

The practical answer is a hybrid: push for normal users, and pull for celebrities (merge their posts in at read time).
Use a cache for feeds, a fast store for the timeline, ranking for ordering, and a queue for the fan-out work. The fan-out
strategy and the celebrity edge case are exactly what interviewers probe.

Q155. [Hard]  Design a chat application (like WhatsApp / Messenger).
n Asked at Amazon, Meta
MODEL ANSWER
Use  WebSockets  (persistent  connections)
than  polling.  A
connection/gateway  service  holds  users'  live  connections;  a  message  service  routes  messages.  For  delivery:  store
messages, track delivery/read receipts, and queue messages for offline users to deliver on reconnect. Track online
presence.

for  real-time  bidirectional  messaging  rather

Key  components:  WebSocket  gateway,  message  store  (a  write-heavy  store  like  Cassandra,  partitioned  by
conversation), a presence service, and push notifications for offline users. The crux: maintaining millions of persistent
connections (a connection-server tier with a service-discovery/routing layer to find which server holds a given user's
connection), plus ordering and exactly-once-feel delivery. Group chat fans out to members.

Q156. [Hard]  Design a rate limiter as a service.
n Your project - speak from experience
MODEL ANSWER
Expose a check API ('is this key allowed?') backed by a pluggable algorithm (token bucket is the default) with state in
Redis so the limit holds across all server instances. The critical detail is making the read-modify-write of the counter
atomic - use a Redis Lua script - so concurrent requests across replicas are counted correctly without races.

Architecture: requests hit the gateway -> rate-limit check (Redis) -> allow (proceed) or block (429). Decisions must be
sub-millisecond, so co-locate the limiter with the gateway. This is literally your Distributed Rate Limiter project, so you

LLD + System Design  |  SDE Fresher Question Bank

Page 37

can  discuss  the  token-bucket-in-Redis  implementation,  Lua  atomicity,  and  measured  p99  latency  -  a  standout,
credible answer.

Q157. [Hard]  Design an image/video sharing service (like Instagram).
MODEL ANSWER
Media goes to object storage (S3) served via CDN; the database stores only metadata (post, user, caption, URL)
and the social graph. Uploads use pre-signed URLs (direct to S3) and async processing (resize/transcode, generate
thumbnails) via a queue. The feed is a news-feed problem (fan-out, above).

Components:  app/API  tier,  metadata  DB  (sharded),  object  storage  +  CDN  for  media,  a  queue  +  workers  for  media
processing,  a  cache  for  feeds/hot  content,  and  a  search/discovery  service.  The  crux:  serving  huge  media  volumes
efficiently  (object  storage  +  CDN,  never  through  the  DB)  and  generating  feeds  at  scale.  Read-heavy,  so  cache
aggressively.

Q158. [Hard]  Design a video streaming service (like YouTube/Netflix).
MODEL ANSWER
On  upload,  videos  are  transcoded  into  multiple  resolutions/bitrates  and  split  into  small  segments  (async,  via  a
processing pipeline), stored in object storage and distributed to a CDN. Playback uses adaptive bitrate streaming
(HLS/DASH) - the player fetches segments and switches quality based on bandwidth, served from the nearest CDN
edge.

Components:  upload  service,  a  transcoding  pipeline  (queue  +  workers),  object  storage,  a  global  CDN  (the  heart  of
delivery), metadata DB, search, and recommendations. The crux is the CDN-centric delivery at massive scale and the
transcoding  pipeline  -  the  database  is  almost  incidental;  bandwidth  and  edge  caching  dominate.  Read-heavy  and
bandwidth-bound.

Q159. [Hard]  Design a ride-sharing service (like Uber/Ola).
n Asked at Uber, Ola
MODEL ANSWER
Core problems: track driver locations in real time, and match a rider to a nearby available driver fast. Drivers send
periodic location updates; you index them spatially (geohash or a quadtree, often in Redis) so 'find drivers near this
point'  is  efficient.  A  matching  service  picks  a  driver;  a  trip  service  manages  the  trip  lifecycle  (a  state  machine:
requested -> matched -> ongoing -> completed); pricing applies surge.

Components:  location-ingestion  service,  geospatial  index,  matching  service,  trip  service,  pricing,  payments,  and
notifications (WebSockets for live tracking). The crux is efficient geospatial proximity search at high update volume
plus concurrency in matching (don't assign one driver to two riders).

Q160. [Hard]  Design a file storage/sync service (like Dropbox/Google Drive).
MODEL ANSWER
Store  file  content  in  object  storage,  with  metadata  (file  tree,  versions,  sharing,  owners)  in  a  database.  Key
techniques: split files into chunks and deduplicate (store each unique chunk once, by hash), so re-uploading a slightly
changed  file  only  sends  changed  chunks  (delta  sync)  -  saving  bandwidth  and  storage.  A  sync  service  and  client
watch for changes and reconcile, handling conflicts (versioning).

Components: metadata DB, chunk store (object storage) with dedup, a sync/notification service (notify other devices
of changes), and a CDN for downloads. The crux is efficient sync via chunking + dedup + delta transfer, and conflict
resolution across devices.

Q161. [Hard]  Design a web crawler.
MODEL ANSWER
A crawler fetches pages starting from seed URLs, extracts links, and recurses - essentially BFS over the web graph.
Components: a URL frontier (a prioritised queue of URLs to crawl, with politeness - rate-limit per domain), fetchers
(download  pages,  respect  robots.txt),  a  parser  (extract  links  +  content),  a  seen-URL  store  (dedup  -  a  bloom  filter
scales this), and storage for crawled content.

Challenges: politeness (don't hammer one site), deduplication at massive scale (bloom filters), handling traps/infinite
spaces,  distributed  coordination  across  many  crawler  machines,  and  freshness  (re-crawl  scheduling).  The  crux  is
scale + politeness + dedup. It's a great BFS-meets-distributed-systems problem.

LLD + System Design  |  SDE Fresher Question Bank

Page 38

Q162. [Hard]  Design search autocomplete / typeahead.
MODEL ANSWER
Goal: as the user types a prefix, return top suggestions in a few milliseconds. Use a trie (prefix tree) where each node
can cache its top-k completions, so a prefix lookup is fast and you don't re-rank on every keystroke. Suggestions are
ranked by popularity/frequency, updated periodically from query logs (offline aggregation), not on the hot path.

Architecture: a service holding the trie (sharded by prefix) in memory, fronted by a cache; query logs feed a batch job
that rebuilds/updates the trie with fresh frequencies. The crux: sub-50ms latency (in-memory trie with precomputed
top-k), and separating the fast read path from the slower popularity-aggregation pipeline. Debounce client keystrokes
too.

Q163. [Medium]  Design a notification system (push/email/SMS at scale).
MODEL ANSWER
A  notification  service  accepts  requests,  applies  user  preferences  (which  channels,  opt-outs,  quiet  hours),  renders
from  templates,  and  dispatches  via  channel-specific  providers  (APNs/FCM  for  push,  an  email  provider,  an  SMS
gateway). Use a message queue so sending is async and can absorb bursts, with workers per channel, retries with
backoff, and a dead-letter queue for failures.

Components: API, preference service, template service, a queue + channel workers, and provider integrations. The
crux is scale and reliability - decouple via the queue, handle provider rate limits and failures gracefully, dedupe, and
avoid spamming. Extensible to new channels (Strategy/Factory) - Open/Closed.

Q164. [Hard]  Design a distributed cache (like Memcached/Redis cluster).
MODEL ANSWER
Distribute  key-value  data  across  many  cache  nodes  so  total  capacity  and  throughput  scale  horizontally.  Use
consistent  hashing  to  map  keys  to  nodes  so  adding/removing  a  node  moves  only  a  small  fraction  of  keys  (with
virtual nodes for even load). Each node is an in-memory store with an eviction policy (LRU) and optional TTL.

Concerns: replication for availability (a replica per shard so a node failure doesn't lose all its keys), handling hot keys
(replicate/spread  them),  and  client-side  vs  proxy-based  routing.  The  crux  is  the  partitioning  scheme  (consistent
hashing) and graceful behaviour on node changes. This connects to your systems interests - you can go deep on the
hashing and eviction internals.

Q165. [Hard]  Design a 'top K' / trending items system (e.g. trending hashtags).
MODEL ANSWER
Computing  exact  top-K  over  a  massive,  high-velocity  stream  is  expensive,  so  use  approximations.  Maintain
approximate counts with a count-min sketch (sub-linear memory) and keep a heap of the current top-K. Aggregate
over  time  windows  (sliding/tumbling)  for  'trending  now.'  For  exactness  at  smaller  scale,  periodic  map-reduce/batch
aggregation over logs works.

Architecture:  a  streaming  pipeline  (Kafka  ->  stream  processor  like  Flink/Spark  Streaming)  maintaining  sketches  +
heaps  per  window,  with  results  cached  for  fast  reads.  The  crux  is  handling  the  volume  with  approximate,
memory-bounded structures rather than counting everything exactly. Mentioning count-min sketch + heap is a strong
signal.

Q166. [Hard]  Design a payment system.
MODEL ANSWER
Correctness  and  consistency  dominate  over  raw  scale.  Use  strong  consistency  (ACID)  for  balances/ledgers,
idempotency keys so a retried charge isn't applied twice, and a double-entry ledger (every transaction debits one
account and credits another, always balancing) for auditability. Integrate payment gateways/PSPs, and use the saga
pattern (with compensating actions like refunds) for multi-step flows across services.

Components: payment service, ledger DB (ACID), idempotency store, gateway integrations, and async reconciliation.
The  crux:  never  lose  or  double-count  money  -  so  idempotency,  transactional  integrity,  and  reconciliation  matter  far
more than throughput tricks. Discuss handling failures and partial states carefully.

LLD + System Design  |  SDE Fresher Question Bank

Page 39

Q167. [Medium]  Design a real-time leaderboard.
MODEL ANSWER
Use Redis sorted sets (ZSET): each player is a member scored by their points, so updating a score (ZADD), getting
the top N (ZREVRANGE), and getting a player's rank (ZREVRANK) are all O(log n) and real-time. For huge player
counts, shard by region/tier or bucket scores. Persist authoritative scores in a database, with Redis as the fast ranking
layer.

Components: a score-ingestion path that updates Redis (and the DB), and a read API for rankings. The crux is that a
relational  ORDER  BY  +  LIMIT  on  every  read  doesn't  scale  for  frequent  updates  -  the  sorted-set  data  structure  is
purpose-built for ranking. A clean example of matching the data structure to the access pattern.

Q168. [Medium]  Design Pastebin (text/code sharing).
MODEL ANSWER
Similar  to  a  URL  shortener  but  storing  larger  content.  Generate  a  unique  key  for  each  paste;  store  the  content  in
object storage (or a blob column) and metadata (key, expiry, visibility, created time) in a database; cache hot pastes.
Reads dominate, so use a CDN/cache for popular pastes. Support expiry (TTL) and optional access control.

Architecture: client -> LB -> app -> cache -> (metadata DB + object storage). The crux is unique key generation (like
the URL shortener) and serving reads efficiently; storing big text in object storage rather than bloating the DB is the
key modelling choice. Extensions: syntax highlighting, expiry cleanup job, view limits.

Q169. [Hard]  Design a distributed job scheduler / task queue (run jobs at a time or on a schedule).
MODEL ANSWER
Components: a store of jobs (with scheduled time, payload, status), a scheduler that finds due jobs and enqueues
them, a queue, and workers that execute and report status. For scale and reliability: partition jobs, use leader election
so  one  scheduler  instance  dispatches  (avoid  duplicate  runs),  make  execution  idempotent  and  support  retries  with
backoff + a dead-letter queue, and use a time-bucketed index to find due jobs efficiently.

The  crux:  exactly-once-ish  execution  (at-least-once  delivery  +  idempotent  jobs),  not  missing  or  double-running
scheduled jobs across a distributed fleet, and handling worker failures (visibility timeouts so a crashed worker's job is
re-queued). Cron-at-scale is the essence.

Q170. [Hard]  Design an online multiplayer game's matchmaking + state sync (high level).
MODEL ANSWER
Two  parts.  Matchmaking:  players  enter  a  queue  with  attributes  (skill/MMR,  region,  latency);  a  matchmaker  groups
compatible  players  (often  bucketing  by  skill  and  widening  the  range  over  wait  time)  and  assigns  them  to  a  game
server. State sync: a low-latency connection (UDP or WebSocket) between clients and an authoritative game server
that ticks the simulation and broadcasts state, with client-side prediction and reconciliation to hide latency.

Components: matchmaking service + queue, a fleet of game servers (allocated per match), and a real-time transport.
The crux is low-latency real-time sync (UDP, authoritative server to prevent cheating, prediction for smoothness) and
fair, fast matchmaking - a good place to contrast TCP vs UDP trade-offs.

Q171. [Medium]  Design a logging and monitoring system.
MODEL ANSWER
Agents  on  each  host  collect  logs/metrics  and  ship  them  (via  a  buffer/queue  like  Kafka  to  absorb  volume)  to  a
processing  pipeline  that  indexes  them  for  search  (Elasticsearch  for  logs)  and  stores  metrics  in  a  time-series  DB.
Dashboards (Grafana/Kibana) visualise, and an alerting service fires on thresholds/anomalies.

Components:  collection  agents,  a  high-throughput  ingestion  buffer  (Kafka),  stream  processors,  a  search  index  +
time-series store, dashboards, and alerting. The crux is handling enormous write volume (buffer + partition), efficient
storage/retention  (downsample  old  metrics,  expire  logs),  and  fast  queries  over  recent  data.  It  ties  together  queues,
search indexes, and time-series storage.

Q172. [Hard]  Design a hotel/flight booking system (inventory with concurrency).
MODEL ANSWER
The  core  challenge  is  preventing  double-booking  of  limited  inventory  under  concurrency.  Model  inventory
(rooms/seats with availability per date/flight), and make the 'reserve' step atomic - a DB transaction with row locking or
a unique constraint, or a temporary hold with expiry while the user pays (release if they don't complete). Search is
read-heavy (cache availability), booking is consistency-critical.

LLD + System Design  |  SDE Fresher Question Bank

Page 40

Components: search service (cached), inventory service (strongly consistent), booking/reservation service with holds,
payment,  and  notifications.  The  crux:  atomic  inventory  decrement  to  avoid  overselling,  plus  the  hold-with-timeout
pattern for the checkout window - essentially the BookMyShow concurrency problem at system scale.

LLD + System Design  |  SDE Fresher Question Bank

Page 41

11. Reliability, Observability & Synthesis

The resilience patterns and 'how to operate it' concepts that round out a system design answer, plus synthesis questions
on tail latency, debugging, and how to drive the interview itself. Sprinkling these in shows you think beyond the happy
path.

Q173. [Medium]  What is fault tolerance, and how do you build it in?
MODEL ANSWER
Fault tolerance is a system's ability to keep functioning (perhaps degraded) when components fail, rather than failing
entirely.  You  build  it  with  redundancy  (no  single  points  of  failure  -  multiple  instances,  replicated  data),  failover
(automatically  switch  to  healthy  backups),  retries  with  backoff  for  transient  errors,  circuit  breakers  to  contain
cascading  failures,  timeouts  so  a  slow  dependency  doesn't  hang  everything,  and  graceful  degradation  (serve  a
reduced experience). The mindset: assume everything fails, and design so no single failure takes the system down.

Q174. [Medium]  What's the difference between redundancy and failover?
MODEL ANSWER
Redundancy is having backup/duplicate components (extra servers, replica databases, multiple availability zones) so
a  copy  exists  if  one  fails.  Failover  is  the  process  of  automatically  switching  to  that  backup  when  the  primary  fails.
Redundancy is the prerequisite (you need spares); failover is the mechanism that uses them (detect failure, promote a
standby, redirect traffic). Together they deliver high availability - and failover should be automatic and tested, since
untested failover often doesn't work when you actually need it.

Q175. [Medium]  What is graceful degradation?
MODEL ANSWER
Graceful  degradation  means  that  when  part  of  a  system  fails  or  is  overloaded,  it  continues  providing  reduced
functionality  instead  of  failing  completely.  Examples:  if  the  recommendation  service  is  down,  show  generic  popular
items instead of erroring the whole page; if a non-critical feature times out, render the page without it; serve slightly
stale  cached  data  when  the  database  is  struggling.  It  prioritises  core  functionality  and  a  usable  experience  over
all-or-nothing - far better for users than a hard failure.

Q176. [Easy]  What are health checks and heartbeats?
MODEL ANSWER
A health check is a probe (often an HTTP /health endpoint) that reports whether a service instance is functioning,
used  by  load  balancers  and  orchestrators  to  route  traffic  only  to  healthy  instances  and  restart  unhealthy  ones.  A
heartbeat  is  a  periodic  signal  a  node  sends  to  indicate  it's  alive;  if  heartbeats  stop,  the  system  treats  the  node  as
failed  and  triggers  failover/rebalancing.  Both  are  how  a  distributed  system  detects  failures  quickly  so  it  can  react
(reroute, restart, promote a replica).

Q177. [Medium]  What's the difference between monitoring, logging, and tracing?
n Asked at backend/SRE-adjacent roles
MODEL ANSWER
They're the three pillars of observability. Logs are discrete, timestamped event records ('order 123 failed: timeout') -
great for debugging specific events. Metrics (monitoring) are aggregated numeric measurements over time (request
rate, error rate, latency, CPU) - great for dashboards, trends, and alerting. Traces (distributed tracing) follow a single
request as it flows across multiple services, showing where time is spent - essential in microservices. Logs tell you
what happened, metrics tell you how much/how often, traces tell you where in the request path.

Q178. [Medium]  What is distributed tracing and why is it needed?
MODEL ANSWER
Distributed  tracing  tracks  a  single  request  as  it  travels  through  many  services  by  attaching  a  unique  trace  ID  (and
span  IDs  per  hop)  that's  propagated  across  calls.  Each  service  records  timing  for  its  part,  and  a  tracing  system
(Jaeger, Zipkin, OpenTelemetry) stitches them into one timeline. It's needed because in microservices a single user
request  fans  out  across  dozens  of  services  -  without  tracing,  you  can't  tell  which  service  caused  a  slow  or  failed
request. It pinpoints bottlenecks and failures in complex call graphs that logs/metrics alone can't.

LLD + System Design  |  SDE Fresher Question Bank

Page 42

Q179. [Medium]  What are the four golden signals of monitoring?
MODEL ANSWER
From Google's SRE practice, the four signals to monitor for any service: Latency (how long requests take - track tail
latency, and separate success vs error latency), Traffic (demand - requests/sec), Errors (rate of failed requests), and
Saturation (how full the system is - CPU, memory, queue depth - how close to capacity). Watching these four catches
most  problems  and  tells  you  whether  to  scale  or  investigate.  A  crisp,  well-regarded  answer  for  'what  would  you
monitor.'

Q180. [Hard]  What is leader election, and where is it used?
MODEL ANSWER
Leader election is how a group of distributed nodes agree on a single 'leader' responsible for coordination (handling
writes, scheduling, assigning work), with the others as followers ready to take over. It's used in replicated databases
(the  primary),  distributed  schedulers  (one  dispatcher),  and  coordination  services.  It's  implemented  via  consensus
algorithms  (Raft,  Paxos)  or  coordination  tools  (ZooKeeper,  etcd).  The  hard  part  is  doing  it  correctly  during  network
partitions to avoid two leaders (split-brain) - which is why it relies on quorum/consensus rather than a simple vote.

Q181. [Hard]  What is consensus, and what do Raft/Paxos achieve (at a high level)?
MODEL ANSWER
Consensus  is  getting  a  group  of  distributed  nodes  to  agree  on  a  single  value/state  even  with  failures  and  network
issues  -  the  foundation  of  consistent  replication  and  leader  election.  Paxos  and  the  more  understandable  Raft  are
algorithms that achieve it: they elect a leader, replicate a log of operations to a majority (quorum) of nodes before
committing, and guarantee that committed entries are never lost or contradicted - so all nodes converge on the same
ordered log. Requiring a majority is what prevents split-brain. You don't need the internals as a fresher, but knowing
'Raft = leader + replicated log + quorum for agreement' is a strong signal.

Q182. [Hard]  What is the split-brain problem?
MODEL ANSWER
Split-brain happens when a network partition divides a cluster into groups that can't communicate, and each group
elects its own leader or accepts writes independently - so you end up with two 'leaders' and divergent, conflicting state
that's painful to reconcile. The standard prevention is requiring a quorum (majority) to elect a leader or commit writes:
only the partition with a majority can proceed, and the minority side steps down - so at most one side is active. It's a
key reason consensus algorithms insist on majorities.

Q183. [Medium]  What is exponential backoff with jitter, and why is it needed?
n Asked at Amazon
MODEL ANSWER
When  a  request  fails  (a  transient  error  or  overloaded  service),  retrying  immediately  -  and  having  all  clients  retry  in
lockstep - can hammer the recovering service into the ground (a 'retry storm' / thundering herd). Exponential backoff
waits progressively longer between retries (1s, 2s, 4s, 8s...), and jitter adds randomness to those delays so clients
don't all retry at the same instant. Together they spread retries out, giving the service room to recover. Always cap the
retries and the max delay. It's a small detail that signals real distributed-systems maturity.

Q184. [Medium]  What is the bulkhead pattern?
MODEL ANSWER
Named after a ship's watertight compartments, the bulkhead pattern isolates resources so a failure or overload in one
part can't sink the whole system. For example, give each downstream dependency its own connection/thread pool, so
if one dependency becomes slow and exhausts its pool, other dependencies still have their own resources and keep
working.  It  contains  failures  to  a  'compartment'  rather  than  letting  one  struggling  component  consume  all  shared
resources and take everything down. It pairs well with circuit breakers and timeouts.

Q185. [Medium]  What is load shedding, and how does it differ from rate limiting?
MODEL ANSWER
Load shedding is deliberately dropping or rejecting some requests when a system is overloaded, to protect its overall
health and keep serving the rest - often prioritising important traffic and shedding low-priority work. Rate limiting caps
requests per client/key regardless of current system load (a policy/fairness control). The difference: rate limiting is a
fixed per-client quota; load shedding is a reactive, system-wide self-defence triggered by actual overload. Both return
429/503, but shedding is about survival under stress, rate limiting about fair usage.

LLD + System Design  |  SDE Fresher Question Bank

Page 43

Q186. [Medium]  What are canary and blue-green deployments?
MODEL ANSWER
Both  reduce  deployment  risk.  Canary:  roll  the  new  version  out  to  a  small  percentage  of  traffic/servers  first,  watch
metrics, and gradually increase if healthy (or roll back if not) - catches problems with limited blast radius. Blue-green:
run two identical environments, 'blue' (current) and 'green' (new); deploy to green, test it, then switch all traffic over at
once - with instant rollback by switching back to blue. Canary is gradual and metric-driven; blue-green is an instant
cutover with a ready rollback. Both beat a risky big-bang deploy.

Q187. [Easy]  What are feature flags and why use them?
MODEL ANSWER
Feature  flags  (toggles)  let  you  turn  features  on/off  at  runtime  via  configuration,  without  deploying  new  code.  Uses:
decouple deployment from release (ship code dark, enable later), gradual rollouts and A/B testing (enable for X% of
users), instant kill switch to disable a misbehaving feature without a rollback, and per-user/segment targeting. They
reduce deployment risk and enable trunk-based development. The trade-off is flag sprawl/tech debt if you don't clean
up old flags.

Q188. [Medium]  Why do we measure p99 (tail) latency instead of average?
n Asked at Amazon, backend roles
MODEL ANSWER
Because  averages  hide  the  bad  experiences.  If  99%  of  requests  are  fast  but  1%  take  5  seconds,  the  average  still
looks fine - but that 1% is a lot of unhappy users, and at scale a single page may make many backend calls, so the
chance of hitting a slow one compounds (tail latency amplification). p99 (the latency the slowest 1% exceed) captures
the  worst-case  experience  real  users  feel.  SLOs  are  set  on  percentiles  (p95,  p99,  p999),  not  averages,  precisely
because tail latency is what hurts. Knowing this distinction is a strong signal.

Q189. [Medium]  How does designing a read-heavy system differ from a write-heavy one?
MODEL ANSWER
Read-heavy  (most  web  apps):  optimise  reads  with  aggressive  caching  (Redis/CDN),  read  replicas,  and
denormalization/precomputation so reads are cheap; eventual consistency is often acceptable for reads. Write-heavy
(logging,  metrics,  IoT,  feeds):  optimise  ingestion  with  write-optimised  stores  (LSM-tree  DBs  like  Cassandra),
sharding to distribute write load, batching/buffering via queues, and append-only designs. So reads scale with copies
and  caches;  writes  scale  with  partitioning  and  write-friendly  storage.  Identifying  the  read:write  ratio  early  drives  the
whole design.

Q190. [Medium]  What is the cold-cache / cache-warming problem?
MODEL ANSWER
When a cache is empty - after a restart, deployment, or failover - all requests miss and hit the database at once, which
can overload it (and a synchronised mass-expiry causes the same cache stampede). This 'cold cache' can cause an
outage  right  after  a  deploy.  Mitigations:  warm  the  cache  proactively  (preload  hot  keys  before  taking  traffic),
stagger/jitter TTLs so keys don't all expire together, use request coalescing/locks so only one request recomputes a
missing key, and ramp traffic gradually. It's an operational gotcha worth calling out when you propose heavy caching.

Q191. [Medium]  What is the sidecar pattern?
MODEL ANSWER
The  sidecar  pattern  deploys  a  helper  component  alongside  the  main  service  (in  the  same  pod/host)  to  handle
cross-cutting concerns - so the application doesn't have to. The sidecar manages things like logging, monitoring, TLS,
retries, and service-to-service communication. The canonical example is a service mesh (Istio/Envoy), where a proxy
sidecar next to each service handles routing, mTLS, retries, and observability transparently. It keeps application code
focused on business logic while standardising infrastructure concerns across all services, regardless of language.

Q192. [Medium]  What is the strangler fig pattern for migrating a monolith?
MODEL ANSWER
It's  a  strategy  to  incrementally  replace  a  monolith  with  microservices  without  a  risky  big-bang  rewrite.  You  put  a
routing layer (proxy/gateway) in front; then carve out one piece of functionality at a time into a new service and route
just that traffic to it, leaving the rest on the monolith. Over time more functionality is 'strangled' away until the monolith
is  gone  (named  after  a  fig  vine  that  gradually  overtakes  its  host  tree).  It  lets  you  migrate  safely  and  reversibly,
validating each piece in production before moving on - far safer than rewriting everything at once.

LLD + System Design  |  SDE Fresher Question Bank

Page 44

Q193. [Medium]  A production service suddenly shows a latency spike. How do you investigate?
MODEL ANSWER
Start  with  the  dashboards/golden  signals:  is  it  latency  across  the  board  or  just  p99?  Did  traffic  spike  (load)  or  did
errors rise? Check recent changes first (a deploy, config change, feature flag - the most common cause) and roll back
if suspicious. Look at saturation (CPU, memory, connection pools, GC), then use distributed tracing to find which
downstream service or query got slow, and logs for that service. Common culprits: a slow/locked database query, a
struggling  dependency,  cache  cold/eviction,  a  thread/connection  pool  exhaustion,  or  a  noisy  neighbour.  The
structured approach - signals -> recent changes -> trace to the slow component -> fix - is what's graded.

Q194. [Medium]  How do you approach designing a system you've never seen before in an interview?
MODEL ANSWER
Fall  back  on  the  framework,  not  memorised  solutions.  Clarify  the  requirements  and  scope;  estimate  scale  to  know
what you're building for; identify the core entities and the main API; then assemble the standard building blocks you do
know (LB, stateless app tier, DB + cache, queue for async work, object storage + CDN for media) into a high-level
design; and finally deep-dive the part that's unique or the bottleneck. Most systems are recombinations of the same
primitives - so reasoning from requirements and composing known blocks beats trying to recall a specific design.

Q195. [Hard]  What is a distributed lock, and what are its pitfalls?
MODEL ANSWER
A distributed lock coordinates access to a shared resource across multiple processes/machines (e.g. ensure only one
worker runs a job), often implemented with Redis (SET NX with a TTL) or ZooKeeper/etcd. Pitfalls: if the lock holder
crashes  you  need  a  TTL  so  it  auto-releases  (else  deadlock)  -  but  then  a  slow  holder  might  exceed  the  TTL  and  a
second  holder  also  acquires  it  (two  holders);  clock  skew  and  GC  pauses  make  this  worse.  Robust  solutions  use
fencing tokens (a monotonically increasing number checked by the resource) so a stale holder's writes are rejected.
The  lesson:  distributed  locks  are  deceptively  hard  -  prefer  designs  that  avoid  them  (idempotency,  single-writer
partitions) when possible.

Q196. [Hard]  How are conflicts resolved in eventually-consistent systems (LWW, vector clocks)?
MODEL ANSWER
When concurrent writes happen on different replicas, you need a rule to reconcile them. Last-Write-Wins (LWW) -
keep  the  write  with  the  latest  timestamp;  simple  but  can  silently  lose  data  and  is  sensitive  to  clock  skew.  Vector
clocks - track causality (which version happened-before which) so the system can detect true conflicts (concurrent,
unrelated  writes)  versus  stale  ones,  and  either  auto-merge  or  surface  the  conflict  to  the  application.  CRDTs
(conflict-free replicated data types) are data structures that merge deterministically without conflicts (counters, sets).
LWW for simplicity, vector clocks/CRDTs when you can't afford to lose concurrent updates.

Q197. [Medium]  What is graceful shutdown / connection draining?
MODEL ANSWER
Graceful shutdown means stopping a service without dropping in-flight work. When an instance is told to stop (deploy,
scale-in), it first stops accepting new requests (deregister from the load balancer / fail health checks), then finishes
processing  the  requests  already  in  progress  (draining)  up  to  a  timeout,  closes  connections  cleanly,  and  only  then
exits.  This  avoids  returning  errors  to  users  mid-request  during  routine  deploys/autoscaling.  It's  a  small  operational
detail that separates a robust design from one that errors on every deployment.

Q198. [Medium]  What is capacity planning and why leave headroom?
MODEL ANSWER
Capacity planning is estimating the resources (servers, DB, bandwidth) needed to handle expected load - including
peaks - and provisioning accordingly. You leave headroom (run well below 100% utilisation, often target ~50-70%)
because systems behave badly near saturation (latency spikes non-linearly), you need slack to absorb traffic spikes
and to tolerate losing an instance/zone without overloading the rest, and autoscaling reacts with lag. Running hot with
no  headroom  means  a  small  spike  or  a  single  failure  cascades  into  an  outage.  So  plan  for  peak-plus-margin,  not
average.

LLD + System Design  |  SDE Fresher Question Bank

Page 45

Q199. [Medium]  What's the most important thing to do in the first few minutes of a system design
interview?
MODEL ANSWER
Clarify  the  requirements  and  scope  before  designing  anything.  Pin  down  the  functional  requirements  (which
features  are  in  scope),  the  non-functional  ones  (scale,  latency,  consistency,  availability  targets),  and  the  key
assumptions  -  then  do  a  quick  back-of-envelope  estimate.  This  prevents  the  biggest  failure  mode:  confidently
designing the wrong system. It also signals seniority - good engineers scope and ask before building. Spend a few
minutes here, write the scope down, get the interviewer's buy-in, and only then start the design.

Q200. [Medium]  What is observability, and how is it more than monitoring?
MODEL ANSWER
Monitoring is watching known metrics and alerting on predefined thresholds - it answers questions you knew to ask
('is CPU high?'). Observability is the broader property of being able to understand a system's internal state from its
outputs well enough to debug unknown problems you didn't anticipate - by exploring rich logs, metrics, and traces
together. Monitoring tells you that something is wrong; observability lets you ask arbitrary new questions to figure out
why. The three pillars (logs, metrics, traces) plus the ability to slice/correlate them give you observability.

Q201. [Medium]  What are RTO and RPO in disaster recovery?
MODEL ANSWER
RTO (Recovery Time Objective) - the maximum acceptable time to restore service after a disaster (how long can
you be down?). RPO (Recovery Point Objective) - the maximum acceptable data loss measured in time (how much
recent data can you afford to lose?). A 5-minute RPO means backups/replication must be at most 5 minutes behind.
They  drive  your  DR  strategy:  a  tight  RTO  needs  hot  standbys/multi-region  failover;  a  tight  RPO  needs  frequent  or
synchronous replication. They quantify 'how resilient must this be' in concrete, costable terms.

LLD + System Design  |  SDE Fresher Question Bank

Page 46


