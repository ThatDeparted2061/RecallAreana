OBJECT-ORIENTED PROGRAMMING

SDE Fresher Interview Question Bank (Java-centred)

Product & service-based company interviews  -  India 2026 cycle

Complete, interview-ready coverage of OOP for fresher SDE interviews - the four pillars, inheritance &
the diamond problem, overloading vs overriding, abstract classes vs interfaces, the SOLID
principles, and the core design patterns (Singleton, Factory, Observer, Strategy, Decorator).
Examples are in Java (with C++ contrasts where they matter), since OOP is asked in nearly every
fresher round.

Prepared for: Harsh Rao - BITS Pilani Goa, SDE-1 prep
Volume 4 of 5 - Core CS Interview Series - June 2026
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

OOP (Java)  |  SDE Fresher Question Bank

Page 2

Table of Contents

1. OOP Fundamentals & the Four Pillars

2. Encapsulation, Access Modifiers & Abstraction

3. Inheritance

4. Polymorphism: Overloading & Overriding

5. Constructors, Objects & Memory

6. Java Core: Keywords, equals/hashCode, Memory

7. SOLID Principles & Design Quality

8. Design Patterns: Creational

9. Design Patterns: Structural & Behavioral

10. OOP Design, Relationships & Java Features

11. Tricky, Output & Rapid-fire

4

8

11

14

17

20

24

28

31

35

39

OOP (Java)  |  SDE Fresher Question Bank

Page 3

1. OOP Fundamentals & the Four Pillars

The opener for any OOP round - define OOP, name the four pillars, and give a real-world example for each. These come
up in essentially every interview, so deliver them crisply with a concrete example rather than a textbook definition.

Q1. [Easy]  What is Object-Oriented Programming?
n Universally asked
MODEL ANSWER
OOP  is  a  programming  paradigm  that  organises  code  around  objects  -  self-contained  units  that  bundle  data
(state/attributes) with the methods (behaviour) that operate on that data - rather than around functions and logic alone.
You model a system as a set of interacting objects, each an instance of a class.

Its goals are modularity, reusability, and maintainability, achieved through its four pillars: encapsulation, abstraction,
inheritance, and polymorphism. Java, C++, Python, and C# are mainstream OOP languages.

Q2. [Medium]  What's the difference between procedural and object-oriented programming?
MODEL ANSWER
Procedural programming (C, Pascal) structures code as a sequence of functions/procedures operating on data that is
largely separate and often global - it's top-down and action-oriented. OOP bundles data and the functions that act on it
together into objects, and is bottom-up and data-oriented.

Consequences: in procedural code, data and behaviour are decoupled (and data is exposed), making large programs
harder  to  maintain  and  reason  about.  OOP's  encapsulation  hides  internal  state,  inheritance  enables  reuse,  and
polymorphism enables flexible extension - which scales better for large, evolving systems. Procedural can be faster
and simpler for small scripts, though.

Q3. [Easy]  What's the difference between a class and an object?
n Universally asked
MODEL ANSWER
A class is a blueprint/template that defines the structure (attributes) and behaviour (methods) that its objects will have
-  it's  a  logical  entity  that  consumes  no  memory  by  itself.  An  object  is  a  concrete  instance  of  a  class,  created  at
runtime, occupying memory and holding actual values.

class Car {           // class - the blueprint
    String model;
    void drive() { ... }
}

Car c = new Car();    // object - an instance in memory

Analogy:  the  class  is  the  architect's  blueprint;  the  objects  are  the  actual  houses  built  from  it  -  many  houses,  one
blueprint.

Q4. [Easy]  What are the four pillars of OOP?
n Asked at virtually every company
MODEL ANSWER
Encapsulation  -  bundling  data  with  the  methods  that  operate  on  it  and  hiding  internal  state  behind  a  controlled
interface. Abstraction - exposing only essential features and hiding complex implementation details. Inheritance - a
class acquiring properties and behaviour from another, enabling reuse. Polymorphism - one interface taking many
forms, so the same call behaves differently depending on the object.

Memorise them as 'A PIE' (Abstraction, Polymorphism, Inheritance, Encapsulation), and be ready with one real-world
example each - that's what interviewers actually want.

Q5. [Medium]  What is encapsulation?
n Commonly asked
MODEL ANSWER
Encapsulation  is  bundling  data  (fields)  and  the  methods  that  operate  on  them  into  a  single  unit  (the  class),  and
restricting direct access to the internal state - exposing it only through a controlled public interface (getters/setters or
behaviour methods). It's often called data hiding.

You  implement  it  by  making  fields  private  and  providing  public  methods  to  access/modify  them  with  validation.
Benefits: the internal representation can change without breaking callers, you enforce invariants (a setter can reject

OOP (Java)  |  SDE Fresher Question Bank

Page 4

invalid values), and you reduce coupling. A bank-account object exposing deposit()/withdraw() but a private balance is
the classic example.

Q6. [Medium]  What is abstraction?
n Commonly asked
MODEL ANSWER
Abstraction  means  exposing  only  the  essential,  relevant  features  of  an  object  while  hiding  the  complex
implementation details behind a simple interface. You focus on what an object does, not how it does it.

A car's steering wheel, pedals, and gear stick are an abstraction - you drive without knowing the engine internals. In
code,  you  achieve  it  with  abstract  classes  and  interfaces  that  declare  what  methods  exist,  leaving  the  how  to
implementations. It reduces complexity for the user and decouples them from implementation changes.

Q7. [Medium]  What's the difference between abstraction and encapsulation?
n Asked at Amazon, Microsoft - the favourite distinction
MODEL ANSWER
They're related but distinct. Abstraction is about design - hiding complexity by exposing only essential behaviour (the
'what'); it's solved at the interface/abstract-class level. Encapsulation is about implementation - hiding internal data
and bundling it with methods (the 'how'); it's solved with access modifiers.

Put simply: abstraction hides complexity, encapsulation hides data. Abstraction is achieved through encapsulation in
part,  but  you  can  think  of  abstraction  as  hiding  the  implementation  behind  an  interface,  and  encapsulation  as
protecting the object's internal state from outside interference. A driver sees an abstraction (the controls); the engine's
protected internals are encapsulation.

Q8. [Easy]  What is inheritance?
MODEL ANSWER
Inheritance is a mechanism where a new class (subclass/child/derived) acquires the properties and behaviours of an
existing class (superclass/parent/base), and can extend or override them. It models an is-a relationship (a Dog is-a
Animal) and promotes code reuse by letting common functionality live in the base class.

class Animal { void eat() { ... } }
class Dog extends Animal {   // Dog inherits eat()
    void bark() { ... }      // and adds its own behaviour
}

Dog  automatically  gets  eat()  and  adds  bark().  The  caution  interviewers  probe:  prefer  composition  over  inheritance
when the relationship isn't truly 'is-a', to avoid tight coupling.

Q9. [Medium]  What is polymorphism?
n Asked at virtually every company
MODEL ANSWER
Polymorphism ('many forms') lets the same interface or method call behave differently depending on the object it acts
on.  It  comes  in  two  forms:  compile-time  (static)  via  method  overloading,  and  runtime  (dynamic)  via  method
overriding.

The power is writing code against a base type and having it work for any subtype: a method drawing a Shape can call
shape.area()  and  the  right  Circle/Rectangle  implementation  runs.  This  makes  code  extensible  -  add  a  new  Shape
subclass and existing code works unchanged. It's the pillar most tied to flexible, maintainable design.

Q10. [Easy]  What are the main advantages of OOP?
MODEL ANSWER
Modularity  (objects  are  self-contained,  easier  to  develop  and  debug  in  isolation);  reusability  (inheritance  and
composition  reuse  code);  maintainability  (encapsulation  localises  changes,  so  internal  changes  don't  ripple  out);
extensibility (polymorphism lets you add new types without changing existing code - the Open/Closed principle); and a
closer mapping to real-world entities, which makes designs more intuitive. Together these make OOP well-suited to
large, evolving codebases.

OOP (Java)  |  SDE Fresher Question Bank

Page 5

Q11. [Easy]  What's the difference between a class, an object, and an instance?
MODEL ANSWER
A  class  is  the  blueprint/definition.  An  object  is  a  concrete  entity  created  from  that  class,  existing  in  memory.  An
instance is essentially a synonym for object - it emphasises the relationship to the class ('an instance of Car'). Subtle
distinction sometimes drawn: 'object' is the thing itself; 'instance' refers to that object as a realisation of a particular
class. For interviews, object and instance are interchangeable, and the class is the template they come from.

Q12. [Medium]  Is Java a purely object-oriented language?
MODEL ANSWER
No, Java is not purely object-oriented, mainly because of primitive types (int, char, boolean, double) which are not
objects - they exist for performance. A purely object-oriented language treats everything as an object (like Smalltalk or
Ruby). Java also has static members that can be used without an object.

Java mitigates this with wrapper classes (Integer, Character) and autoboxing, so primitives can be treated as objects
when needed, but their existence is why Java is called 'object-oriented' rather than 'pure OO.' A good, precise answer
that shows depth.

Q13. [Medium]  What are some limitations or criticisms of OOP?
MODEL ANSWER
OOP  isn't  a  silver  bullet.  It  can  introduce  overhead  and  complexity  for  small  problems  (lots  of  boilerplate  classes).
Deep inheritance hierarchies become rigid and hard to change (the fragile base class problem), which is why 'favour
composition over inheritance' is standard advice. Excessive abstraction can obscure what the code actually does. And
shared mutable state across objects makes concurrency harder. Functional programming addresses some of these
with immutability and pure functions, which is why modern code often blends paradigms.

Q14. [Easy]  What is message passing in OOP?
MODEL ANSWER
Message passing is how objects communicate - one object invokes a method on another object, optionally passing
arguments, which is conceptually 'sending it a message' asking it to perform a behaviour. The calling object doesn't
need  to  know  how  the  receiver  implements  the  behaviour  (abstraction);  it  just  sends  the  message.  In  Java  this  is
simply a method call (obj.doSomething(args)). It reinforces that objects collaborate by requesting behaviour, not by
directly manipulating each other's data.

Q15. [Medium]  Map the four pillars onto a real-world example like a car.
MODEL ANSWER
Abstraction - you operate the car through the steering wheel, accelerator, and brake without knowing the combustion
or transmission internals. Encapsulation - the engine's internal parts are sealed under the hood; you can't directly
poke the pistons, only interact via the exposed controls. Inheritance - a SportsCar and a Truck both inherit from a
general Vehicle, reusing common features like wheels and engine. Polymorphism - pressing the 'accelerate' pedal
makes  a  sports  car  and  a  truck  behave  differently,  though  the  action  (interface)  is  the  same.  Having  one  coherent
example for all four is a great way to answer.

Q16. [Easy]  What's the difference between a class and a struct (in C++)?
MODEL ANSWER
In C++ the only real difference is the default access level: members of a struct are public by default, while members
of  a  class  are  private  by  default  (this  also  applies  to  default  inheritance  access).  Functionally  they're  otherwise
identical - both can have methods, constructors, and inheritance. By convention, structs are used for simple passive
data aggregates (POD) and classes for objects with behaviour and invariants. (Note: in Java/C# structs differ more -
C# structs are value types - but the C++ public/private distinction is the classic interview answer.)

Q17. [Easy]  What are an object's state, behaviour, and identity?
MODEL ANSWER
State is the data an object holds at a moment - its field values (a car's current speed, colour, fuel). Behaviour is what
it can do - its methods (accelerate, brake). Identity is what distinguishes one object from another even if their state is
identical - in Java this is the object's reference/memory location, which is why two distinct objects with equal fields are
still '!=' unless you override equals(). State changes over time; behaviour is defined by the class; identity is fixed for
the object's lifetime.

OOP (Java)  |  SDE Fresher Question Bank

Page 6

Q18. [Medium]  Why is OOP well-suited to large, maintainable systems?
MODEL ANSWER
Because its pillars directly target the problems that make big codebases hard. Encapsulation localises change - fixing
or changing an object's internals doesn't ripple across the system as long as its interface holds. Abstraction lets teams
work against interfaces without knowing implementations, enabling parallel development. Inheritance and composition
reduce  duplication.  Polymorphism  enables  extension  without  modification  (add  new  types,  old  code  still  works).
Together they manage complexity through clear boundaries - which is exactly what large systems need.

OOP (Java)  |  SDE Fresher Question Bank

Page 7

2. Encapsulation, Access Modifiers & Abstraction

How the hiding pillars are actually implemented - access modifiers, getters/setters, and the abstract-class-vs-interface
decision. The abstract class vs interface comparison is one of the most-asked OOP questions; know it cold including the
Java 8 changes.

Q19. [Medium]  How do you achieve encapsulation in Java?
MODEL ANSWER
Make  the  fields  private  so  they  can't  be  accessed  directly  from  outside,  and  expose  public  getter/setter  (or
behaviour) methods that control access - including any validation:

class Account {
    private double balance;            // hidden state

    public double getBalance() { return balance; }

    public void deposit(double amt) {
        if (amt &gt; 0) balance += amt;   // enforce invariant
    }
}

Now no external code can set a negative balance or bypass the rules - the object protects its own invariants. That
control is the whole point of encapsulation, beyond just 'hiding' the field.

Q20. [Medium]  What are the access modifiers in Java?
n Commonly asked
MODEL ANSWER
Four  levels  of  access,  from  most  to  least  restrictive.  private  -  only  within  the  same  class.  default  (no  modifier,
'package-private') - within the same package. protected - same package plus subclasses (even in other packages).
public - accessible everywhere.

Modifier    Same    Same       Subclass   World
            class   package   (diff pkg)
private      Y        -           -         -
default      Y        Y           -         -
protected    Y        Y           Y         -
public       Y        Y           Y         Y

The principle is least privilege - expose the minimum needed. Fields are usually private; methods that form the API
are public.

Q21. [Easy]  What is the default access modifier in Java?
MODEL ANSWER
If you don't specify a modifier, the member gets default (package-private) access - it's visible to all classes in the
same  package  but  not  outside  it.  This  is  a  common  trick  question  because  people  assume  the  default  is  public  or
private; it's actually package-private. (Note: interface members are implicitly public, and that's a separate rule.)

Q22. [Medium]  Why use getters and setters instead of just making fields public?
MODEL ANSWER
Several reasons. Validation/invariants - a setter can reject invalid values (negative age), which a public field can't.
Encapsulation of representation - you can change the internal field without breaking callers, since they go through
the method. Read-only or computed properties - provide a getter with no setter, or compute the value on the fly.
Hooks - add logging, lazy loading, or change notification. So getters/setters give you control points; public fields give
away all of that. (Don't add them blindly, though - only where they earn their keep.)

Q23. [Easy]  What is data hiding?
MODEL ANSWER
Data hiding is the practice of making an object's internal data inaccessible from outside the class (typically via private
access),  so  it  can  only  be  touched  through  the  class's  own  controlled  methods.  It's  the  protective  aspect  of
encapsulation: it prevents external code from putting the object into an invalid or inconsistent state, and it decouples
callers  from  the  internal  representation.  Encapsulation  is  the  broader  concept  (bundling  +  hiding);  data  hiding
specifically refers to restricting access to the data.

OOP (Java)  |  SDE Fresher Question Bank

Page 8

Q24. [Medium]  How do you achieve abstraction in Java?
MODEL ANSWER
Through  abstract  classes  and  interfaces,  which  let  you  declare  what  operations  exist  without  specifying  how.  An
abstract class can have a mix of abstract methods (no body) and concrete methods; an interface declares a contract
that  implementing  classes  must  fulfil.  Callers  program  against  the  abstract  type  and  remain  ignorant  of  concrete
implementations - so you can swap implementations freely. Example: a Shape abstract type with an abstract area()
method, implemented differently by Circle and Rectangle.

Q25. [Medium]  What is an abstract class?
n Commonly asked
MODEL ANSWER
An abstract class is a class declared with the abstract keyword that cannot be instantiated directly and is meant to
be subclassed. It can contain a mix of abstract methods (declared without a body, which subclasses must implement)
and concrete methods with implementations, plus fields and constructors.

abstract class Shape {
    String name;                       // state
    Shape(String n) { name = n; }      // constructor
    abstract double area();            // subclass must implement
    void describe() { ... }            // shared concrete method
}

Use  it  when  subclasses  share  common  code/state  but  each  must  supply  some  behaviour  -  it's  a  partial
implementation plus a contract.

Q26. [Medium]  What is an interface?
MODEL ANSWER
An interface is a fully abstract contract that specifies a set of methods a class must implement, with no constraint on
the class's hierarchy. Traditionally all its methods were implicitly public and abstract, and its fields are implicitly public
static final (constants). A class promises to fulfil the contract with 'implements'.

interface Drawable {
    void draw();        // implicitly public abstract
}
class Circle implements Drawable {
    public void draw() { ... }
}

Interfaces enable a form of multiple inheritance (a class can implement many) and decouple 'what' from 'who' - any
unrelated classes can share a capability by implementing the same interface.

Q27. [Hard]  What's the difference between an abstract class and an interface?
n Asked at Amazon, Microsoft, Adobe - top OOP question
MODEL ANSWER
Both  provide  abstraction  but  differ  in  capability  and  intent.  An  abstract  class  can  have  state  (instance  fields),
constructors, and a mix of concrete and abstract methods, and a class can extend only one. An interface (classically)
has no instance state or constructors and only abstract methods, but a class can implement many - giving multiple
inheritance of type.

Abstract class            Interface
- can have state          - no instance state (only constants)
- can have constructors    - no constructors
- single inheritance       - multiple implementable
- concrete + abstract      - abstract (+ default methods in Java 8+)
- models 'is-a'            - models 'can-do' capability

Use an abstract class when subtypes share common state/code and form a clear is-a hierarchy; use an interface to
define a capability that unrelated classes can adopt. Java 8+ blurred the line by allowing default methods in interfaces.

OOP (Java)  |  SDE Fresher Question Bank

Page 9

Q28. [Medium]  When would you choose an abstract class over an interface, and vice versa?
MODEL ANSWER
Choose  an  abstract  class  when:  related  classes  share  common  state  and  implementation  you  want  to  reuse,  you
need constructors or non-public members, and the relationship is a true 'is-a' hierarchy. Choose an interface when:
you  want  to  define  a  capability  that  unrelated  classes  can  implement  (Comparable,  Runnable),  you  need  a  type  to
implement multiple contracts (no multiple class inheritance), or you want maximum decoupling. A common pattern is
to  provide  both  -  an  interface  for  the  contract  and  an  abstract  class  with  a  skeletal  implementation  (e.g.
List/AbstractList).

Q29. [Medium]  Can an abstract class have a constructor? Can you instantiate it?
MODEL ANSWER
An  abstract  class  can  have  a  constructor,  even  though  you  can't  instantiate  the  abstract  class  directly.  The
constructor isn't useless - it runs when a subclass object is created (the subclass constructor calls super()), initialising
the inherited state. You cannot do 'new AbstractClass()' directly; attempting to is a compile error. So: constructor yes,
direct instantiation no - the constructor exists to initialise the shared fields for subclass instances.

Q30. [Easy]  Can an abstract class have non-abstract (concrete) methods, and can it have zero abstract
methods?
MODEL ANSWER
Yes  to  both.  An  abstract  class  can  contain  fully  implemented  concrete  methods  alongside  abstract  ones  -  in  fact
sharing concrete code is a main reason to use one. It can even have zero abstract methods; marking a class abstract
simply  prevents  direct  instantiation,  which  is  sometimes  done  deliberately  (e.g.  a  base  class  you  only  ever  want
subclassed). Conversely, a class with an abstract method must be declared abstract.

Q31. [Medium]  What changed about interfaces in Java 8 and later?
n Asked at Amazon, Java-heavy roles
MODEL ANSWER
Java 8 added default methods (interface methods with a body, marked default) and static methods in interfaces.
Default  methods  let  you  add  new  methods  to  an  interface  without  breaking  all  existing  implementers  -  crucial  for
evolving APIs like the Collections framework (e.g. List.sort, Iterable.forEach).

Java  9  added  private  interface  methods  (to  share  code  between  default  methods).  This  narrowed  the  gap  with
abstract classes - interfaces can now carry behaviour - but interfaces still can't hold instance state or constructors,
which remains the key distinction. Default methods also reintroduced a mild 'diamond' issue, resolved by requiring the
class to override when two interfaces provide conflicting defaults.

Q32. [Easy]  What kind of variables can an interface have?
MODEL ANSWER
All variables declared in an interface are implicitly public, static, and final - i.e. constants. You can't have instance
fields in an interface, and you must initialise the constant at declaration. This reflects an interface's purpose: define a
contract, not hold per-object state. If you need instance state, that's a job for an abstract class.

Q33. [Medium]  What is a pure virtual function in C++, and how does it relate to abstract methods?
MODEL ANSWER
In C++, a pure virtual function is a virtual method declared with '= 0' and no implementation (virtual void area() = 0;). A
class containing at least one pure virtual function becomes an abstract class that can't be instantiated, and derived
classes must override the function to become concrete. It's exactly the C++ equivalent of Java's abstract method, and
a  class  made  entirely  of  pure  virtual  functions  is  essentially  C++'s  version  of  an  interface  (C++  has  no  separate
'interface' keyword).

Q34. [Easy]  What is the difference between data abstraction and control abstraction?
MODEL ANSWER
Data  abstraction  hides  the  internal  representation  of  data  and  exposes  only  relevant  operations  -  e.g.  a  Stack
exposes  push/pop  without  revealing  whether  it's  backed  by  an  array  or  linked  list.  Control  abstraction  hides  the
details of how a sequence of operations is carried out - e.g. calling a sort() method or using a for-each loop without
knowing  the  underlying  algorithm/iteration  mechanics.  Both  are  forms  of  abstraction;  one  hides  data  structure,  the
other hides control flow.

OOP (Java)  |  SDE Fresher Question Bank

Page 10

3. Inheritance

The diamond problem, why Java forbids multiple class inheritance, composition vs inheritance, and the super/final
mechanics are the recurring asks. Interviewers especially probe 'composition over inheritance' to test design judgement.

Q35. [Medium]  What are the types of inheritance?
MODEL ANSWER
Single - one subclass, one superclass (B extends A). Multilevel - a chain (C extends B extends A). Hierarchical -
multiple  subclasses  from  one  superclass  (B  and  C  both  extend  A).  Multiple  -  one  class  inheriting  from  multiple
superclasses (not allowed for classes in Java, allowed in C++). Hybrid - a combination of the above. Java supports
single, multilevel, and hierarchical for classes, and achieves multiple inheritance only through interfaces.

Q36. [Hard]  Why doesn't Java support multiple inheritance of classes?
n Asked at Amazon, Microsoft
MODEL ANSWER
Mainly to avoid the diamond problem and the complexity/ambiguity it brings. If a class could inherit from two classes
that both define the same method (or have the same field), the compiler couldn't unambiguously decide which to use,
and there'd be ambiguity about duplicated state from a shared ancestor.

Java's designers chose simplicity and safety: single class inheritance for implementation, and multiple inheritance of
type  via  interfaces  (which  classically  carried  no  state  or  implementation,  so  no  conflict).  C++  allows  multiple
inheritance but needs virtual inheritance to resolve the diamond, which is exactly the complexity Java avoided.

Q37. [Hard]  What is the diamond problem?
n Asked at Amazon, Microsoft, Adobe
MODEL ANSWER
The diamond problem is the ambiguity that arises in multiple inheritance when a class D inherits from two classes B
and C that both inherit from a common class A. If B and C both override a method of A, it's unclear which version D
should inherit - and A's state could be duplicated.

      A
     / \
    B   C     &lt;- both override A.foo()
     \ /
      D       &lt;- which foo() does D get?  Ambiguous.

Java sidesteps it by disallowing multiple class inheritance. With Java 8 default methods, a mild version can occur (two
interfaces  with  the  same  default  method),  and  Java  resolves  it  by  forcing  the  implementing  class  to  override  and
explicitly choose (B.super.foo()). C++ resolves it with virtual inheritance.

Q38. [Medium]  How does Java achieve multiple inheritance then?
MODEL ANSWER
Through interfaces. A class can implement any number of interfaces, inheriting multiple types (contracts) without the
diamond ambiguity, because interfaces classically had no state or method bodies to conflict. 'class C implements A, B'
is  perfectly  legal.  Since  Java  8,  interfaces  can  have  default  methods,  so  if  two  interfaces  provide  the  same  default
method, the implementing class must override it to resolve the conflict - keeping it unambiguous.

Q39. [Medium]  What's the difference between an 'is-a' and a 'has-a' relationship?
MODEL ANSWER
is-a  is  inheritance  -  a  subclass  is  a  kind  of  its  superclass  (a  Dog  is-a  Animal,  a  Car  is-a  Vehicle);  expressed  with
extends/implements. has-a is composition/aggregation - an object contains another as a part (a Car has-a Engine, a
Library  has-a  collection  of  Books);  expressed  by  holding  a  reference  as  a  field.  Use  is-a  only  when  the  subtype
genuinely is a specialised version of the base; otherwise model it as has-a. Confusing the two leads to bad hierarchies
(the classic 'a Stack is-a Vector' mistake).

OOP (Java)  |  SDE Fresher Question Bank

Page 11

Q40. [Hard]  What is 'composition over inheritance' and why is it often preferred?
n Asked at Amazon, Microsoft - design judgement
MODEL ANSWER
It's  the  design  guideline  to  prefer  building  objects  by  composing  them  from  other  objects  (has-a)  rather  than
extending  classes  (is-a),  unless  there's  a  genuine  is-a  relationship.  Inheritance  creates  tight  coupling:  a  subclass
depends on the superclass's implementation details, so base-class changes can break subclasses (the fragile base
class problem), and the hierarchy is fixed at compile time.

Composition  is  more  flexible  -  you  delegate  to  held  objects,  can  swap  them  at  runtime,  and  only  expose  what  you
choose. The classic example: instead of 'class Stack extends ArrayList' (which wrongly exposes all list methods like
get(i)), make Stack hold a private list and expose only push/pop. Inheritance for true is-a, composition for everything
else.

Q41. [Medium]  What does the super keyword do?
MODEL ANSWER
super refers to the immediate parent class. It's used three ways: super.method() to call the parent's version of an
overridden  method;  super.field  to  access  a  parent  field  hidden  by  a  subclass  field;  and  super(args)  to  invoke  the
parent's constructor (must be the first statement in the subclass constructor). It's how a subclass reuses or extends
parent behaviour rather than fully replacing it - e.g. an overriding method calling super.method() to add to, not replace,
the parent's logic.

Q42. [Medium]  What is constructor chaining, and what's the order of constructor execution in inheritance?
n Asked at Amazon, Adobe
MODEL ANSWER
Constructor chaining is the sequence of constructor calls so that an object and all its ancestors are properly initialised.
Within  a  class,  this()  calls  another  constructor  of  the  same  class;  across  the  hierarchy,  super()  calls  the  parent
constructor. Every constructor implicitly calls super() first if you don't.

Execution  order  is  top-down:  when  you  create  a  subclass  object,  the  superclass  constructor  runs  first,  then  the
subclass's - because each constructor calls super() before its own body. So for C extends B extends A, the order is A
-> B -> C. This ensures inherited fields are set up before the subclass uses them.

Q43. [Easy]  Can a subclass access the private members of its superclass?
MODEL ANSWER
No. private members are accessible only within the class that declares them, so a subclass cannot directly access a
superclass's  private  fields  or  methods  -  they're  inherited  (they  exist  in  the  object)  but  not  accessible  by  name.  To
expose  them  to  subclasses,  the  superclass  can  declare  them  protected  (accessible  to  subclasses)  or  provide
protected/public getters. This is encapsulation applying even within an inheritance hierarchy.

Q44. [Medium]  What are upcasting and downcasting?
MODEL ANSWER
Upcasting is treating a subclass object as its superclass type (Animal a = new Dog()) - always safe and implicit, and
it's  what  enables  polymorphism  (you  call  methods  through  the  base  type).  Downcasting  is  casting  a  superclass
reference back to a subclass type (Dog d = (Dog) a) - it must be explicit and is only safe if the object really is that
subclass;  otherwise  it  throws  ClassCastException  at  runtime.  You  guard  downcasts  with  instanceof.  Upcast  freely;
downcast carefully.

Q45. [Medium]  What does the final keyword do (on a variable, method, and class)?
n Commonly asked
MODEL ANSWER
final restricts modification, with a meaning per context. A final variable can be assigned only once (a constant); for an
object reference, the reference can't be reseated but the object's internals can still change. A final method cannot be
overridden by subclasses. A final class cannot be subclassed at all (String, Integer are final). It's used to lock down
behaviour for safety, design intent, or (historically) performance, and to make immutable types.

OOP (Java)  |  SDE Fresher Question Bank

Page 12

Q46. [Easy]  Are constructors inherited?
MODEL ANSWER
No, constructors are not inherited by subclasses. A subclass doesn't inherit its parent's constructors, but it must call
one of them (via super(), implicitly or explicitly) during its own construction to initialise the inherited state. If the parent
has  only  parameterised  constructors,  the  subclass  must  explicitly  call  super(args).  This  is  why  constructors  and
inheritance interact even though constructors aren't inherited per se.

Q47. [Hard]  What is method hiding, and how does it differ from overriding?
MODEL ANSWER
Method  hiding  occurs  with  static  methods:  if  a  subclass  defines  a  static  method  with  the  same  signature  as  the
parent's static method, it hides rather than overrides it. The key difference: hidden (static) methods are resolved at
compile time by the reference type, while overridden (instance) methods are resolved at runtime by the object type.

Parent p = new Child();
p.staticMethod();   // calls PARENT's (hiding, by ref type)
p.instanceMethod(); // calls CHILD's  (overriding, by object type)

So you can't truly override a static method - you can only hide it. This is a classic tricky output question.

Q48. [Easy]  What is the Object class in Java?
MODEL ANSWER
Object  is  the  root  of  the  Java  class  hierarchy  -  every  class  implicitly  extends  Object,  so  every  object  inherits  its
methods.  The  important  ones:  equals()  (logical  equality),  hashCode()  (for  hash-based  collections),  toString()  (string
representation), getClass(), clone(), and the threading methods wait()/notify(). Because everything is an Object, you
can  hold  any  reference  in  an  Object  variable,  and  overriding  equals/hashCode/toString  correctly  is  essential  for
objects used in collections.

Q49. [Medium]  What happens if a subclass constructor doesn't explicitly call super()?
MODEL ANSWER
The compiler automatically inserts a call to the parent's no-argument constructor (super()) as the first statement. This
works  fine  if  the  parent  has  a  no-arg  constructor  (explicit  or  default).  But  if  the  parent  only  has  parameterised
constructors  and  no  no-arg  one,  the  implicit  super()  call  fails  to  compile  -  so  the  subclass  must  explicitly  call
super(args). This is a common compile-error gotcha.

Q50. [Easy]  What's the difference between extends and implements?
MODEL ANSWER
extends is used for class inheritance (a class extends one class) and for one interface extending another interface - it
inherits implementation and/or type. implements is used when a class adopts one or more interfaces, promising to
provide  their  methods  -  it  inherits  type/contract  only.  A  class  can  extend  exactly  one  class  but  implement  many
interfaces: 'class C extends B implements X, Y'.

Q51. [Easy]  What is a sealed class (modern Java)?
MODEL ANSWER
A sealed class (Java 17+) restricts which classes are allowed to extend it, via 'sealed ... permits Sub1, Sub2'. Unlike
final (which forbids all subclassing) or open inheritance (which allows any), sealed gives a controlled middle ground -
you explicitly list the permitted subclasses. It's useful for modelling a fixed set of variants (like an algebraic data type)
and  lets  the  compiler  do  exhaustive  checks  in  switch  expressions.  A  good  modern-Java  answer  that  shows  you're
current.

Q52. [Easy]  Can you prevent a class from being inherited?
MODEL ANSWER
Yes  -  declare  the  class  final,  and  it  cannot  be  subclassed  (this  is  why  String  is  final).  Alternatively,  making  all
constructors private prevents subclassing from outside (subclasses couldn't call a constructor), which is also used for
singletons and utility classes. Or, in modern Java, use a sealed class to permit only specific subclasses. final is the
standard way to say 'this class is complete, don't extend it.'

OOP (Java)  |  SDE Fresher Question Bank

Page 13

4. Polymorphism: Overloading & Overriding

Overloading vs overriding is one of the most-asked OOP questions, and the static-vs-dynamic binding follow-up
separates strong candidates. Know the exact rules and the tricky cases (can you override static/private/final, overload by
return type).

Q53. [Medium]  What are the two types of polymorphism?
MODEL ANSWER
Compile-time  (static)  polymorphism  -  resolved  by  the  compiler,  achieved  through  method  overloading  (and
operator overloading in languages that support it). The decision of which method to call is made at compile time based
on  the  method  signature.  Runtime  (dynamic)  polymorphism  -  resolved  at  runtime,  achieved  through  method
overriding;  the  actual  method  that  runs  depends  on  the  object's  real  type,  decided  via  dynamic  dispatch.  Static  =
overloading, dynamic = overriding.

Q54. [Medium]  What is method overloading?
MODEL ANSWER
Method overloading is defining multiple methods in the same class with the same name but different parameter lists
(different number, types, or order of parameters). The compiler picks which one to call based on the arguments - a
compile-time decision.

int add(int a, int b)            { return a + b; }
double add(double a, double b)   { return a + b; }
int add(int a, int b, int c)     { return a + b + c; }

It improves readability (one logical operation, several input forms - like println for different types). The return type and
access modifier can differ, but the parameter list must differ - that's what distinguishes the overloads.

Q55. [Medium]  What is method overriding?
MODEL ANSWER
Method overriding is when a subclass provides its own implementation of a method already defined in its superclass,
with  the  same  signature  (name,  parameters,  and  compatible  return  type).  At  runtime,  the  JVM  calls  the  version
belonging to the object's actual type, not the reference type - this is dynamic dispatch.

class Animal { void sound() { print("..."); } }
class Dog extends Animal {
    @Override void sound() { print("Woof"); }
}
Animal a = new Dog();
a.sound();   // "Woof" - the Dog version runs

It enables runtime polymorphism - the whole point of programming to a base type. The @Override annotation asks the
compiler to verify you're actually overriding.

Q56. [Hard]  What's the difference between overloading and overriding?
n Asked at Amazon, Microsoft, Adobe - top question
MODEL ANSWER
Overloading  -  same  method  name,  different  parameters,  within  the  same  class;  resolved  at  compile  time  (static
binding) by the argument types; return type/access can vary. It's about providing variants of an operation. Overriding
- same signature, in a subclass, replacing the parent's implementation; resolved at runtime (dynamic binding) by the
object's actual type. It's about specialising inherited behaviour.

Overloading            Overriding
same class             subclass
diff parameters        same signature
compile-time           runtime
static binding         dynamic binding
many forms of input    specialised behaviour

Mnemonic:  overloading  =  same  name,  different  args,  same  class;  overriding  =  same  everything,  child  class,  new
body.

OOP (Java)  |  SDE Fresher Question Bank

Page 14

Q57. [Medium]  What are the rules for method overriding?
MODEL ANSWER
The  overriding  method  must  have  the  same  name  and  parameter  list;  the  return  type  must  be  the  same  or  a
covariant (subtype); the access modifier can't be more restrictive (you can widen, not narrow); it can't throw new or
broader checked exceptions; and the method must be inherited and overridable - you can't override final, static, or
private methods. The method being overridden must also be accessible to the subclass. Violating any of these either
fails to compile or silently becomes overloading/hiding instead.

Q58. [Easy]  Can you overload a method by changing only the return type?
MODEL ANSWER
No.  Overloading  requires  the  parameter  list  to  differ;  changing  only  the  return  type  is  not  enough  and  causes  a
compile error ('method already defined'). The reason is the compiler resolves overloaded calls by the arguments, and
a call like 'foo()' wouldn't tell it which return-type variant you meant. So the signature for overloading purposes is the
name + parameters, not the return type.

Q59. [Hard]  What's the difference between static (early) and dynamic (late) binding?
n Asked at Amazon, Microsoft
MODEL ANSWER
Static  binding  resolves  which  method  to  call  at  compile  time,  based  on  the  reference  type  -  used  for  overloaded
methods, static methods, private methods, and final methods (anything that can't be overridden). Dynamic binding
resolves  the  call  at  runtime,  based  on  the  actual  object  type  -  used  for  overridden  instance  methods,  enabling
polymorphism.

The classic illustration: with 'Animal a = new Dog()', an overridden a.sound() binds dynamically to Dog's version, but
an overloaded/static call binds statically by the declared type. Dynamic binding is what makes runtime polymorphism
work.

Q60. [Hard]  What are virtual functions and the vtable in C++?
MODEL ANSWER
In  C++,  a  virtual  function  is  one  marked  virtual,  which  enables  runtime  polymorphism  -  a  call  through  a  base
pointer/reference  invokes  the  most-derived  override.  The  mechanism  is  the  vtable  (virtual  table):  each  class  with
virtual functions has a table of pointers to its actual function implementations, and each object holds a hidden vptr to
its class's vtable. A virtual call looks up the function through the vtable at runtime - hence dynamic dispatch.

In C++ you must explicitly mark methods virtual (non-virtual methods bind statically); in Java, instance methods are
virtual by default. The vtable is the standard answer for 'how is runtime polymorphism implemented under the hood.'

Q61. [Medium]  Are Java methods virtual by default?
MODEL ANSWER
Yes.  In  Java,  all  non-static,  non-final,  non-private  instance  methods  are  virtual  by  default  -  they're  dispatched
dynamically based on the object's runtime type, so overriding 'just works' without any keyword. This is the opposite of
C++, where you must explicitly mark methods virtual. Methods that are static, final, or private are not virtual (they bind
statically), which is why they can't be overridden.

Q62. [Hard]  Can you override a static method?
MODEL ANSWER
No  -  static  methods  belong  to  the  class,  not  instances,  so  they  can't  be  overridden;  if  a  subclass  declares  a  static
method with the same signature, it hides the parent's (method hiding), not overrides it. The call is resolved at compile
time by the reference type, not dynamically by the object. So 'Parent p = new Child(); p.staticMethod();' calls Parent's
version.  This  is  one  of  the  most  common  tricky  OOP  questions  -  the  answer  is  'no,  it's  hiding,  and  it's  resolved
statically.'

Q63. [Medium]  Can you override private and final methods?
MODEL ANSWER
No  to  both.  A  private  method  isn't  visible  to  subclasses  at  all,  so  a  subclass  method  with  the  same  name  is  a
completely  independent  new  method,  not  an  override  (no  polymorphism).  A  final  method  is  explicitly  locked  -  the
compiler forbids overriding it. So if you need a method to be overridable, it must be inherited (non-private) and not
final. These rules tie directly to which methods use dynamic vs static binding.

OOP (Java)  |  SDE Fresher Question Bank

Page 15

Q64. [Medium]  What is a covariant return type?
MODEL ANSWER
Covariant  return  type  means  an  overriding  method  can  return  a  subtype  of  the  type  returned  by  the  overridden
method,  instead  of  the  exact  same  type.  For  example,  if  Animal.reproduce()  returns  Animal,  then  Dog.reproduce()
may return Dog (a subtype) when overriding. It was added in Java 5 and is useful for cleaner APIs (callers get the
more specific type without casting) - common in clone() implementations and builder patterns.

Q65. [Easy]  Does Java support operator overloading?
MODEL ANSWER
No  -  Java  deliberately  does  not  support  user-defined  operator  overloading  (unlike  C++).  The  one  exception  is  the
built-in  overloading  of  '+'  for  String  concatenation,  which  is  provided  by  the  language,  not  definable  by  you.  Java's
designers omitted it to keep code simple and unambiguous, since operator overloading can make code hard to read
(you can't tell what '+' does without checking the types). C++ and Python do allow it.

Q66. [Easy]  What does the @Override annotation do?
MODEL ANSWER
@Override  tells  the  compiler  that  the  method  is  intended  to  override  a  superclass  (or  interface)  method,  and  the
compiler  verifies  it  actually  does.  If  you  make  a  mistake  -  a  typo  in  the  name  or  a  wrong  parameter  type  -  so  that
you're  accidentally  overloading  instead  of  overriding,  the  compiler  flags  an  error  rather  than  silently  creating  a  new
method. It's optional but strongly recommended because it catches a whole class of subtle bugs at compile time.

Q67. [Medium]  What is dynamic method dispatch, with an example?
MODEL ANSWER
Dynamic method dispatch is the runtime mechanism by which a call to an overridden method is resolved based on the
actual object being referred to, not the reference type - it's how Java implements runtime polymorphism.

Shape s;
s = new Circle();    s.draw();   // Circle's draw()
s = new Square();    s.draw();   // Square's draw()
// same reference type 'Shape', different runtime behaviour

The same line s.draw() executes different code depending on what s points to at that moment. This lets you write one
piece of code (e.g. iterate a List calling draw) that automatically does the right thing for any current or future Shape
subtype.

Q68. [Medium]  What are the rules/criteria for valid method overloading?
MODEL ANSWER
Overloaded methods must share the same name but differ in their parameter list - by number of parameters, their
types,  or  their  order.  The  return  type,  access  modifier,  and  thrown  exceptions  may  differ  but  cannot  be  the  only
difference. Overloading can happen within one class or across a parent/child (an inherited method can be overloaded
by a new-signature method in the subclass). The compiler chooses the best match at compile time, applying widening,
autoboxing, and varargs in a defined priority order - which is why ambiguous overloads sometimes fail to compile.

OOP (Java)  |  SDE Fresher Question Bank

Page 16

5. Constructors, Objects & Memory

Constructor types and chaining, shallow vs deep copy, and where objects live (stack vs heap). The
shallow-vs-deep-copy question and 'can a constructor be private' come up regularly - the latter ties straight into the
Singleton pattern.

Q69. [Easy]  What is a constructor?
MODEL ANSWER
A constructor is a special method that initialises a new object - it runs automatically when you create the object with
new. It has the same name as the class, has no return type (not even void), and sets up the object's initial state. If
you don't write one, the compiler provides a default no-arg constructor.

Q70. [Medium]  What are the types of constructors?
MODEL ANSWER
Default (no-arg) constructor - takes no parameters; the compiler generates one if you write no constructors at all.
Parameterised constructor - takes arguments to initialise fields with specific values. Copy constructor - creates a
new  object  by  copying  an  existing  one  (explicit  in  C++;  in  Java  you  write  one  manually  as  it  has  no  built-in  copy
constructor). You can have multiple constructors via overloading.

Q71. [Easy]  What is constructor overloading?
MODEL ANSWER
Constructor overloading is defining multiple constructors in the same class with different parameter lists, so objects
can  be  created  in  different  ways.  For  example  a  Rectangle  with  Rectangle(),  Rectangle(int  side)  for  a  square,  and
Rectangle(int w, int h). It's just method overloading applied to constructors, and you can chain them with this(...) so
one constructor delegates to another to avoid duplicated init code.

Q72. [Medium]  When does the compiler provide a default constructor?
MODEL ANSWER
The compiler inserts a default no-argument constructor only if you don't define any constructor at all. The moment
you  write  even  one  constructor  (say  a  parameterised  one),  the  compiler  stops  providing  the  default  -  so  'new
MyClass()'  would  then  fail  unless  you  also  explicitly  declare  a  no-arg  constructor.  This  catches  people:  adding  a
parameterised constructor can break existing 'new MyClass()' calls.

Q73. [Medium]  Can a constructor be private? Why would you do that?
n Asked at Amazon, Microsoft - ties to Singleton
MODEL ANSWER
Yes, a constructor can be private. Making it private prevents other classes from instantiating the class directly with
new.  This  is  used  for:  the  Singleton  pattern  (control  creation  so  only  one  instance  exists,  exposed  via  a  static
method);  factory  methods  (force  creation  through  a  named  static  method  like  valueOf()/getInstance());  and  utility
classes  with  only  static  members  (prevent  instantiation  entirely).  So  a  private  constructor  is  about  controlling  or
forbidding object creation.

Q74. [Medium]  Can a constructor be final, static, or abstract?
MODEL ANSWER
No to all three. A constructor can't be final (it's not inherited or overridden, so final is meaningless). It can't be static
(constructors initialise instance state and run on object creation - 'static' contradicts that; static init uses a static block
instead).  It  can't  be  abstract  (constructors  must  have  a  body  to  initialise  the  object;  there's  nothing  to  leave
unimplemented). Constructors also can't be synchronized in the usual sense. So the only valid modifiers are access
modifiers (public/protected/private/default).

Q75. [Medium]  What is a copy constructor, and does Java have one?
MODEL ANSWER
A copy constructor creates a new object as a copy of an existing object of the same class. C++ provides one implicitly
(and you often define your own for deep copies). Java has no built-in copy constructor - you write one manually if
you want it:

class Point {
    int x, y;
    Point(Point p) {   // manual copy constructor

OOP (Java)  |  SDE Fresher Question Bank

Page 17

        this.x = p.x;
        this.y = p.y;
    }
}

Java  alternatives  for  copying  are  this  manual  constructor,  a  static  factory,  or  clone()  (though  clone()  is  widely
considered awkward). For deep copies of objects with nested references, the copy constructor must copy those too.

Q76. [Hard]  What's the difference between a shallow copy and a deep copy?
n Asked at Amazon, Microsoft
MODEL ANSWER
A  shallow  copy  copies  the  object's  fields  as-is:  primitive  values  are  duplicated,  but  reference  fields  copy  the
reference, not the referenced object - so both copies share the same nested objects. Mutating a nested object through
one  copy  affects  the  other.  A  deep  copy  recursively  copies  everything,  including  nested  objects,  so  the  two  are
completely independent.

// shallow: both share the same 'address' object
copy.address == original.address   // true
// deep: each has its own copy
copy.address == original.address   // false

Default clone() and a naive copy constructor do shallow copies; you must explicitly copy nested mutable objects for a
deep copy. The trade-off is correctness (independence) vs cost (deep copies are more expensive).

Q77. [Medium]  What is object cloning in Java (clone() and Cloneable)?
MODEL ANSWER
Cloning  creates  a  copy  of  an  object  via  Object.clone().  To  use  it,  a  class  must  implement  the  marker  interface
Cloneable  (otherwise  clone()  throws  CloneNotSupportedException)  and  typically  override  clone()  to  make  it  public.
By default clone() does a shallow copy, so for objects with mutable references you override it to deep-copy those.
Cloning  is  somewhat  discouraged  in  Java  (the  design  is  awkward  -  no  constructor  runs,  the  Cloneable  contract  is
weak), so many prefer copy constructors or static factory methods instead.

Q78. [Medium]  What happens in memory when you create an object with 'new'?
MODEL ANSWER
new  does  several  things:  it  allocates  memory  for  the  object  on  the  heap,  initialises  the  instance  fields  to  defaults
(0/null/false), runs the constructor (and the chain of super constructors) to set the actual initial values, and returns a
reference to the object, which is stored in your variable (the reference itself typically lives on the stack or in another
object).  So  the  object's  data  is  on  the  heap;  the  variable  holds  a  reference  to  it.  When  no  references  remain,  it
becomes eligible for garbage collection.

Q79. [Medium]  Where do objects and local variables live - stack vs heap?
MODEL ANSWER
In  Java,  objects  (everything  created  with  new)  live  on  the  heap,  which  is  shared  and  garbage-collected.  Local
variables  and  method  call  frames  live  on  the  stack  -  including  primitive  locals  and  the  object  references  (the
references point to heap objects). Each thread has its own stack; the heap is shared across threads. So 'Dog d = new
Dog()' puts the Dog object on the heap and the reference d on the stack. This split explains why local primitives vanish
after a method returns while heap objects persist until unreferenced.

Q80. [Medium]  What is the difference between this() and super() in constructors?
MODEL ANSWER
this(...)  calls  another  constructor  in  the  same  class  (constructor  chaining  to  reuse  init  logic).  super(...)  calls  a
constructor of the parent class. Both must be the first statement in a constructor, which means you can't use both in
the same constructor. If you write neither, the compiler inserts an implicit super() to the parent's no-arg constructor. So
this() goes sideways within the class, super() goes up to the parent.

OOP (Java)  |  SDE Fresher Question Bank

Page 18

Q81. [Medium]  What is the finalize() method, and how does it compare to a C++ destructor?
MODEL ANSWER
In  C++,  a  destructor  (~ClassName())  runs  deterministically  when  an  object  is  destroyed  (goes  out  of  scope  or  is
deleted),  and  it's  where  you  release  resources.  Java  has  no  destructor  because  the  garbage  collector  manages
memory;  it  historically  had  finalize(),  called  by  the  GC  before  reclaiming  an  object  -  but  it's  non-deterministic  (you
don't know when, or if, it runs), so it's unreliable for resource cleanup and is now deprecated. The modern Java way to
release resources is try-with-resources / the AutoCloseable interface, not finalize().

Q82. [Medium]  What are static and instance initializer blocks?
MODEL ANSWER
An instance initializer block ({ ... } in the class body) runs each time an object is created, just before the constructor
body, after super() - useful for init logic shared by all constructors. A static initializer block (static { ... }) runs once
when  the  class  is  first  loaded,  to  initialise  static  fields  with  logic  more  complex  than  a  single  assignment.  Order  at
class load: static blocks/fields once; then per object: instance blocks/fields, then constructor.

Q83. [Easy]  What is an anonymous object?
MODEL ANSWER
An  anonymous  object  is  one  created  without  assigning  it  to  a  reference  variable  -  it's  used  immediately  and  then
becomes  eligible  for  garbage  collection.  For  example  'new  Greeter().sayHello();'  creates  a  Greeter  just  to  call  one
method.  It's  handy  for  one-time  use  (you  don't  need  to  keep  the  object  around),  commonly  seen  when  passing  a
freshly-created object as an argument. (Distinct from an anonymous class, which is an inline class definition.)

Q84. [Medium]  What is the object lifecycle in Java?
MODEL ANSWER
Creation  -  'new'  allocates  heap  memory,  fields  get  defaults,  and  the  constructor  initialises  the  object.  In  use  -  the
object is reachable through references and its methods are called. Unreachable - when no live references point to it, it
becomes  eligible  for  garbage  collection.  Reclaimed  -  the  garbage  collector  eventually  frees  its  memory  (and
historically might have called finalize() first). Unlike C++, you never explicitly destroy objects; reachability determines
their fate.

Q85. [Easy]  Can you have a method and a constructor with the same name and parameters?
MODEL ANSWER
Technically yes - Java allows a method whose name matches the class name (since a method must have a return
type and a constructor must not, the compiler can distinguish them). But it's terrible practice and deeply confusing,
because it looks like a constructor. Interviewers ask this to check whether you know the real difference: a constructor
has no return type, a method always has one (even void). So 'void ClassName()' is a method, not a constructor.

Q86. [Medium]  What is the difference between creating an object with 'new' and other ways to create
objects?
MODEL ANSWER
new  is  the  most  common,  directly  invoking  a  constructor.  Other  ways:  factory  methods  /  static  factories
(Integer.valueOf(),  List.of())  that  may  return  cached  or  subtype  instances;  reflection  (Class.newInstance()  /
Constructor.newInstance()); cloning (clone() copies an existing object without calling a constructor); deserialization
(reconstructs an object from bytes, also bypassing the constructor); and builder patterns. Knowing that clone() and
deserialization skip the constructor is a sharp detail interviewers appreciate.

OOP (Java)  |  SDE Fresher Question Bank

Page 19

6. Java Core: Keywords, equals/hashCode, Memory

The Java-specific knowledge that backend interviewers lean on - this/static/final, the equals/hashCode contract,
immutability, String handling, pass-by-value, and garbage collection. 'Is Java pass-by-value?' and the equals/hashCode
contract are near-guaranteed.

Q87. [Easy]  What does the 'this' keyword refer to?
MODEL ANSWER
this is a reference to the current object - the instance whose method or constructor is executing. Uses: disambiguate
a  field  from  a  parameter  of  the  same  name  (this.x  =  x);  pass  the  current  object  to  another  method;  call  another
constructor  of  the  same  class  with  this(...);  and  return  the  current  object  for  method  chaining  (return  this,  as  in
builders). It's how an object refers to itself.

Q88. [Medium]  What does the static keyword mean for variables, methods, and blocks?
n Commonly asked
MODEL ANSWER
static binds a member to the class itself rather than to any instance. A static variable is shared by all instances - one
copy per class (a counter of objects created). A static method can be called without an instance (Math.max()) and
can only directly access static members - it has no 'this'. A static block runs once at class load to initialise static state.
Static members exist even if zero objects are created, which is exactly why main() is static - the JVM calls it without
creating an object.

Q89. [Easy]  Why is the main method static in Java?
MODEL ANSWER
Because  the  JVM  needs  to  call  main()  to  start  the  program  before  any  object  exists.  If  main()  were  an  instance
method, the JVM would have to create an object first - but that would need a constructor and raise the question of
which object. Making main static lets the JVM invoke it directly on the class (ClassName.main()) without instantiation.
That's the whole reason for the 'public static void main(String[] args)' signature.

Q90. [Medium]  What's the difference between == and equals() in Java?
n Asked at virtually every company
MODEL ANSWER
==  compares  references  for  objects  -  whether  two  variables  point  to  the  same  object  in  memory  (for  primitives  it
compares values). equals() compares logical equality - whether two objects are 'meaningfully equal' as defined by the
class.

String a = new String("hi");
String b = new String("hi");
a == b        // false - different objects
a.equals(b)   // true  - same content

Object's  default  equals()  actually  just  does  ==,  so  you  must  override  it  to  get  content  comparison  (String,  Integer
already do). The classic bug is using == to compare strings, which checks identity, not content.

Q91. [Hard]  What is the equals() and hashCode() contract?
n Asked at Amazon, Microsoft - must-know
MODEL ANSWER
The contract links the two: if two objects are equal by equals(), they must have the same hashCode(). (The reverse
isn't  required  -  equal  hashCodes  don't  imply  equal  objects;  that's  a  collision.)  equals()  must  also  be  reflexive,
symmetric, transitive, and consistent.

Why it matters: hash-based collections (HashMap, HashSet) first use hashCode() to find the bucket, then equals() to
find  the  item.  If  you  override  equals()  but  not  hashCode(),  two  'equal'  objects  may  land  in  different  buckets,  so
HashMap.get() fails to find a key you definitely put in - a notorious bug. Therefore: always override both together.

OOP (Java)  |  SDE Fresher Question Bank

Page 20

Q92. [Hard]  Why must you override hashCode() whenever you override equals()?
MODEL ANSWER
Because  hash-based  collections  rely  on  the  contract  that  equal  objects  have  equal  hash  codes.  If  you  override
equals() (so two distinct objects are 'equal') but leave the default hashCode() (which is based on object identity), those
two  equal  objects  will  likely  produce  different  hash  codes,  get  placed  in  different  buckets,  and  the  collection  won't
recognise them as the same key.

Concretely: you put a key in a HashMap, then look it up with an 'equal' but different object instance, and get null -
because  the  lookup  went  to  a  different  bucket.  Overriding  both  keeps  equality  and  hashing  consistent.
IDE/Lombok/Objects.hash() generate them together for this reason.

Q93. [Easy]  What does the default hashCode() return, and what is toString()?
MODEL ANSWER
The  default  Object.hashCode()  returns  a  value  derived  from  the  object's  identity  (historically  related  to  its  memory
address), so distinct objects usually get distinct hash codes regardless of content - which is why you override it for
value-based  equality.
is
'ClassName@hexHashCode', which is rarely useful, so you override it to print meaningful content (used implicitly in
logging, string concatenation, and debugging).

representation  of

the  default

the  object;

returns  a

toString()

string

Q94. [Hard]  What is immutability, and how do you make a class immutable in Java?
n Asked at Amazon, Microsoft
MODEL ANSWER
An immutable object's state cannot change after construction - every 'modification' returns a new object (String is the
canonical example). To make a class immutable: (1) make the class final (no subclass can add mutability); (2) make
all fields private final; (3) set fields only in the constructor (no setters); (4) for mutable reference fields, defensively
copy them in and out (return copies, not the internal reference).

Benefits:  immutable  objects  are  inherently  thread-safe  (no  synchronization  needed),  safe  to  share  and  cache,  and
usable  as  HashMap  keys  without  surprises.  The  cost  is  creating  new  objects  for  changes.  Immutability  is  a  major
theme in concurrent and functional-leaning design.

Q95. [Medium]  Why is String immutable in Java?
n Commonly asked
MODEL ANSWER
Several reasons. String pool - immutability lets the JVM safely share/intern string literals (many references to one
object) without one change affecting others. Security - strings are used for file paths, URLs, credentials, and class
names; if mutable, a value could be changed after a security check. Thread safety - immutable strings can be shared
across  threads  freely.  Hashing  -  String's  hashCode  is  cached  and  reliable  for  use  as  HashMap  keys  because  the
content can't change. To build strings efficiently, you use the mutable StringBuilder instead.

Q96. [Medium]  What's the difference between String, StringBuilder, and StringBuffer?
MODEL ANSWER
String  is  immutable  -  every  concatenation  creates  a  new  object,  so  building  a  string  in  a  loop  with  +  is  wasteful
(O(n^2)). StringBuilder is mutable - you modify the same underlying buffer, making repeated appends efficient; it's
not thread-safe. StringBuffer is the older, thread-safe (synchronised) mutable version, which makes it slower. So:
String  for  fixed  text,  StringBuilder  for  building  strings  in  single-threaded  code  (the  usual  choice),  StringBuffer  only
when you need thread safety on the buffer itself.

Q97. [Medium]  What is the String constant pool?
MODEL ANSWER
The String pool (string intern pool) is a special area where the JVM stores unique string literals. When you write a
literal like "hello", the JVM checks the pool: if an identical string exists, it reuses that reference instead of creating a
new object - saving memory. This is why two string literals with the same content are == (same pooled object), but
'new  String("hello")'  forces  a  separate  heap  object  (not  pooled  unless  you  call  intern()).  It  works  precisely  because
strings are immutable, so sharing is safe.

OOP (Java)  |  SDE Fresher Question Bank

Page 21

Q98. [Hard]  Is Java pass-by-value or pass-by-reference?
n Asked at Amazon, Microsoft - classic trick question
MODEL ANSWER
Java is always pass-by-value - but the nuance is what the 'value' is. For primitives, the value copied is the primitive
itself. For objects, the value copied is the reference (which points to the object), not the object itself.

So inside a method you can mutate the object the reference points to (changes are visible to the caller), but if you
reassign the parameter to a new object, the caller's reference is unaffected - because you only changed the copy of
the reference. That distinction (you can change the object's contents but not repoint the caller's variable) is the whole
answer. Java has no true pass-by-reference like C++'s '&'.

Q99. [Medium]  What are wrapper classes and autoboxing?
MODEL ANSWER
Wrapper  classes  (Integer,  Double,  Character,  Boolean,  ...)  are  object  representations  of  the  primitive  types,  so
primitives  can  be  used  where  objects  are  required  -  e.g.  in  generic  collections  like  List  (you  can't  have  List).
Autoboxing is the automatic conversion of a primitive to its wrapper (int -> Integer), and unboxing the reverse, done
implicitly  by  the  compiler.  Watch-outs:  unboxing  a  null  Integer  throws  NullPointerException,  and  ==  on  two  Integer
objects compares references (with a cached range -128..127 causing surprising results).

Q100. [Medium]  What is garbage collection and how does it work at a high level?
n Commonly asked
MODEL ANSWER
Garbage collection is the JVM automatically reclaiming memory of objects that are no longer reachable from any live
reference, so you don't manually free memory (no delete like C++). The core idea is reachability: starting from 'GC
roots' (stack variables, static fields), the GC traces all reachable objects; anything not reached is garbage and can be
collected.

Modern  JVMs  use  generational  collection  -  most  objects  die  young,  so  the  heap  is  split  into  young  and  old
generations, collecting the young one frequently and cheaply. The benefit is no manual memory management and no
dangling pointers; the cost is occasional GC pauses and less control over timing.

Q101. [Medium]  Can you force garbage collection, and what causes memory leaks in Java?
MODEL ANSWER
You can request GC with System.gc(), but you can't force it - the JVM may ignore the hint and decides when to run,
so relying on it is bad practice.

And  yes,  Java  can  still  have  memory  leaks  -  not  from  forgetting  to  free,  but  from  unintentionally  keeping  objects
reachable  so  the  GC  can't  collect  them.  Classic  causes:  objects  lingering  in  a  long-lived  static  collection  or  cache
that's  never  cleared,  unremoved  listeners/callbacks,  and  unclosed  resources.  The  fix  is  removing  references  when
done (or using weak references for caches).

Q102. [Medium]  What's the difference between final, finally, and finalize?
n Commonly asked
MODEL ANSWER
They're unrelated despite the similar names. final is a keyword/modifier - a final variable is constant, a final method
can't  be  overridden,  a  final  class  can't  be  subclassed.  finally  is  a  block  in  try-catch-finally  that  always  executes
(whether  or  not  an  exception  is  thrown),  used  for  cleanup  like  closing  resources.  finalize()  is  a  (now-deprecated)
Object method the GC could call before reclaiming an object. So: final = modifier, finally = exception-handling block,
finalize = GC callback method.

Q103. [Medium]  What do the transient and volatile keywords do?
MODEL ANSWER
transient marks a field to be skipped during serialization - useful for sensitive data (passwords) or values you can
recompute, so they aren't written to the serialized byte stream. volatile is a concurrency keyword: it guarantees that
reads/writes  of  the  field  go  directly  to  main  memory  (visibility  across  threads)  and  aren't  cached  per-thread  or
reordered  -  but  it  does  not  make  compound  operations  atomic  (volatile  count++  is  still  racy).  So  transient  is  about
serialization, volatile is about thread visibility.

OOP (Java)  |  SDE Fresher Question Bank

Page 22

Q104. [Medium]  What is serialization?
MODEL ANSWER
Serialization is converting an object into a byte stream (so it can be saved to disk, sent over a network, or cached),
and deserialization is reconstructing the object from those bytes. In Java, a class opts in by implementing the marker
interface  Serializable.  Notes:  a  serialVersionUID  controls  version  compatibility;  transient  fields  are  excluded;  and
deserialization bypasses the constructor, which has security implications (untrusted serialized data is a known attack
vector). Modern systems often prefer JSON/Protobuf over Java's native serialization.

OOP (Java)  |  SDE Fresher Question Bank

Page 23

7. SOLID Principles & Design Quality

SOLID is where interviews test design judgement, not memorisation - so explain why each principle matters and give an
example. The LSP rectangle/square violation and Dependency Inversion (via dependency injection) are the deep
follow-ups.

Q105. [Medium]  What are the SOLID principles?
n Asked at Amazon, Microsoft, Adobe - LLD rounds
MODEL ANSWER
Five object-oriented design principles for maintainable, extensible code. S - Single Responsibility (a class should have
one  reason  to  change).  O  -  Open/Closed  (open  for  extension,  closed  for  modification).  L  -  Liskov  Substitution
(subtypes  must  be  substitutable  for  their  base  type).  I  -  Interface  Segregation  (many  small  interfaces  beat  one  fat
one). D - Dependency Inversion (depend on abstractions, not concretions).

Together  they  reduce  coupling,  increase  cohesion,  and  make  code  easier  to  change  without  breaking  things  -  the
foundation of good LLD.

Q106. [Medium]  Explain the Single Responsibility Principle with an example.
MODEL ANSWER
A class should have only one reason to change - i.e. one responsibility. If a class does multiple unrelated things, a
change to one concern risks breaking the others, and the class becomes hard to test and reuse.

Example: a User class that holds user data and also handles database persistence and formats reports violates SRP -
three reasons to change. Split it: User (data), UserRepository (persistence), UserReportFormatter (formatting). Each
now  has  one  job,  so  a  DB  change  touches  only  the  repository.  SRP  drives  the  natural  decomposition  in
machine-coding rounds.

Q107. [Medium]  Explain the Open/Closed Principle with an example.
MODEL ANSWER
Software  entities  should  be  open  for  extension  but  closed  for  modification  -  you  should  be  able  to  add  new
behaviour without changing existing, tested code. You achieve it with abstraction and polymorphism.

// BAD: must edit this method for every new shape
double area(Shape s) {
    if (s.type == CIRCLE) ...
    else if (s.type == SQUARE) ...
}

// GOOD: add a new Shape subclass, no edits here
interface Shape { double area(); }
class Circle implements Shape { public double area(){...} }

With the polymorphic version, supporting a Triangle means adding a class, not editing the area logic - so existing code
stays  untouched  (and  unbroken).  OCP  is  essentially  'program  to  interfaces  so  you  extend  by  adding  code,  not
changing it.'

Q108. [Hard]  Explain the Liskov Substitution Principle, and give a classic violation.
n Asked at Amazon, Microsoft
MODEL ANSWER
LSP says objects of a subclass must be substitutable for their base class without breaking correctness - a subtype
must honour the behavioural contract of its base, not just its method signatures.

The classic violation is Rectangle/Square: it seems natural that Square extends Rectangle, but a Rectangle lets you
set  width  and  height  independently,  while  a  Square  must  keep  them  equal.  Code  that  does  'rect.setWidth(5);
rect.setHeight(4);  assert  area==20'  breaks  when  rect  is  actually  a  Square  (setting  height  also  changes  width).  The
Square isn't truly substitutable, so the inheritance is wrong - model them separately or via a common Shape interface.
LSP exposes 'is-a' relationships that look right but aren't.

OOP (Java)  |  SDE Fresher Question Bank

Page 24

Q109. [Medium]  Explain the Interface Segregation Principle.
MODEL ANSWER
Clients should not be forced to depend on methods they don't use - prefer many small, focused interfaces over one
large  'fat'  interface.  If  an  interface  has  too  many  methods,  implementers  are  forced  to  provide  (often  empty  or
throwing) implementations for methods irrelevant to them.

Classic example: a fat Worker interface with work() and eat(). A RobotWorker can work() but has no meaningful eat() -
forcing it to implement eat() is a smell. Split into Workable and Eatable interfaces so each class implements only what
applies. ISP keeps interfaces cohesive and avoids leaking unrelated responsibilities onto implementers.

Q110. [Hard]  Explain the Dependency Inversion Principle.
n Asked at Amazon, Microsoft
MODEL ANSWER
High-level modules should not depend on low-level modules; both should depend on abstractions. And abstractions
shouldn't depend on details - details should depend on abstractions. In practice: depend on interfaces, not concrete
classes.

// BAD: high-level class hard-wired to a concrete dependency
class OrderService {
    MySQLDatabase db = new MySQLDatabase();   // tightly coupled
}

// GOOD: depends on an abstraction, injected
class OrderService {
    Database db;
    OrderService(Database db) { this.db = db; }
}

Now  OrderService  works  with  any  Database  implementation  (MySQL,  Postgres,  a  mock  for  tests)  -  you  'invert'  the
dependency by introducing an interface. This is what makes code testable and swappable, and it's realised through
dependency injection.

Q111. [Medium]  Why do the SOLID principles matter in practice?
MODEL ANSWER
Because they make code easier to change, test, and extend - which is most of a software engineer's job after the first
version  ships.  SRP  and  ISP  keep  components  focused  and  independently  changeable;  OCP  lets  you  add  features
without  risking  existing  behaviour;  LSP  keeps  inheritance  hierarchies  sound;  DIP  decouples  modules  so  you  can
swap implementations and mock dependencies in tests. The net effect is lower coupling, higher cohesion, and fewer
ripple-effect bugs. The caveat: don't over-apply them and over-engineer a simple problem.

Q112. [Medium]  What is dependency injection, and how does it relate to DIP?
n Asked at backend roles
MODEL ANSWER
Dependency injection (DI) is a technique where an object's dependencies are provided from outside (passed in via
constructor, setter, or a framework) rather than the object creating them itself with new. It's the practical mechanism
that  achieves  the  Dependency  Inversion  Principle  -  the  class  depends  on  an  abstraction  and  receives  a  concrete
implementation externally.

Benefits: loose coupling (swap implementations without touching the class), and testability (inject mocks/fakes in unit
tests). Frameworks like Spring automate it (an IoC container wires dependencies). DI is DIP put into action.

Q113. [Medium]  What's the difference between tight and loose coupling?
MODEL ANSWER
Coupling measures how dependent modules are on each other. Tight coupling - classes know and depend on each
other's concrete details, so a change in one forces changes in others; hard to test, reuse, or modify. Loose coupling -
classes interact through abstractions/interfaces and know as little as possible about each other, so they can change
independently. Good design aims for loose coupling (via interfaces, DI, events) - it's what makes a system flexible.
SOLID principles largely exist to reduce coupling.

OOP (Java)  |  SDE Fresher Question Bank

Page 25

Q114. [Medium]  What is cohesion, and why do we want high cohesion?
MODEL ANSWER
Cohesion  measures  how  focused  and  related  the  responsibilities  within  a  single  module/class  are.  High  cohesion
means  a  class's  elements  all  work  toward  one  well-defined  purpose  (a  good  thing);  low  cohesion  means  it  does
many unrelated things (a 'god class'). We want high cohesion because such classes are easier to understand, test,
reuse, and maintain - and changes are localised. The guiding mantra is 'high cohesion, low coupling': each class does
one thing well, and depends loosely on others. High cohesion is basically SRP at work.

Q115. [Easy]  What is the DRY principle?
MODEL ANSWER
DRY  -  'Don't  Repeat  Yourself'  -  says  every  piece  of  knowledge  or  logic  should  have  a  single,  authoritative
representation in the codebase. Duplicated logic means a change must be made in multiple places, and missing one
causes bugs and inconsistency. You apply DRY by extracting repeated code into methods, classes, or constants. The
counterbalance:  don't  force  unrelated  code  together  just  because  it  looks  similar  (premature  abstraction)  -  DRY  is
about removing duplication of knowledge, not coincidental similarity.

Q116. [Easy]  What are the KISS and YAGNI principles?
MODEL ANSWER
KISS ('Keep It Simple, Stupid') - prefer the simplest solution that works; unnecessary complexity makes code harder
to understand and maintain. YAGNI ('You Aren't Gonna Need It') - don't build features or flexibility you only think you'll
need  later;  implement  things  when  they're  actually  required.  Both  push  back  against  over-engineering  -  a  useful
counterweight to SOLID/patterns, since you can hurt a codebase by adding abstraction for hypothetical futures. Good
engineers balance structure with simplicity.

Q117. [Easy]  What is a code smell? Give examples.
MODEL ANSWER
A code smell is a surface symptom in code that usually indicates a deeper design problem - it's not a bug, but a sign
that refactoring may be needed. Examples: a God class (does too much - violates SRP), long methods, duplicated
code  (violates  DRY),  long  parameter  lists,  feature  envy  (a  method  more  interested  in  another  class's  data),  and
excessive if/switch on type (often a missed chance for polymorphism). Recognising smells and naming the principle
they violate is exactly what code-review and LLD interviews look for.

Q118. [Medium]  How is the Open/Closed Principle typically implemented?
MODEL ANSWER
Through abstraction and polymorphism - define an interface or abstract base for the varying behaviour, and add
new  variations  as  new  implementations  rather  than  editing  existing  code.  The  Strategy  pattern  is  the  canonical
realisation: a payment processor depends on a PaymentMethod interface, and you support a new method by adding a
class, not by modifying the processor. Replacing long if/else or switch-on-type chains with polymorphic dispatch is the
everyday way OCP shows up.

Q119. [Medium]  You see a class with a giant switch on an object's 'type' field. What's wrong and how do
you fix it?
MODEL ANSWER
A big switch/if-else on a type field is a code smell that usually violates the Open/Closed Principle (and often SRP):
every new type forces you to edit and re-test that method, and the same switch tends to get duplicated across the
codebase.

The  fix  is  to  replace  conditional  with  polymorphism:  turn  each  type  into  a  subclass/strategy  implementing  a
common interface, and let dynamic dispatch pick the behaviour. Then adding a new type means writing a new class,
with no edits to existing code. Spotting this refactor is a high-signal answer in code-review/LLD rounds.

OOP (Java)  |  SDE Fresher Question Bank

Page 26

Q120. [Medium]  What is the Law of Demeter (principle of least knowledge)?
MODEL ANSWER
The  Law  of  Demeter  says  an  object  should  only  talk  to  its  immediate  friends,  not  reach  through  them  to  distant
objects  -  'don't  talk  to  strangers.'  Practically,  avoid  long  chains  like  a.getB().getC().doSomething()  (a  'train  wreck'),
because  they  couple  your  code  to  the  internal  structure  of  B  and  C;  if  that  structure  changes,  your  code  breaks.
Instead, ask the immediate object to do the work (a.doSomething()). It promotes loose coupling and encapsulation by
limiting how much one object knows about others' internals.

OOP (Java)  |  SDE Fresher Question Bank

Page 27

8. Design Patterns: Creational

Patterns are proven solutions to recurring design problems and a staple of LLD rounds. Singleton (thread-safe) and
Factory are the most-asked; be able to code a thread-safe Singleton and explain when each creational pattern applies.

Q121. [Easy]  What is a design pattern, and what are the three categories?
MODEL ANSWER
A design pattern is a general, reusable solution to a commonly recurring problem in software design - not code you
copy,  but  a  proven  template  for  how  to  structure  classes  and  objects.  The  Gang  of  Four  classified  them  into  three
categories:  Creational  (object  creation  -  Singleton,  Factory,  Builder,  Prototype,  Abstract  Factory),  Structural
(object
(composing  classes/objects
interaction/responsibility  -  Observer,  Strategy,  State,  Command,  Template  Method).  They  give  engineers  a  shared
vocabulary.

-  Adapter,  Decorator,  Facade,  Proxy,  Composite),  and  Behavioral

Q122. [Hard]  What is the Singleton pattern, and how do you make it thread-safe?
n Asked at Amazon, Microsoft, Adobe - the #1 pattern question
MODEL ANSWER
Singleton  ensures  a  class  has  exactly  one  instance  and  provides  a  global  access  point  to  it  -  used  for  shared
resources  like  a  configuration,  logger,  or  connection  pool.  You  make  the  constructor  private  and  expose  a  static
getInstance().

class Singleton {
    private static volatile Singleton instance;
    private Singleton() {}

    static Singleton getInstance() {
        if (instance == null) {               // 1st check
            synchronized (Singleton.class) {
                if (instance == null)          // 2nd check
                    instance = new Singleton();
            }
        }
        return instance;
    }
}

This  is  double-checked  locking:  the  outer  check  avoids  locking  once  initialised  (fast),  the  lock  guards  the  first
creation,  and  the  inner  check  prevents  two  threads  both  creating  it.  volatile  is  essential  to  prevent  a
partially-constructed object being seen due to instruction reordering.

Q123. [Hard]  What are the ways to initialise a Singleton (eager, lazy, holder, enum)?
MODEL ANSWER
Eager - create the instance at class load ('static final Singleton instance = new Singleton()'); simple and thread-safe,
but  built  even  if  never  used.  Lazy  with  double-checked  locking  -  created  on  first  use,  thread-safe  with  volatile
(above). Bill Pugh holder idiom - a static inner holder class creates the instance on first access; lazy, thread-safe,
and  lock-free  (relies  on  class-loading  guarantees).  Enum  singleton  -  'enum  Singleton  {  INSTANCE;  }'  -  Joshua
Bloch's  recommended  approach:  concise,  thread-safe  by  the  JVM,  and  safe  against  reflection  and  serialization
attacks. Enum or the holder idiom are the preferred modern choices.

Q124. [Medium]  What are the drawbacks of the Singleton pattern?
MODEL ANSWER
It's often considered an anti-pattern when overused. Problems: it introduces global state (hidden dependencies, hard
to  reason  about),  makes  unit  testing  hard  (you  can't  easily  substitute  a  mock,  and  state  leaks  between  tests),
creates  tight  coupling  (classes  reach  for  Singleton.getInstance()  directly  instead  of  receiving  a  dependency),  and
can  cause  concurrency  issues  if  implemented  carelessly.  Modern  practice  often  replaces  Singletons  with
dependency  injection  -  a  single  instance  managed  by  the  DI  container  and  injected  where  needed  -  getting  'one
instance' without the global-state downsides.

OOP (Java)  |  SDE Fresher Question Bank

Page 28

Q125. [Medium]  What is the Factory Method pattern?
n Asked at Amazon, Microsoft
MODEL ANSWER
The Factory Method pattern defines an interface/method for creating objects but lets the specific class to instantiate
be decided by subclasses or logic, so the client code doesn't depend on concrete classes. It centralises and abstracts
object creation.

Shape createShape(String type) {
    switch (type) {
        case "circle": return new Circle();
        case "square": return new Square();
        default: throw new IllegalArgumentException();
    }
}

The caller asks the factory for a Shape and gets the right subtype without using new on a concrete class - so adding a
new  shape  changes  only  the  factory,  not  every  caller.  It's  a  direct  application  of  'program  to  an  interface'  and  the
Dependency Inversion principle.

Q126. [Medium]  What is the Abstract Factory pattern, and how does it differ from Factory Method?
MODEL ANSWER
Abstract  Factory  provides  an  interface  for  creating  families  of  related  objects  without  specifying  their  concrete
classes. The classic example is a cross-platform UI: a WindowsFactory creates WindowsButton + WindowsCheckbox,
a  MacFactory  creates  MacButton  +  MacCheckbox  -  and  client  code  uses  the  abstract  factory  so  the  whole  family
stays consistent.

Difference: Factory Method creates one product via a method (often using inheritance/subclassing), while Abstract
Factory creates multiple related products via an object that groups several factory methods (composition of factories).
Abstract Factory is 'a factory of factories' ensuring a coherent product family.

Q127. [Medium]  What is the Builder pattern, and when should you use it?
n Asked at Amazon, Microsoft
MODEL ANSWER
The  Builder  pattern  constructs  a  complex  object  step  by  step,  separating  construction  from  representation  -  useful
when an object has many optional parameters or requires controlled, multi-step assembly. It avoids the 'telescoping
constructor' anti-pattern (many overloaded constructors with different parameter combinations).

Pizza p = new Pizza.Builder()
        .size("large")
        .cheese(true)
        .topping("mushroom")
        .build();

Use it when a constructor would have lots of parameters (especially optional ones), or you want immutable objects
with  readable  construction.  The  fluent  chaining  is  self-documenting  and  you  can  validate  in  build().  Java's
StringBuilder and many SDK clients use it.

Q128. [Medium]  What is the Prototype pattern?
MODEL ANSWER
The Prototype pattern creates new objects by cloning an existing instance (a prototype) rather than instantiating from
scratch. It's useful when object creation is expensive (heavy initialisation, database/network setup) or when you want
to  produce  copies  configured  like  an  existing  object.  In  Java  it's  typically  implemented  via  the  clone()/Cloneable
mechanism (with attention to deep vs shallow copy). So instead of 'new ExpensiveObject()' with full setup, you clone a
pre-built prototype and tweak it.

Q129. [Easy]  What problem do creational patterns solve in general?
MODEL ANSWER
They abstract and centralise the object creation process, so client code isn't tightly coupled to concrete classes or to
the details of how objects are built. Instead of scattering 'new ConcreteClass()' everywhere (which is rigid and hard to
change), creational patterns let you control what gets created, when, and how - making the system more flexible and
easier to extend with new types. They embody 'program to an interface, not an implementation' for the creation step.

OOP (Java)  |  SDE Fresher Question Bank

Page 29

Q130. [Easy]  What is the Object Pool pattern?
MODEL ANSWER
The Object Pool pattern reuses a set of pre-initialised, expensive-to-create objects instead of creating and destroying
them repeatedly. Clients borrow an object from the pool, use it, and return it for reuse. It's ideal for costly resources
like  database  connections  (connection  pools),  threads  (thread  pools),  or  network  sockets  -  reuse  cuts  the  creation
overhead and bounds resource usage. The trade-off is managing the pool (sizing, returning objects, resetting state
between uses).

Q131. [Medium]  Why is an enum the preferred way to implement a Singleton in Java?
MODEL ANSWER
Because  'enum  Singleton  {  INSTANCE;  }'  gives  you  a  guaranteed  single  instance  with  the  least  code  and  the
strongest guarantees. The JVM ensures enum constants are instantiated exactly once and in a thread-safe way (no
locking  code  needed),  and  -  crucially  -  enums  are  immune  to  the  two  classic  Singleton  attacks:  reflection  (you
can't reflectively construct an enum) and serialization (enum serialization is handled specially, so deserialization can't
create  a  second  instance).  Joshua  Bloch  recommends  it  in  Effective  Java  for  exactly  these  reasons.  The  minor
downside is less flexibility (can't extend a class).

Q132. [Medium]  How does a Factory relate to the Dependency Inversion and Open/Closed principles?
MODEL ANSWER
A  factory  lets  client  code  depend  on  an  abstraction  (the  product  interface)  and  obtain  instances  without  naming
concrete classes - that's Dependency Inversion in action (you don't 'new' a concrete type, you ask the factory). It also
supports  Open/Closed:  when  you  add  a  new  product  type,  you  extend  the  factory  (or  register  the  new  type)  rather
than editing every place that creates objects. So factories are a common, concrete way these principles show up in
real designs - which is why interviewers link patterns back to SOLID.

OOP (Java)  |  SDE Fresher Question Bank

Page 30

9. Design Patterns: Structural & Behavioral

Observer, Strategy, and Decorator are the most-asked here, and 'Strategy vs State' is a favourite distinction. For each,
know the problem it solves and a one-line real example - and be ready to apply them in an LLD round.

Q133. [Medium]  What is the Adapter pattern?
n Asked at LLD rounds
MODEL ANSWER
The  Adapter  pattern  lets  two  incompatible  interfaces  work  together  by  wrapping  one  object  in  an  adapter  that
translates its interface into the one the client expects - like a physical power-plug adapter. You use it to integrate a
legacy or third-party class whose interface you can't change into your codebase.

Example: your app expects a MediaPlayer interface, but you have a third-party AdvancedAudioLib with a different API
-  you  write  an  AudioAdapter  that  implements  MediaPlayer  and  internally  calls  the  lib.  The  client  codes  against
MediaPlayer, oblivious to the adaptation.

Q134. [Medium]  What is the Decorator pattern, and how is it better than subclassing?
n Asked at Amazon, Microsoft - the coffee example
MODEL ANSWER
The  Decorator  pattern  dynamically  adds  behaviour  to  an  object  by  wrapping  it  in  decorator  objects  that  share  the
same interface - so you compose behaviour at runtime instead of via a fixed class hierarchy.

Coffee c = new Milk(new Sugar(new SimpleCoffee()));
c.cost();   // base + sugar + milk, composed at runtime

It  beats  subclassing  because  covering  every  combination  by
(CoffeeWithMilk,
CoffeeWithMilkAndSugar,  ...).  Decorators  let  you  stack  features  in  any  combination  and  order  without  a  class  per
combination - a direct application of 'composition over inheritance' and the Open/Closed principle. Java's I/O streams
(BufferedReader wrapping FileReader) are the canonical real example.

inheritance  explodes

Q135. [Easy]  What is the Facade pattern?
MODEL ANSWER
The Facade pattern provides a single simplified interface to a complex subsystem, hiding its internal complexity from
clients. Instead of the client coordinating many subsystem classes, it calls one facade method that orchestrates them.
Example:  a  'placeOrder()'  facade  that  internally  handles  inventory,  payment,  and  shipping  subsystems.  It  reduces
coupling  (clients  depend  only  on  the  facade)  and  makes  the  subsystem  easier  to  use  -  though  it  doesn't  prevent
advanced clients from using the subsystem directly if needed.

Q136. [Medium]  What is the Proxy pattern?
MODEL ANSWER
The Proxy pattern provides a placeholder/surrogate for another object to control access to it - the proxy implements
the same interface and forwards calls to the real object, adding behaviour around them. Common kinds: virtual proxy
(lazy-load an expensive object on first use), protection proxy (access control/permissions), remote proxy (represent
an object in another address space, e.g. RPC stubs), and caching proxy. Example: an image viewer using a proxy
that loads the heavy image only when it actually needs to be displayed.

Q137. [Medium]  What is the Composite pattern?
MODEL ANSWER
The  Composite  pattern  lets  you  treat  individual  objects  and  compositions  of  objects  uniformly  through  a  common
interface - it models part-whole tree structures. A 'leaf' and a 'composite' (which contains children) both implement the
same interface, so client code can call operations on either without checking which it is. The classic example is a file
system: a File (leaf) and a Folder (composite of files/folders) both support getSize(), and a folder's size recursively
sums its children. UI component trees and org charts are other examples.

OOP (Java)  |  SDE Fresher Question Bank

Page 31

Q138. [Medium]  What is the Flyweight pattern?
MODEL ANSWER
The Flyweight pattern minimises memory by sharing common state across many similar objects instead of storing it
in  each.  It  splits  an  object's  state  into  intrinsic  (shared,  immutable  -  stored  once  in  the  flyweight)  and  extrinsic
(context-specific - passed in by the client). The classic example is a text editor with millions of character objects: the
glyph's  font/shape  (intrinsic)  is  shared,  while  its  position  (extrinsic)  is  supplied  per  use.  Java's  Integer  cache
(-128..127) is a flyweight. It's used when you have a huge number of objects with lots of shareable state.

Q139. [Medium]  What is the Observer pattern?
n Asked at Amazon, Microsoft - very common
MODEL ANSWER
The  Observer  pattern  defines  a  one-to-many  dependency:  when  one  object  (the  subject)  changes  state,  all  its
registered  observers  are  automatically  notified  and  updated.  The  subject  keeps  a  list  of  observers  and  calls  their
update() method on change, without knowing their concrete types.

It's the basis of event-driven and publish-subscribe systems: UI event listeners, model-view updates, and notification
systems (a YouTube channel notifying all subscribers of a new video). It promotes loose coupling - the subject and
observers  interact  through  an  interface,  so  you  can  add/remove  observers  freely.  Java's  listener  APIs  and  reactive
streams are real-world instances.

Q140. [Medium]  What is the Strategy pattern?
n Asked at Amazon, Microsoft - very common
MODEL ANSWER
The Strategy pattern defines a family of interchangeable algorithms, encapsulates each behind a common interface,
and lets the client select/swap them at runtime - so the algorithm varies independently of the code that uses it.

interface PaymentStrategy { void pay(int amount); }
class CreditCard implements PaymentStrategy {...}
class UpiPayment implements PaymentStrategy {...}

cart.setPaymentStrategy(new UpiPayment());   // chosen at runtime
cart.checkout();

It  replaces  big  if/else  or  switch  chains  over  a  'type'  with  polymorphic  objects,  directly  serving  the  Open/Closed
principle (add a new strategy class, don't edit existing code). Sorting with a custom Comparator is a Strategy in the
JDK.

Q141. [Hard]  What's the difference between the Strategy and State patterns?
n Asked at Amazon, Microsoft - the favourite comparison
MODEL ANSWER
Structurally they look almost identical (an object delegating to a swappable interface), but the intent differs. Strategy
is about choosing one of several interchangeable algorithms - the strategies are independent, and usually the client
picks which one. State is about an object behaving differently based on its internal state, where the states are aware
of each other and transition between themselves (the object changes its own state).

So: Strategy = 'do the same task a different way, chosen externally'; State = 'behave differently as I move through a
lifecycle,  with  states  driving  transitions.'  A  vending  machine  (idle  ->  hasMoney  ->  dispensing)  is  State;  a  sort  with
different comparators is Strategy.

Q142. [Medium]  What is the State pattern?
MODEL ANSWER
The State pattern lets an object alter its behaviour when its internal state changes, so it appears to change its class.
Each state is a separate class implementing a common interface, and the context delegates behaviour to its current
state object, which can also trigger transitions to other states. It replaces sprawling conditionals on a 'state' variable.
Classic  examples:  a  vending  machine  (NoCoin,  HasCoin,  Dispensing),  an  ATM,  or  a  traffic  light  -  each  state
encapsulates its own behaviour and the rules for moving to the next state.

OOP (Java)  |  SDE Fresher Question Bank

Page 32

Q143. [Medium]  What is the Command pattern?
MODEL ANSWER
The Command pattern encapsulates a request as an object, containing the action and its parameters - decoupling the
object  that  invokes  the  operation  from  the  one  that  performs  it.  This  lets  you  parameterise  objects  with  operations,
queue  or  log  requests,  and  support  undo/redo  (each  command  knows  how  to  reverse  itself).  Examples:  GUI
buttons/menu items each holding a Command, a task queue of command objects, or text-editor operations with undo.
It turns 'method calls' into first-class, storable objects.

Q144. [Medium]  What is the Template Method pattern?
MODEL ANSWER
The Template Method pattern defines the skeleton of an algorithm in a base class method, deferring some steps to
subclasses  via  abstract  (or  overridable)  methods  -  so  subclasses  customise  specific  steps  without  changing  the
algorithm's  overall  structure  and  order.  Example:  a  DataProcessor  with  a  final  process()  that  calls  readData()  ->
transform() -> writeData(), where subclasses implement the specifics for CSV vs JSON. It captures 'the invariant parts
once, let subtypes fill the gaps' - and uses inheritance (vs Strategy, which uses composition).

Q145. [Easy]  What is the Iterator pattern?
MODEL ANSWER
The Iterator pattern provides a standard way to access the elements of a collection sequentially without exposing its
underlying representation (array, linked list, tree). The collection returns an iterator object with hasNext()/next(), so
client code traverses uniformly regardless of the internal structure. It's built into Java - the Iterable/Iterator interfaces
power  the  for-each  loop  over  any  collection.  It  decouples  traversal  logic  from  the  collection  and  lets  multiple
independent traversals coexist.

Q146. [Medium]  What is the Chain of Responsibility pattern?
MODEL ANSWER
Chain of Responsibility passes a request along a chain of handler objects; each handler decides either to process the
request or pass it to the next handler. The sender doesn't know which handler will handle it, decoupling sender from
receiver.  Examples:  logging  frameworks  with  levels  (DEBUG/INFO/ERROR  handlers),  middleware  pipelines  in  web
servers (auth -> validation -> handler), and exception handling. It's flexible - you can add, remove, or reorder handlers
without touching the sender - and is exactly how request filter/interceptor chains work.

Q147. [Medium]  What is the Mediator pattern?
MODEL ANSWER
The Mediator pattern centralises complex communication between many objects into a single mediator object, so the
objects don't refer to each other directly - they talk through the mediator. This reduces the tangle of many-to-many
dependencies (which is hard to maintain) into a hub-and-spoke. Example: a chat room (mediator) where participants
send messages via the room rather than to each other directly; or a dialog box coordinating its widgets. It promotes
loose coupling at the cost of the mediator potentially becoming complex.

Q148. [Hard]  What is the difference between Adapter, Decorator, and Proxy - they all wrap an object?
n Asked at Amazon - intent comparison
MODEL ANSWER
All three wrap an object, but their intent differs. Adapter changes the interface of the wrapped object to match what
the  client  expects  (compatibility).  Decorator  keeps  the  same  interface  but  adds  behaviour/responsibilities
(enhancement, stackable). Proxy keeps the same interface but controls access to the object (lazy loading, security,
remoting)  without  adding  new  behaviour  for  the  client.  Mnemonic:  Adapter  =  different  interface,  Decorator  =  added
behaviour, Proxy = controlled access. Same structure, different purpose - a great depth answer.

Q149. [Medium]  What is the MVC architectural pattern?
MODEL ANSWER
MVC (Model-View-Controller) separates an application into three components. The Model holds data and business
logic; the View renders the UI/presentation; the Controller handles user input, updates the model, and selects the
view.  The  separation  means  UI  changes  don't  affect  business  logic  and  vice  versa,  improving  maintainability  and
testability  and  enabling  parallel  development.  It's  an  architectural  pattern  (bigger  than  a  GoF  design  pattern)
underpinning many web frameworks (Spring MVC, Rails, ASP.NET MVC).

OOP (Java)  |  SDE Fresher Question Bank

Page 33

Q150. [Medium]  When should you NOT use a design pattern?
MODEL ANSWER
When the problem doesn't call for it. Patterns add indirection and abstraction, which costs complexity - applying one to
a  simple  problem  is  over-engineering  (a  'pattern  for  pattern's  sake').  Don't  force  a  Singleton,  Factory,  or  Strategy
where a plain class or method would do. The right approach is to write the simplest thing that works (KISS/YAGNI)
and  introduce  a  pattern  only  when  a  real,  recurring  problem  emerges  -  duplicated  creation  logic,  an  explosion  of
subclasses, a sprawling type switch. Patterns are tools for actual problems, not goals.

Q151. [Medium]  What is the Memento pattern?
MODEL ANSWER
The  Memento  pattern  captures  and  externalises  an  object's  internal  state  (into  a  'memento')  so  it  can  be  restored
later, without violating encapsulation - the memento exposes the saved state only to the originator that created it.
It's the pattern behind undo/redo and snapshots: an editor saves its state to a memento before a change, and can roll
back by restoring it. The originator creates/uses mementos; a caretaker stores them but can't peek inside. It's often
paired with Command for full undo systems.

Q152. [Hard]  What is the Visitor pattern?
MODEL ANSWER
The Visitor pattern lets you add new operations to a set of object types without modifying those types - you put the
new operation in a separate 'visitor' object, and each element accepts a visitor and calls back the visitor's method for
its type (double dispatch). It's useful when you have a stable object structure but frequently add new operations over it
(e.g. an AST in a compiler: type-check, optimise, generate code as visitors). The trade-off: adding a new element type
is hard (every visitor must change), so it fits stable hierarchies with evolving operations.

Q153. [Medium]  How do design patterns relate to the SOLID principles?
MODEL ANSWER
Patterns are concrete embodiments of SOLID. Strategy and Template Method realise Open/Closed (extend via new
classes/subclasses,  not  edits).  Observer  and  Dependency  Injection  realise  Dependency  Inversion  (depend  on
abstractions). The Adapter and Facade reduce coupling. Most patterns push you toward programming to interfaces,
single responsibilities, and substitutable types - so SOLID is the 'why' (principles) and patterns are the 'how' (reusable
structures). Strong candidates connect a pattern back to the principle it serves rather than reciting it in isolation.

OOP (Java)  |  SDE Fresher Question Bank

Page 34

10. OOP Design, Relationships & Java Features

Class relationships (association/aggregation/composition) and the Java-OO features that round out a fresher's toolkit -
generics, exceptions, enums, nested classes, and records. The relationship distinctions and 'how would you design X'
come up in LLD rounds.

Q154. [Hard]  What's the difference between association, aggregation, and composition?
n Asked at Amazon, Microsoft - LLD rounds
MODEL ANSWER
They're increasingly strong 'has-a' relationships. Association - a general relationship where objects use each other
but are independent (a Teacher and a Student know each other). Aggregation - a 'has-a' where the part can exist
independently of the whole (a Department has Professors, but professors outlive the department) - a weak ownership.
Composition - a strong 'has-a' where the part's lifecycle is bound to the whole; destroy the whole and the parts go too
(a House has Rooms; no house, no rooms).

Mnemonic by ownership/lifecycle: association = uses-a, aggregation = has-a (shared, independent life), composition =
owns-a (exclusive, shared life and death).

Q155. [Medium]  Show aggregation vs composition in code.
MODEL ANSWER
The tell is who creates and owns the part's lifecycle:

// AGGREGATION: Car is given an Engine (engine can outlive the car)
class Car {
    private Engine engine;
    Car(Engine e) { this.engine = e; }   // passed in
}

// COMPOSITION: House creates and owns its Rooms (die with the house)
class House {
    private List&lt;Room&gt; rooms = new ArrayList&lt;&gt;();
    House() { rooms.add(new Room()); }   // created inside
}

In aggregation the part is injected from outside and can be shared/reused; in composition the whole creates the part
internally and is solely responsible for it. The lifecycle binding is the key differentiator.

Q156. [Medium]  What are generics and why are they useful?
n Commonly asked
MODEL ANSWER
Generics  let  you  write  classes,  interfaces,  and  methods  that  operate  on  a  type  parameter  specified  later  (List<T>),
providing compile-time type safety and eliminating casts. Without generics, collections held Object and you'd cast on
every retrieval (risking ClassCastException at runtime).

List&lt;String&gt; names = new ArrayList&lt;&gt;();
names.add("Asha");
String n = names.get(0);   // no cast, type-safe

Benefits: errors caught at compile time, cleaner code (no casts), and reusable algorithms that work for any type. The
compiler enforces that you can't, say, put an Integer into a List<String>.

Q157. [Hard]  What is type erasure in Java generics?
MODEL ANSWER
Type  erasure  is  how  Java  implements  generics:  the  type  parameters  exist  only  at  compile  time  for  type-checking,
and are erased (replaced with Object or the bound) in the compiled bytecode. So List<String> and List<Integer> are
the same class at runtime - 'new ArrayList<String>()' carries no String info at runtime.

Consequences: you can't do 'new T()', can't use 'instanceof List<String>', and can't have a 'T[]' easily, because the
type isn't available at runtime. Erasure was chosen for backward compatibility with pre-generics code. It's a favourite
'gotcha' question - the answer is 'generics are a compile-time feature, erased at runtime.'

OOP (Java)  |  SDE Fresher Question Bank

Page 35

Q158. [Hard]  What are bounded type parameters and wildcards (? extends / ? super)?
MODEL ANSWER
A bounded type parameter restricts what a generic type can be: <T extends Number> means T must be Number or
a  subtype,  so  you  can  call  Number  methods  on  it.  Wildcards  add  flexibility  for  variance:  '?  extends  T'  is  an  upper
bound (read-only producer - you can read T's but not add), and '? super T' is a lower bound (consumer - you can add
T's but read as Object).

The mnemonic is PECS - Producer Extends, Consumer Super: use extends when the structure produces values
you  read,  super  when  it  consumes  values  you  add.  e.g.  copy(List<?  super  T>  dst,  List<?  extends  T>  src).  It's  how
generics handle subtyping safely.

Q159. [Medium]  What is a functional interface?
MODEL ANSWER
A  functional  interface  is  an  interface  with  exactly  one  abstract  method  (it  may  have  default/static  methods  too).
Because it has a single method, it can be implemented with a lambda expression or method reference. Examples in
Java:  Runnable  (run),  Comparator  (compare),  and  the  java.util.function  types  (Function,  Predicate,  Supplier,
Consumer).  The  optional  @FunctionalInterface  annotation  asks  the  compiler  to  enforce  the  single-abstract-method
rule. They're the bridge between OOP and Java's functional features.

Q160. [Medium]  What are lambda expressions and how do they fit with OOP?
MODEL ANSWER
A  lambda  expression  is  a  concise  way  to  represent  an  anonymous  function  -  an  implementation  of  a  functional
interface's single method, written inline. '(a, b) -> a + b' is a lambda. Under the hood it's an instance of a functional
interface, so it fits Java's object model rather than replacing it.

They let you pass behaviour as data (e.g. list.sort((a,b) -> a.age - b.age)), which makes Strategy-style code far less
verbose than anonymous classes. So Java added functional-style conveniences on top of OOP - lambdas, streams,
method references - without abandoning objects.

Q161. [Medium]  What are the types of nested classes in Java?
MODEL ANSWER
Four  kinds.  Static  nested  class  -  declared  static,  doesn't  hold  a  reference  to  an  outer  instance,  used  to  logically
group a helper with its outer class. Inner (non-static nested) class - tied to an outer instance, can access the outer
object's members. Local class - defined inside a method, scoped to it. Anonymous class - an unnamed inner class
defined and instantiated in one expression, typically to implement an interface or extend a class on the spot. They're
used for encapsulation and to keep tightly-related code together.

Q162. [Medium]  What's the difference between a static nested class and an inner class?
MODEL ANSWER
A  static  nested  class  does  not  hold  an  implicit  reference  to  an  instance  of  the  outer  class  -  you  can  create  it
independently  (new  Outer.Nested()),  and  it  can  only  access  the  outer  class's  static  members.  An  inner  class
(non-static)  is  associated  with  an  outer  instance,  so  it  needs  an  outer  object  to  exist  (outer.new  Inner())  and  can
access all the outer instance's members, even private ones.

Practical note: inner classes hold a hidden reference to their enclosing instance, which can cause memory leaks (the
outer  object  can't  be  GC'd  while  the  inner  lives).  So  prefer  static  nested  classes  unless  you  actually  need  the
enclosing instance.

Q163. [Easy]  What is an anonymous inner class?
MODEL ANSWER
An anonymous inner class is a class without a name that is declared and instantiated in a single expression - used to
create  a  one-off  implementation  of  an  interface  or  subclass  of  a  class  on  the  spot.  Classic  pre-lambda  use:
'button.addListener(new  ClickListener()  {  public  void  onClick()  {  ...  }  });'.  It's  handy  when  you  need  a  throwaway
implementation used once. Java 8 lambdas replaced many anonymous classes that implement functional interfaces,
but anonymous classes are still needed when you override multiple methods or extend a class.

OOP (Java)  |  SDE Fresher Question Bank

Page 36

Q164. [Medium]  Can an enum have fields, constructors, and methods?
MODEL ANSWER
Yes - Java enums are full-fledged classes, not just named constants. Each enum constant is an instance, and you can
give the enum private fields, a (private) constructor to initialise them, and methods (even abstract methods overridden
per constant).

enum Planet {
    EARTH(9.81), MARS(3.71);
    private final double gravity;
    Planet(double g) { gravity = g; }
    double weight(double mass) { return mass * gravity; }
}

This lets enums carry data and behaviour - far more powerful than C-style enums, and the reason the enum-based
Singleton works so cleanly.

Q165. [Medium]  What's the difference between checked and unchecked exceptions?
n Asked at Amazon, Microsoft
MODEL ANSWER
Checked exceptions (extend Exception, not RuntimeException) are checked at compile time - the compiler forces
you  to  either  catch  them  or  declare  them  with  throws  (IOException,  SQLException).  They  represent  recoverable,
expected conditions. Unchecked exceptions (extend RuntimeException) aren't checked at compile time - you're not
required  to  handle  them  (NullPointerException,  IllegalArgumentException,  ArrayIndexOutOfBounds).  They  usually
indicate programming bugs.

Rule  of  thumb:  checked  for  recoverable  external  conditions  the  caller  should  handle,  unchecked  for  programming
errors that shouldn't normally happen. (Errors, like OutOfMemoryError, are a third category you shouldn't catch.)

Q166. [Easy]  How do you create a custom exception?
MODEL ANSWER
Extend Exception (for a checked exception) or RuntimeException (for unchecked), and typically provide constructors
that pass a message and cause to super:

class InsufficientFundsException extends RuntimeException {
    InsufficientFundsException(String msg) { super(msg); }
}

throw

it  with

You
InsufficientFundsException("...")'.  Custom  exceptions  make  error  handling
domain-specific  and  readable,  and  let  callers  catch  precisely  the  condition  they  care  about.  Choose  checked  vs
unchecked based on whether callers can reasonably recover.

'throw  new

Q167. [Medium]  What are some exception-handling best practices?
MODEL ANSWER
Catch  specific  exceptions,  not  bare  Exception/Throwable.  Don't  swallow  exceptions  with  an  empty  catch  block  -  at
minimum log them. Use finally or try-with-resources to release resources reliably. Throw exceptions at the right level
of  abstraction  (wrap  low-level  ones  in  meaningful  domain  exceptions).  Don't  use  exceptions  for  normal  control  flow
(they're  costly  and  obscure  logic).  Include  helpful  context  in  the  message,  and  preserve  the  original  cause  when
re-throwing. The goal is failures that are visible, diagnosable, and handled where it makes sense.

Q168. [Medium]  What is a marker interface?
MODEL ANSWER
A marker interface is an interface with no methods - it exists purely to 'mark' or tag a class as having some property,
which  other  code  checks  via  instanceof.  Examples:  Serializable  (marks  a  class  as  serializable),  Cloneable  (allows
clone()),  and  RandomAccess.  The  JVM/libraries  change  behaviour  based  on  the  marker.  In  modern  Java,
annotations  (like  @Functional  or  custom  ones)  often  serve  this  role  more  flexibly,  but  marker  interfaces  are  still
common in the core libraries and a frequent interview term.

OOP (Java)  |  SDE Fresher Question Bank

Page 37

Q169. [Easy]  What is a record in Java (16+)?
MODEL ANSWER
A  record  is  a  concise  way  to  declare  an  immutable  data-carrier  class.  'record  Point(int  x,  int  y)  {}'  automatically
generates a constructor, private final fields, accessor methods (x(), y()), and equals()/hashCode()/toString() based on
the components. It eliminates the boilerplate of a typical immutable value/DTO class. Records are implicitly final and
their fields are final, so they're perfect for transparent, immutable data aggregates (coordinates, DTOs, value objects).
A good modern-Java answer.

Q170. [Easy]  What is a POJO and a JavaBean?
MODEL ANSWER
A POJO (Plain Old Java Object) is an ordinary object not bound by any special framework requirement or interface -
just fields and methods, no mandatory extends/implements. A JavaBean is a POJO that follows specific conventions:
a  public  no-arg  constructor,  private  fields  accessed  via  public  getters/setters  following  a  naming  convention,  and
(usually) implementing Serializable. So all JavaBeans are POJOs, but a JavaBean adds the convention constraints
that let frameworks (like older GUI/persistence tools) introspect and manipulate it generically.

Q171. [Medium]  How would you approach a low-level design (LLD) problem in an interview?
n Asked at Flipkart, Atlassian, Uber - machine coding
MODEL ANSWER
Follow  a  clear  framework.  (1)  Clarify  requirements  and  scope  (functional  +  edge  cases,  scale,  concurrency).  (2)
Identify  entities  -  the  nouns  become  classes.  (3)  Define  their  attributes  and  methods,  and  the  relationships
(association/aggregation/composition,  inheritance).  (4)  Apply  SOLID  and  the  right  design  patterns  where  they  fit
(don't  force  them).  (5)  Code  the  core  classes  and  the  critical  flow,  with  clean  naming,  enums/constants  (no  magic
values), and encapsulation. (6) Discuss extensions - concurrency, new features, scaling. The interviewer is grading
modular, extensible, readable design more than completeness.

Q172. [Easy]  What is a fluent interface / method chaining?
MODEL ANSWER
A fluent interface is an API design where methods return the object itself (return this) - or a builder - so calls can be
chained  readably:  obj.setA(1).setB(2).setC(3).  It  reads  almost  like  a  sentence  and  reduces  intermediate  variables.
The Builder pattern and StringBuilder use it, as do stream pipelines (stream().filter().map().collect()). The key enabler
is each method returning a reference you can keep calling on.

Q173. [Medium]  How would you model a many-to-many relationship between classes (e.g. Students and
Courses)?
MODEL ANSWER
Since a Student takes many Courses and a Course has many Students, you don't put a direct list on only one side
and  call  it  done  -  you  typically  introduce  an  association/join  class  (Enrollment)  that  links  a  specific  Student  to  a
specific  Course  and  holds  relationship-specific  data  (grade,  enrollment  date).  Each  side  can  hold  a  collection  of
Enrollments.  This  mirrors  the  database  junction-table  approach  and  keeps  the  relationship's  own  attributes  in  a
sensible place, rather than awkwardly duplicating lists on both Student and Course.

OOP (Java)  |  SDE Fresher Question Bank

Page 38

11. Tricky, Output & Rapid-fire

The 'gotcha' round - short, sharp questions that catch people who memorised definitions but don't understand the
mechanics. Answer each in a sentence or two; getting these right signals real fluency.

Q174. [Easy]  Can you overload the main() method?
MODEL ANSWER
Yes  -  you  can  define  multiple  main()  methods  with  different  parameter  lists,  and  they're  just  normal  overloaded
methods.  But  the  JVM  only  ever  calls  'public  static  void  main(String[]  args)'  as  the  entry  point;  the  others  must  be
called explicitly from your code. So overloading main is legal but only the String[] version starts the program.

Q175. [Easy]  Can a class be both abstract and final?
MODEL ANSWER
No - it's a contradiction the compiler rejects. abstract means 'must be subclassed to be useful' (it has unimplemented
behaviour or is meant for extension), while final means 'cannot be subclassed.' The two are mutually exclusive, so
'abstract final class' is a compile error.

Q176. [Easy]  Can an interface extend another interface, or multiple interfaces?
MODEL ANSWER
Yes  -  an  interface  can  extend  one  or  multiple  other  interfaces  using  extends  (interface  C  extends  A,  B).  This  is
multiple inheritance of type, which is allowed for interfaces because they (classically) carry no state or implementation
to conflict. Note interfaces use extends to inherit interfaces, while a class uses implements to adopt them.

Q177. [Hard]  Why shouldn't a constructor call an overridable method?
n Asked at Amazon - subtle pitfall
MODEL ANSWER
Because  of  construction  order:  when  you  create  a  subclass  object,  the  superclass  constructor  runs  before  the
subclass's  fields  are  initialised.  If  the  superclass  constructor  calls  an  overridable  method,  the  subclass's  override
runs (dynamic dispatch) - but it sees the subclass fields still at their defaults (null/0), causing subtle bugs or NPEs. So
constructors should only call private, static, or final methods, which can't be overridden. A classic, sneaky output/bug
question.

Q178. [Hard]  If a static method is called via a null object reference, what happens?
MODEL ANSWER
It works fine - no NullPointerException. Static methods belong to the class, not the instance, so the call is resolved
at compile time using the reference's declared type, and the object value (even null) is never actually dereferenced.
'SomeClass s = null; s.staticMethod();' compiles and runs as SomeClass.staticMethod(). It's poor style (call it on the
class), but it doesn't throw - a favourite trick question.

Q179. [Medium]  Does the finally block always execute?
MODEL ANSWER
Almost always - finally runs whether the try completes normally, throws, or even returns (the finally executes before
the method actually returns). The few exceptions where it doesn't run: if the JVM exits via System.exit(), if the thread
is killed or the JVM crashes, or an infinite loop/deadlock in try. Note also that a return in finally will override a return in
try (and is bad practice). 'Yes, except System.exit() or a JVM crash' is the precise answer.

Q180. [Easy]  What's the difference between throw and throws?
MODEL ANSWER
throw is a statement that actually raises an exception ('throw new IllegalArgumentException()'). throws is a clause in
a  method  signature  that  declares  the  checked  exceptions  the  method  might  propagate  ('void  read()  throws
IOException'). So throw triggers an exception; throws announces that one may escape, letting the compiler enforce
handling by callers.

OOP (Java)  |  SDE Fresher Question Bank

Page 39

Q181. [Easy]  Can a try block exist without a catch block?
MODEL ANSWER
Yes - a try can be paired with finally alone (try-finally, no catch), which executes cleanup regardless of exceptions
while letting the exception propagate. It can also be a try-with-resources (which auto-closes resources and needs
neither catch nor finally). What you can't have is a try entirely on its own - it must be followed by at least one of catch,
finally, or be a try-with-resources.

Q182. [Hard]  What is the Integer caching pitfall with ==?
n Asked at Amazon - classic gotcha
MODEL ANSWER
Java caches Integer objects for values -128 to 127 (autoboxing reuses them). So comparing two boxed Integers with
== gives surprising results:

Integer a = 100, b = 100;
a == b   // true  (both from the cache)

Integer c = 200, d = 200;
c == d   // false (separate objects, outside cache)

The lesson: always compare wrapper objects with .equals(), not ==, because == compares references and the cache
makes the bug appear only outside -128..127. A favourite interview trap.

Q183. [Easy]  Can you instantiate an interface?
MODEL ANSWER
No  -  you  can't  directly  instantiate  an  interface  with  new,  because  it  has  no  implementation.  But  you  can  create  an
instance of an anonymous class that implements it on the spot ('new Runnable() { public void run(){...} }') or use a
lambda  for  a  functional  interface.  What  looks  like  'instantiating  an  interface'  is  really  instantiating  an  anonymous
implementing class.

Q184. [Easy]  Is String a primitive type in Java?
MODEL ANSWER
No - String is a class (a reference type), not a primitive. The eight primitives are byte, short, int, long, float, double,
char, and boolean. String just gets special language support (literals, the + operator, the constant pool) that makes it
feel primitive-like, but it's a full object with methods, and string variables hold references to String objects.

Q185. [Medium]  Why can't Java generics use primitive types (List<int>)?
MODEL ANSWER
Because generics are implemented with type erasure down to Object (or a bound), and primitives aren't Objects -
they  don't  fit  into  a  reference-typed  container.  So  you  must  use  the  wrapper  classes:  List<Integer>,  not  List<int>.
Autoboxing makes this mostly transparent (you can add an int and it boxes to Integer), at a small performance cost.
Project Valhalla aims to allow value-type generics in the future, but today wrappers are required.

Q186. [Hard]  How is the conflict resolved when two interfaces provide the same default method?
MODEL ANSWER
The implementing class is forced to override the method - otherwise it's a compile error (the 'class inherits unrelated
defaults' error). Inside the override, it can pick one parent's version explicitly with InterfaceName.super.method(). This
is how Java 8 handles the mild diamond problem introduced by default methods - it makes you resolve the ambiguity
rather than guessing.

Q187. [Medium]  Can you reduce the access level of a method when overriding it?
MODEL ANSWER
No  -  you  can  keep  it  the  same  or  widen  it,  but  not  narrow  it.  For  example  you  can't  override  a  public  method  as
protected or private; that would break Liskov substitution (code calling it through the base type expects public access).
The compiler rejects 'attempting to assign weaker access privileges.' You can go the other way - override a protected
method as public.

OOP (Java)  |  SDE Fresher Question Bank

Page 40

Q188. [Easy]  Can a concrete (non-abstract) class contain an abstract method?
MODEL ANSWER
No  -  if  a  class  has  even  one  abstract  method,  the  class  itself  must  be  declared  abstract  (otherwise  it's  a  compile
error).  An  abstract  method  has  no  body,  so  a  concrete,  instantiable  class  can't  contain  one  -  there'd  be  nothing  to
execute if you called it. The reverse is fine: an abstract class can have zero abstract methods.

Q189. [Hard]  When you have overloaded methods and pass null, which one is called?
MODEL ANSWER
The compiler picks the most specific applicable type. If you have foo(String) and foo(Object) and call foo(null), it calls
foo(String),  because  String  is  more  specific  than  Object  and  null  is  a  valid  String.  But  if  you  have  foo(String)  and
foo(Integer) - two unrelated specific types - foo(null) is ambiguous and won't compile (you'd need an explicit cast like
foo((String) null)). A classic overload-resolution puzzle.

Q190. [Medium]  Can an overriding method throw a broader checked exception than the overridden one?
MODEL ANSWER
No - an overriding method can throw the same checked exceptions, narrower ones (subtypes), or fewer/none, but not
new or broader checked exceptions. This preserves Liskov substitution: code calling the method through the base
type only prepared to handle the base's declared exceptions. Unchecked (runtime) exceptions are exempt - you can
throw those freely since they aren't part of the checked contract.

Q191. [Medium]  Can an enum implement an interface? Can it extend a class?
MODEL ANSWER
An enum can implement interfaces (and each constant can even provide its own implementation of a method). But an
enum  cannot  extend  a  class,  because  it  implicitly  extends  java.lang.Enum,  and  Java  has  no  multiple  class
inheritance.  So  enums  gain  flexibility  via  interfaces,  not  via  a  class  hierarchy  -  useful  for  things  like
strategy-per-constant.

Q192. [Easy]  What is the diamond operator <>?
MODEL ANSWER
The diamond operator (introduced in Java 7) lets you omit the generic type arguments on the right-hand side of an
assignment  when  they  can  be  inferred  from  the  left:  'List<String>  list  =  new  ArrayList<>();'  instead  of  repeating
<String>. It reduces verbosity with no change in behaviour - the compiler infers the type. (Unrelated to the inheritance
'diamond problem' despite the name.)

Q193. [Medium]  Can a final variable be declared without initialising it immediately?
MODEL ANSWER
Yes  -  a  'blank  final'.  You  can  declare  a  final  variable  without  an  initial  value  as  long  as  it's  assigned  exactly  once
before it's used: a final field must be set in the constructor (or an initializer block), and a final local must be assigned
before  first  use.  After  that  single  assignment  it  can  never  change.  So  final  means  'assigned  once',  not  necessarily
'assigned at declaration.'

Q194. [Easy]  Can you assign a subclass object to a superclass reference and vice versa?
MODEL ANSWER
Subclass  to  superclass  (upcasting)  is  always  allowed  implicitly:  'Animal  a  =  new  Dog();'.  Superclass  to  subclass
(downcasting) requires an explicit cast and is only safe if the object really is that subclass at runtime: 'Dog d = (Dog)
a;'  -  otherwise  it  throws  ClassCastException.  Guard  downcasts  with  instanceof.  Upcasting  is  the  basis  of
polymorphism; downcasting is occasionally needed but a sign to reconsider the design.

Q195. [Easy]  Does Java support multiple inheritance?
MODEL ANSWER
Not  for  classes  -  a  class  can  extend  only  one  class  (to  avoid  the  diamond  problem).  But  Java  supports  multiple
inheritance of type through interfaces - a class can implement many interfaces, and an interface can extend many
interfaces. Since Java 8, default methods give interfaces some implementation, so it's a controlled form of multiple
inheritance of behaviour, with conflicts resolved by forcing an override.

OOP (Java)  |  SDE Fresher Question Bank

Page 41

Q196. [Easy]  Can a constructor be declared in an interface?
MODEL ANSWER
No - interfaces cannot have constructors. A constructor initialises instance state, but interfaces have no instance state
to  initialise  (their  fields  are  static  final  constants),  and  they  can't  be  instantiated  directly.  Only  classes  (including
abstract  classes)  have  constructors.  This  is  one  of  the  key  distinctions  from  abstract  classes,  which  can  have
constructors.

Q197. [Medium]  Can static methods be abstract, final, or overridden?
MODEL ANSWER
A static method cannot be abstract (abstract implies dynamic dispatch via subclass override, which static methods
don't  participate  in).  It  can  be  final  (though  redundant  since  it  can't  be  overridden  anyway).  And  it  can't  be
overridden - a same-signature static method in a subclass hides the parent's (resolved by reference type at compile
time), it doesn't override it. So static + abstract is illegal; static + 'override' is really hiding.

Q198. [Medium]  What happens if two interfaces a class implements have a constant with the same
name?
MODEL ANSWER
Accessing  that  constant  by  its  simple  name  becomes  ambiguous  and  won't  compile  -  you  must  qualify  it  with  the
interface name (InterfaceA.VALUE vs InterfaceB.VALUE) to disambiguate. Since interface constants are public static
final, they belong to their respective interfaces, so the qualified name resolves the conflict. It's the constant analogue
of the default-method diamond.

Q199. [Easy]  Two objects have the same hashCode - does that mean they're equal?
MODEL ANSWER
No. Equal objects must have the same hashCode, but the reverse isn't required - two unequal objects can share a
hashCode (a collision), which is normal since hashCode maps a huge space of objects into a finite int range. That's
why hash-based collections use hashCode to find the bucket and then equals() to confirm the actual match. So same
hashCode = 'maybe equal, check with equals'; different hashCode = 'definitely not equal.'

Q200. [Medium]  What's the difference between an abstract class with only abstract methods and an
interface?
MODEL ANSWER
Functionally they're close, but key differences remain even then: a class can extend only one such abstract class but
implement  many  interfaces;  an  abstract  class  can  have  constructors  and  instance  fields  (state)  while  an  interface
cannot; and an abstract class's members can have varied access levels while interface members are implicitly public.
So even an all-abstract class differs from an interface in single-vs-multiple inheritance, state, and constructors - which
usually decides the choice.

Q201. [Hard]  What's the output: a parent reference holding a child object calling an overridden method vs
an overloaded one?
MODEL ANSWER
For  an  overridden  instance  method,  the  child's  version  runs  -  dynamic  dispatch  picks  by  the  actual  object  type
('Parent  p  =  new  Child();  p.foo()'  ->  Child's  foo).  For  an  overloaded  method  (or  a  static/field),  resolution  is  by  the
reference
/
the  Parent-typed  choice
overloading-is-compile-time distinction is the single most common OOP output puzzle - and fields and static methods
follow the overloading (reference-type) rule, not the overriding one.

is  made.  This  overriding-is-runtime

type  at  compile

time,  so

OOP (Java)  |  SDE Fresher Question Bank

Page 42


