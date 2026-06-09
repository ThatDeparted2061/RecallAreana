OPERATING SYSTEMS

SDE Fresher Interview Question Bank

Product & service-based company interviews  -  India 2026 cycle

Complete, interview-ready coverage of every Operating Systems concept that surfaces in fresher SDE
interviews at product and service-based companies - from process vs thread and CPU-scheduling
numericals to Banker's algorithm, page-replacement, and the classic synchronisation problems. Each
question is phrased the way a real interviewer asks it, with a model answer written the way a strong
candidate would actually say it out loud.

Prepared for: Harsh Rao - BITS Pilani Goa, SDE-1 prep
Volume 1 of 5 - Core CS Interview Series - June 2026
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

Operating Systems  |  SDE Fresher Question Bank

Page 2

Table of Contents

1. OS Fundamentals & Architecture

2. Processes & Process Management

3. Threads, Concurrency & Parallelism

4. CPU Scheduling

5. Process Synchronization

6. Deadlocks

7. Memory Management

8. Virtual Memory & Page Replacement

9. File Systems, I/O & Disk Scheduling

10. Linux & Practical OS

11. Scenario, Synthesis & Backend-Relevant

4

8

12

15

19

23

26

30

34

37

40

Operating Systems  |  SDE Fresher Question Bank

Page 3

1. OS Fundamentals & Architecture

Warm-up territory. These are the definitions and mental models interviewers use to check you actually understand what
an OS is before they go deep. Answer them crisply and move on - lingering here wastes the interviewer's time.

Q1. [Easy]  What is an operating system, and what are its core responsibilities?
n Universally asked - the classic opener
MODEL ANSWER
An  operating  system  is  the  system  software  that  sits  between  the  hardware  and  user  programs  and  manages  the
machine's resources so applications don't have to. I think of it as a resource manager plus an abstraction layer: it
decides who gets the CPU, memory, and I/O devices, and it hides the messy hardware behind clean abstractions like
processes, files, and sockets.

Its  core  responsibilities  are  process  management  (scheduling,  creation,  termination),  memory  management
(allocation,  virtual  memory),  file-system  management,  device/I-O  management  via  drivers,  security  and  access
control, and providing the system-call interface programs use to ask the kernel for services.

Q2. [Easy]  What are the main types of operating systems?
MODEL ANSWER
Batch  OS  -  jobs  with  similar  needs  are  batched  and  run  without  user  interaction  (old  mainframe  payroll  systems).
Multiprogramming/multitasking OS - keeps several jobs in memory and switches between them to keep the CPU busy
(Windows,  Linux).  Time-sharing  OS  -  multitasking  tuned  for  fast  response  so  many  interactive  users  share  one
machine.  Distributed  OS  -  manages  a  cluster  of  machines  that  appear  as  one  system.  Real-time  OS  -  guarantees
response within strict deadlines (avionics, pacemakers). Embedded OS - small footprint for devices like routers and
microwaves.

Q3. [Easy]  What is the kernel, and how is it different from the operating system as a whole?
n Very frequently asked
MODEL ANSWER
The kernel is the core of the OS - the part that's always resident in memory and runs in privileged mode. It directly
manages the CPU, memory, and devices, and it's the only code allowed to execute privileged instructions.

The 'operating system' is the broader package: the kernel plus the user-space pieces like the shell, system utilities,
libraries,  and  sometimes  a  GUI.  So  every  kernel  is  part  of  an  OS,  but  the  OS  is  more  than  just  the  kernel.  Quick
analogy: the kernel is the engine; the OS is the whole car including the dashboard you interact with.

Q4. [Medium]  What are the different types of kernels?
MODEL ANSWER
Monolithic  kernel  -  all  OS  services  (scheduling,  memory,  file  system,  drivers)  run  together  in  one  address  space  in
kernel mode. Fast because everything is a direct function call, but large and a bug anywhere can crash the system.
Linux is a (modular) monolithic kernel.

Microkernel - keeps only the bare essentials in the kernel (IPC, scheduling, basic memory) and pushes drivers, file
systems,  etc.  into  user-space  servers.  More  robust  and  modular,  but  slower  due  to  message-passing  overhead.
Examples: QNX, MINIX.

Hybrid  kernel  -  a  middle  ground  that  keeps  performance-critical  services  in  kernel  space  but  is  structured  like  a
microkernel (Windows NT, macOS XNU). Plus the niche nano/exo-kernels which push abstraction even lower.

Q5. [Medium]  Monolithic vs microkernel - what are the trade-offs? And how does a monolithic kernel
affect what happens when a component crashes?
n Asked at Amazon (appears in interview experiences)
MODEL ANSWER
The  core  trade-off  is  performance  vs  isolation.  In  a  monolithic  kernel  everything  runs  in  one  privileged  address
space, so calls between subsystems are cheap direct function calls - that's why it's fast. The cost is fault isolation:
because  a  faulty  driver  runs  with  full  kernel  privileges  in  the  same  space,  a  single  bug  (a  bad  pointer  in  a  device
driver) can corrupt kernel memory and bring down the entire system - the classic kernel panic / blue screen.

A microkernel runs those same drivers as isolated user-space processes, so if one crashes the kernel can often just
restart  that  server  while  the  system  keeps  running.  You  pay  for  that  resilience  with  context-switch  and
message-passing overhead on every service call. Real systems compromise: Linux is monolithic but loads drivers as

Operating Systems  |  SDE Fresher Question Bank

Page 4

modules; Windows and macOS are hybrids.

Q6. [Medium]  What's the difference between user mode and kernel mode, and why do we need two
modes at all?
n Very frequently asked
MODEL ANSWER
Modern CPUs have a mode bit. In kernel mode (privileged) code can execute any instruction and touch any memory
or  device.  In  user  mode  ordinary  application  code  runs  with  privileged  instructions  disabled  -  it  can't  directly  touch
hardware or another process's memory.

We  need  the  split  for  protection  and  stability.  If  every  program  could  run  privileged  instructions,  one  buggy  or
malicious app could halt the CPU, overwrite the OS, or read another process's data. So apps run in user mode and
must make a system call to request privileged work; that call traps into the kernel, which validates the request and
does it on the app's behalf. The mode switch user->kernel is exactly what makes a system call more expensive than a
normal function call.

Q7. [Medium]  What is a system call? Walk me through what happens when one is made.
n Asked at Microsoft, Amazon
MODEL ANSWER
A system call is the controlled entry point through which a user program requests a service from the kernel - things it
can't do itself in user mode, like reading a file, creating a process, or sending data on a socket.

The  flow:  the  program  (usually  via  a  libc  wrapper)  puts  the  system-call  number  and  arguments  in  registers,  then
executes a special trap instruction (syscall on x86-64, previously int 0x80). That trap switches the CPU to kernel mode
and jumps to a fixed handler. The kernel looks up the call number in the system-call table, validates the arguments,
performs the operation, places the return value in a register, and executes a return-from-trap that switches back to
user mode and resumes the program. The two mode switches plus argument validation are why syscalls cost far more
than function calls.

Q8. [Easy]  Give examples of system calls and the categories they fall into.
MODEL ANSWER
Process  control:  fork(),  exec(),  exit(),  wait().  File  management:  open(),  read(),  write(),  close(),  lseek().  Device
management:  ioctl(),  read/write  on  device  files.  Information  maintenance:  getpid(),  alarm(),  time().  Communication:
pipe(),  socket(),  send(),  recv(),  shmget().  Protection:  chmod(),  umask(),  chown().  Knowing  two  or  three  concrete
names per category is usually enough to satisfy the interviewer.

Q9. [Medium]  What's the difference between a system call and a library function call - for example printf()
vs write()?
MODEL ANSWER
A library function runs entirely in user space; a system call crosses into the kernel. write() is a thin wrapper around the
actual write system call - calling it traps into the kernel to push bytes to a file descriptor.

printf() is a C-library function: it formats your arguments into a string in a user-space buffer and only eventually calls
write() to flush that buffer to the OS. So one printf() may cause zero or one system calls depending on buffering. The
practical  takeaway:  library  calls  are  cheap  and  may  batch  work,  while  system  calls  are  the  expensive  boundary
crossings - which is why buffered I/O (fewer, larger writes) outperforms calling write() per byte.

Q10. [Medium]  Explain what happens from power-on until the OS is ready - the booting/bootstrap
process.
MODEL ANSWER
On power-on the CPU starts executing firmware (BIOS or UEFI) from a fixed ROM address. The firmware runs POST
(power-on self-test) to check hardware, then locates a boot device and loads its bootloader (e.g. GRUB).

The bootloader loads the kernel image into memory and hands control to it. The kernel initialises its data structures,
sets up memory management and interrupt handling, starts device drivers, mounts the root filesystem, and creates
the first user-space process (init / systemd, PID 1). init then starts the remaining services and the login shell or GUI.
The term 'bootstrap' captures the chicken-and-egg idea: a tiny program pulls in a slightly bigger one, which pulls in the
full OS.

Operating Systems  |  SDE Fresher Question Bank

Page 5

Q11. [Medium]  Differentiate multiprogramming, multitasking, and multiprocessing.
n Commonly asked - people mix these up
MODEL ANSWER
Multiprogramming - keep several jobs resident in memory so that whenever the running job blocks on I/O, the CPU
immediately  switches  to  another.  The  goal  is  maximum  CPU  utilisation;  switching  is  cooperative  around  I/O,  not
necessarily time-sliced.

Multitasking  (time-sharing)  -  an  extension  where  the  CPU  is  switched  on  a  timer  (time  quantum)  so  many  tasks
appear to run simultaneously and interactive users get fast response. Still one CPU, rapid switching.

Multiprocessing - genuinely more than one physical CPU/core, so multiple instructions execute at the same instant
(true parallelism). The first two are about sharing one CPU well; the third is about having more CPUs.

Q12. [Easy]  What is spooling?
MODEL ANSWER
Spooling (Simultaneous Peripheral Operations On-Line) is buffering a slow device's work on disk so the CPU and the
device can run independently. The textbook example is printing: instead of making your program wait for the printer,
output is written to a disk spool queue, and the printer drains the queue at its own pace. It decouples a fast producer
(CPU)  from  a  slow  consumer  (printer)  and  lets  multiple  jobs  queue  up  -  an  early  form  of  the  producer-consumer
pattern.

Q13. [Medium]  What is a real-time operating system, and what's the difference between hard and soft
real-time?
MODEL ANSWER
An RTOS guarantees that tasks complete within strict timing deadlines - correctness depends not just on the result
but on when it's produced. It uses predictable, preemptive priority scheduling and bounded interrupt latency.

Hard  real-time:  missing  a  deadline  is  a  system  failure  -  think  an  airbag  controller  or  anti-lock  brakes;  the  response
must happen in time. Soft real-time: deadlines matter for quality but an occasional miss is tolerable - video playback or
live streaming, where a late frame just degrades experience. (Firm real-time sits between: a missed deadline makes
that result useless but isn't catastrophic.)

Q14. [Easy]  What's the difference between a program and a process?
n Universally asked
MODEL ANSWER
A  program  is  a  passive  entity  -  an  executable  file  sitting  on  disk,  just  instructions  and  static  data.  A  process  is  an
active entity - a program in execution, with a program counter, a set of registers, a stack, a heap, and its own address
space and OS-tracked state.

One  program  can  spawn  many  processes  (open  the  same  browser  binary  three  times  ->  three  processes).  The
program becomes a process when it's loaded into memory and the OS creates a PCB for it and schedules it.

Q15. [Medium]  What is reentrancy, and why does it matter?
MODEL ANSWER
A  reentrant  function  can  be  safely  interrupted  partway  through  and  called  again  ('re-entered')  before  the  first  call
finishes, and still behave correctly. That requires it to not rely on shared mutable static/global state and to not modify
its own code - it works only on arguments and local (per-call) data.

It  matters  for  interrupt  handlers,  signal  handlers,  and  multithreaded  code,  where  the  same  routine  can  be  active  in
multiple contexts at once. Note reentrancy and thread-safety overlap but aren't identical: a function using a lock can
be thread-safe yet not reentrant (re-entering would deadlock on the same lock).

Q16. [Medium]  What is virtualization, and what's the difference between a Type-1 and Type-2 hypervisor?
MODEL ANSWER
Virtualization  lets  one  physical  machine  run  multiple  isolated  virtual  machines,  each  with  its  own  OS,  by  having  a
hypervisor multiplex the real hardware among them.

A Type-1 (bare-metal) hypervisor runs directly on the hardware with no host OS beneath it - ESXi, Xen, Hyper-V. It's
used in data centres for performance and isolation. A Type-2 (hosted) hypervisor runs as an application on top of a
normal  host  OS  -  VirtualBox,  VMware  Workstation.  It's  convenient  for  desktops/dev  but  adds  a  layer  of  overhead
because guest operations pass through the host OS.

Operating Systems  |  SDE Fresher Question Bank

Page 6

Q17. [Medium]  Containers vs virtual machines - explain the difference from an OS standpoint.
n Asked at product companies (DevOps-adjacent roles)
MODEL ANSWER
A VM virtualises hardware: each VM ships a full guest OS kernel on top of a hypervisor, so VMs are heavy (GBs,
slow boot) but strongly isolated. A container virtualises the OS: all containers share the host kernel and are isolated
using kernel features - namespaces (separate views of PIDs, network, mounts) and cgroups (CPU/memory limits).

So  containers  are  lightweight  (MBs,  start  in  milliseconds)  because  there's  no  guest  kernel,  but  isolation  is  weaker
since a kernel exploit affects everyone sharing it. Rule of thumb: containers for packaging and density, VMs when you
need a different OS or hard security isolation.

Q18. [Medium]  What is the difference between a trap (exception) and an interrupt?
MODEL ANSWER
Both transfer control to the kernel, but the trigger differs. An interrupt is asynchronous and hardware-generated - a
device (keyboard, timer, disk) raises it independent of the current instruction. A trap/exception is synchronous and
software-generated  by  the  executing  instruction  itself  -  a  divide-by-zero,  a  page  fault,  or  a  deliberate  system-call
instruction.

Mnemonic:  interrupts  come  from  outside  the  CPU  and  are  unpredictable;  traps  come  from  inside  the  running
instruction and are reproducible. Both are dispatched through the interrupt vector table to the appropriate handler.

Q19. [Medium]  What's the practical difference between a 32-bit and a 64-bit operating system?
MODEL ANSWER
The headline difference is addressable memory. A 32-bit address space is 2^32 bytes = 4 GB, so a 32-bit OS/process
can't  use  more  than  ~4  GB  of  RAM.  A  64-bit  system  addresses  2^64  bytes  (16  exabytes  in  theory;  current  CPUs
implement 48 bits ~ 256 TB), so it can use far more memory.

64-bit also means wider registers and the ability to operate on 64-bit integers in one instruction, plus more registers on
x86-64 which helps performance. The catch is pointers are 8 bytes instead of 4, so data structures full of pointers use
more memory. A 64-bit OS can run 32-bit apps (compatibility mode) but not vice-versa.

Q20. [Easy]  What is a shell?
MODEL ANSWER
A shell is the command interpreter - the program that reads your commands and asks the kernel to carry them out,
acting as the interface between the user and the kernel. It can be a CLI (bash, zsh, PowerShell) or conceptually a GUI
shell. When you type a command, the shell typically fork()s a child, exec()s the program in it, and wait()s for it to finish
- a neat real-world use of the process system calls.

Operating Systems  |  SDE Fresher Question Bank

Page 7

2. Processes & Process Management

Processes are the OS abstraction interviewers probe hardest after 'process vs thread'. Expect the state diagram, the
PCB, fork/exec mechanics, and the zombie/orphan questions in almost any core-CS round.

Q21. [Easy]  What are the different states of a process? Walk me through the state diagram.
n Universally asked
MODEL ANSWER
Five states. New - the process is being created. Ready - it has everything it needs and is waiting only for the CPU.
Running - currently executing on a CPU. Waiting/Blocked - waiting for an event such as I/O completion. Terminated
- finished execution.

Transitions:  New->Ready  (admitted),  Ready->Running  (scheduler  dispatch),  Running->Ready  (timer  interrupt  /
preemption), Running->Waiting (issues I/O or wait()), Waiting->Ready (event completes), Running->Terminated (exit).
The key insight is that a process leaves Running for two very different reasons - preempted (still runnable, goes to
Ready) vs blocked (not runnable, goes to Waiting).

Q22. [Medium]  What is a Process Control Block (PCB), and what does it contain?
MODEL ANSWER
The PCB is the kernel data structure that is the process from the OS's point of view - one per process, stored in the
kernel. It holds everything needed to manage and resume the process.

Contents: process ID and parent PID; process state; the CPU context (program counter and register values) saved on
a  context  switch;  scheduling  info  (priority,  queue  pointers);  memory-management  info  (page  tables  /  base-limit
registers); accounting info (CPU used, limits); and I/O status (open file descriptors, allocated devices). On a context
switch the OS saves the running process's registers into its PCB and loads the next process's PCB.

Q23. [Easy]  What are the segments of a process's address space?
MODEL ANSWER
Four  classic  segments.  Text/code  -  the  compiled  instructions  (read-only,  shareable).  Data  -  initialised  global  and
static  variables.  BSS  -  uninitialised  globals/statics  (often  grouped  with  data).  Heap  -  dynamically  allocated  memory
(malloc/new), grows upward. Stack - function call frames, local variables, return addresses, grows downward.

Heap  and  stack  grow  toward  each  other  in  the  address  space;  if  they  collide  you  get  a  stack  overflow  or
out-of-memory. This layout is exactly why local variables vanish after a function returns (stack unwinds) while heap
memory persists until you free it.

Q24. [Medium]  What is context switching, and what exactly is saved and restored?
n Very frequently asked
MODEL ANSWER
A context switch is the act of saving the state of the currently running process and loading the state of the next one, so
the CPU can be multiplexed among processes. It's triggered by a timer interrupt (preemption), a blocking system call,
or a higher-priority process becoming ready.

What's  saved  into  the  old  process's  PCB:  the  program  counter,  the  CPU  registers,  the  stack  pointer,  and
memory-management  state.  The  scheduler  then  picks  the  next  process  and  loads  its  saved  context  from  its  PCB,
including  switching  the  page-table  base  register  to  its  address  space.  Crucially  the  work  itself  produces  no  useful
computation - it's pure overhead the OS tries to minimise.

Q25. [Medium]  Why is a context switch considered expensive?
MODEL ANSWER
Two  reasons  -  the  direct  cost  and  the  hidden  cost.  Direct  cost:  saving/restoring  registers  and  updating  kernel  data
structures takes time during which no user work happens. The hidden, larger cost is the effect on caches: switching to
a different process means switching address spaces, which flushes the TLB (translation cache) and leaves the CPU
caches full of the old process's data.

So right after a switch the new process runs slowly because of TLB misses and cache misses until its working set is
warmed back up. This is precisely why switching between threads of the same process is cheaper - they share the
address space, so the TLB doesn't need a full flush.

Operating Systems  |  SDE Fresher Question Bank

Page 8

Q26. [Medium]  What does fork() do, and what does it return?
n Asked at Amazon, Microsoft
MODEL ANSWER
fork()  creates  a  new  child  process  that  is  a  near-duplicate  of  the  parent  -  same  code,  same  data,  same  open  file
descriptors - but with a distinct PID and its own address space (copy-on-write under the hood, so pages are shared
until one side writes).

It's famous for returning twice: in the parent it returns the child's PID (positive), in the child it returns 0, and on failure it
returns  -1  in  the  parent  and  no  child  is  created.  That  return  value  is  how  the  single  piece  of  code  after  fork()  tells
whether it's executing as the parent or the child.

Q27. [Medium]  What's the difference between fork() and exec()?
MODEL ANSWER
fork() creates a new process (a copy of the caller); exec() replaces the current process image with a new program.
exec() does not create a process - it keeps the same PID but overwrites the code, data, heap, and stack with the new
executable, so it never returns on success.

They're used together: a shell forks to create a child, then the child calls exec() to become the command you typed,
while the parent shell wait()s. This fork-then-exec pattern is the standard way Unix launches programs and is a great
thing to mention.

Q28. [Medium]  What is a zombie process, and how do you get rid of one?
n Asked at Amazon, Flipkart - a favourite
MODEL ANSWER
A zombie (defunct) process is one that has finished executing but still has an entry in the process table because its
parent hasn't read its exit status yet. The kernel keeps the PID and exit code around so the parent can retrieve them
via wait(). A zombie holds no memory or CPU - just a process-table slot.

It's  cleaned  up  ('reaped')  when  the  parent  calls  wait()/waitpid().  You  can't  kill  a  zombie  with  SIGKILL  -  it's  already
dead. The fix is to make the parent reap it, or if the parent itself dies the zombie is re-parented to init (PID 1), which
reaps it automatically. Lots of leaked zombies usually means a buggy parent that forks without ever waiting.

Q29. [Medium]  What is an orphan process?
MODEL ANSWER
An orphan is a process whose parent terminated before it did. Orphans don't cause problems: the OS immediately
re-parents  them  to  init/systemd  (PID  1),  which  adopts  them  and  will  reap  them  when  they  finish.  Contrast  with  a
zombie, which is the opposite situation - the child is dead and the parent is alive but negligent.

Q30. [Easy]  What is a daemon process?
MODEL ANSWER
A daemon is a long-running background process not attached to any terminal, typically started at boot to provide a
service - examples are sshd, cron, and the print spooler. Daemons usually detach from the controlling terminal, run
with init as their parent, and wait for events or requests. The '-d' suffix in many service names hints at 'daemon'.

Q31. [Medium]  What is the purpose of wait() / waitpid()?
MODEL ANSWER
wait()  lets  a  parent  block  until  one  of  its  children  terminates,  and  then  collect  that  child's  exit  status  -  which
simultaneously reaps the child so it doesn't linger as a zombie. waitpid() is the more flexible version: it can wait for a
specific  child  by  PID  and  supports  options  like  WNOHANG  (poll  without  blocking).  Beyond  cleanup,  this  is  how  a
parent synchronises with and learns the outcome of work it delegated to children.

Q32. [Medium]  What are the three types of schedulers - long-term, short-term, and medium-term?
MODEL ANSWER
Long-term  scheduler  (job  scheduler)  -  decides  which  jobs  are  admitted  from  the  job  pool  into  the  ready  queue;  it
controls  the  degree  of  multiprogramming  and  runs  infrequently.  Short-term  scheduler  (CPU  scheduler)  -  picks
which ready process runs next on the CPU; runs very frequently (milliseconds) so it must be fast.

Medium-term scheduler - handles swapping: it temporarily removes processes from memory to disk (suspends them)
to  reduce  contention  or  free  RAM,  and  brings  them  back  later.  Modern  desktop  OSes  lean  on  the  short-  and
medium-term schedulers; the long-term scheduler is most visible in batch systems.

Operating Systems  |  SDE Fresher Question Bank

Page 9

Q33. [Easy]  What is the degree of multiprogramming?
MODEL ANSWER
It's the number of processes resident in main memory at the same time. A higher degree keeps the CPU busier (more
chances that something is runnable when one process blocks on I/O), but push it too high and you exceed physical
memory and start thrashing. The long-term/medium-term schedulers control this number.

Q34. [Easy]  What is swapping?
MODEL ANSWER
Swapping is moving an entire process (or pages of it) between main memory and a backing store on disk (the swap
space). The OS swaps a process out to free RAM when memory is tight and swaps it back in when it's ready to run
again. It lets the system support more processes than physically fit in RAM, but heavy swapping is slow because disk
is orders of magnitude slower than memory - and excessive swapping is the symptom of thrashing.

Q35. [Medium]  What's the difference between a CPU-bound and an I/O-bound process?
MODEL ANSWER
A CPU-bound process spends most of its time computing (long CPU bursts, few I/O operations) - think video encoding
or a number cruncher. An I/O-bound process spends most of its time waiting on I/O with short CPU bursts - think a
text editor or a database client.

A  good  scheduler  mixes  them:  I/O-bound  processes  should  get  the  CPU  quickly  (they'll  use  it  briefly  then  block,
keeping devices busy), while CPU-bound ones can run when nothing else needs the CPU. A ready queue full of only
CPU-bound jobs leaves devices idle; only I/O-bound jobs leaves the CPU idle.

Q36. [Medium]  What's the difference between a mode switch and a context switch?
MODEL ANSWER
A mode switch is just the CPU changing privilege level (user to kernel and back) during a system call or interrupt -
the  same  process  keeps  running,  only  the  privilege  changes,  and  it's  relatively  cheap.  A  context  switch  changes
which process is running: it saves one process's full state and loads another's.

Every context switch involves mode switches, but not every mode switch is a context switch - a system call usually
does its work and returns to the same process without ever switching processes. People conflate these, so calling out
the distinction scores points.

Q37. [Hard]  If a program calls fork() n times in a loop, how many processes are created?
n Asked at Amazon, Adobe - the classic fork puzzle
MODEL ANSWER
Each  fork()  doubles  the  number  of  processes,  because  both  the  parent  and  every  existing  child  execute  the  next
fork(). After n forks you have 2^n processes total, which means 2^n - 1 new child processes were created (subtracting
the original).

So three forks in a row -> 2^3 = 8 processes, i.e. 7 children. The trap is forgetting that the children also continue the
loop and fork again. If they ask about printf after the forks, the count of lines printed is also 2^n (and buffering can
multiply that if output isn't flushed before forking - a nice follow-up to mention).

Q38. [Easy]  What's the difference between cooperating and independent processes?
MODEL ANSWER
Independent  processes  neither  affect  nor  are  affected  by  others  -  they  share  no  data  and  their  execution  is
self-contained. Cooperating processes share data or resources and can influence each other, which is why they need
IPC  and  synchronisation  to  avoid  race  conditions.  Cooperation  buys  you  information  sharing,  modularity,  and
speed-up, at the cost of needing mechanisms like semaphores and message passing.

Q39. [Easy]  What is cascading termination?
MODEL ANSWER
Cascading termination is when terminating a parent process forces the OS to also terminate all of its children (and
their descendants), because the system doesn't allow a child to outlive its parent. It's initiated by the OS. Note this is a
policy choice - Unix instead re-parents children to init rather than killing them, so cascading termination is more of a
'some systems do this' concept.

Operating Systems  |  SDE Fresher Question Bank

Page 10

Q40. [Easy]  What are the job queue, ready queue, and device queue?
MODEL ANSWER
These are the scheduling queues a process moves between. The job queue holds all processes in the system. The
ready queue holds processes in main memory that are ready and waiting for the CPU. A device (I/O) queue holds
processes waiting for a particular device. A process cycles: it's dispatched from the ready queue to run, may move to
a device queue when it issues I/O, then returns to the ready queue when the I/O finishes.

Q41. [Medium]  What happens when a process calls exit()?
MODEL ANSWER
exit()  ends  the  process:  the  OS  reclaims  most  of  its  resources  -  closes  open  files,  frees  its  memory,  releases  I/O
devices - and stores the exit status. But the process isn't fully gone until the parent reaps it: it remains as a zombie (a
process-table entry holding just the PID and exit code) until the parent calls wait(). If the parent has already exited, init
adopts and reaps it.

Q42. [Medium]  What is a fork bomb?
MODEL ANSWER
A fork bomb is a process that rapidly forks children in an infinite loop, each of which forks more, so the process count
grows  exponentially  until  the  process  table  is  full  and  the  system  grinds  to  a  halt  -  a  denial-of-service  via  resource
exhaustion. The shell one-liner ':(){ :|:& };:' is the classic example. The defense is limiting the number of processes per
user (ulimit -u / cgroups pids limit), so the OS refuses further forks before the machine dies.

Q43. [Medium]  After fork(), do the parent and child share variables?
MODEL ANSWER
No - they get separate copies. After fork() the child has its own address space that's initially identical to the parent's,
but it's a copy: if the child changes a variable, the parent doesn't see it and vice-versa. Modern kernels implement this
with copy-on-write - the pages are shared read-only until one side writes, at which point that page is duplicated - so
fork()  is  fast  and  memory-efficient  without  sacrificing  isolation.  To  actually  share  data  they'd  need  explicit  IPC  like
shared memory.

Operating Systems  |  SDE Fresher Question Bank

Page 11

3. Threads, Concurrency & Parallelism

'Process vs thread' is the single most-asked OS question - know it cold. The rest of this section is about what threads
share, how they're scheduled, and the concurrency vocabulary (concurrency vs parallelism, thread pools) that backend
roles expect.

Q44. [Easy]  What is a thread?
MODEL ANSWER
A thread is the smallest unit of execution within a process - a single sequential flow of control with its own program
counter, register set, and stack, but sharing the process's code, heap, and global data with sibling threads. Because
of that sharing, threads are called 'lightweight processes': you can have many threads in one process cooperating on
a task, communicating cheaply through shared memory.

Q45. [Easy]  Process vs thread - give me the full comparison.
n THE most asked OS question - Amazon, Microsoft, every company
MODEL ANSWER
A process is an independent program in execution with its own address space; a thread is a unit of execution inside a
process that shares that address space with sibling threads. The differences cascade from there.

Memory: processes are isolated (separate address spaces); threads share code, heap, and globals but each has its
own  stack  and  registers.  Communication:  processes  need  IPC  (pipes,  shared  memory,  sockets);  threads  just
read/write shared variables. Cost: creating and context-switching processes is expensive (new address space, TLB
flush); threads are cheaper (same address space). Robustness: a crash in one process can't directly corrupt another,
but one misbehaving thread can crash the whole process. So the trade-off is isolation (processes) vs cheap sharing
and speed (threads).

Q46. [Medium]  What do threads of the same process share, and what is private to each thread?
n Common follow-up to process vs thread
MODEL ANSWER
Shared across all threads: the code/text segment, the heap, global and static variables, open file descriptors, and the
process's address space and signal handlers. Private to each thread: its own stack (so local variables are per-thread),
its register set, its program counter, and its thread ID.

This  split  explains  the  bugs  and  the  benefits  at  once  -  sharing  the  heap  and  globals  is  what  makes  threads  fast  to
communicate,  and  also  exactly  what  creates  race  conditions,  while  the  per-thread  stack  is  why  local  variables  are
naturally thread-safe.

Q47. [Easy]  What are the benefits of multithreading?
MODEL ANSWER
Four standard benefits. Responsiveness - one thread can keep handling the UI while another does slow work, so the
app doesn't freeze. Resource sharing - threads share memory by default, so no costly IPC. Economy - creating and
switching threads is far cheaper than processes. Scalability - on a multicore CPU, threads run in true parallel across
cores, so the program actually gets faster with more cores.

Q48. [Medium]  What's the difference between user-level and kernel-level threads?
MODEL ANSWER
User-level threads are managed by a thread library in user space; the kernel sees only the single process and isn't
aware of them. They're fast to create and switch (no kernel involvement), but if one thread makes a blocking system
call the whole process blocks, and they can't exploit multiple cores on their own.

Kernel-level threads are managed and scheduled by the OS directly. They can run in parallel on different cores and
one blocking thread doesn't stall the others, but creation and switching are more expensive because they involve the
kernel. Real systems map user threads onto kernel threads via the models below.

Operating Systems  |  SDE Fresher Question Bank

Page 12

Q49. [Medium]  What are the multithreading models (many-to-one, one-to-one, many-to-many)?
MODEL ANSWER
They describe how user threads map to kernel threads. Many-to-one: many user threads multiplexed onto one kernel
thread - fast but no real parallelism and one blocking call blocks all. One-to-one: each user thread maps to its own
kernel thread - true parallelism and independent blocking, but thread count is limited by kernel overhead. This is what
Linux and Windows use today.

Many-to-many:  multiplex  M  user  threads  onto  N  (N<=M)  kernel  threads  -  the  flexible  compromise  that  gives
parallelism without one kernel thread per user thread. Language runtimes like Go take this approach (goroutines onto
OS threads).

Q50. [Medium]  What's the difference between concurrency and parallelism?
n Asked at product companies (backend roles)
MODEL ANSWER
Concurrency is about dealing with many things at once - structuring a program so multiple tasks are in progress over
the same period, making progress by interleaving. It can happen on a single core via time-slicing. Parallelism is about
doing many things at literally the same instant, which requires multiple cores/CPUs.

Rob Pike's line captures it: concurrency is composition of independently executing tasks; parallelism is simultaneous
execution.  You  can  have  concurrency  without  parallelism  (one  core  switching  between  tasks)  and  you  design  for
concurrency so that when parallel hardware exists, the program scales onto it.

Q51. [Medium]  What is a thread pool and why use one?
MODEL ANSWER
A thread pool is a set of pre-created worker threads that pull tasks from a shared queue. Instead of spawning a new
thread per task and destroying it after, you reuse a fixed set of threads to service an unbounded stream of tasks.

Benefits:  it  avoids  the  cost  of  constant  thread  creation/teardown,  and  it  bounds  concurrency  so  a  flood  of  requests
can't spawn thousands of threads and exhaust memory or thrash the scheduler. This is the standard model for web
servers  -  N  workers  handling  many  connections  -  and  a  great  thing  to  mention  because  it  shows  you  think  about
resource limits, not just correctness.

Q52. [Medium]  When would you choose multithreading over multiprocessing, and vice-versa?
MODEL ANSWER
Use multithreading when tasks need to share a lot of data cheaply and you want low overhead - the shared address
space makes communication trivial. Use multiprocessing when you need isolation/fault-tolerance (one crash shouldn't
kill  everything),  stronger  security  boundaries,  or  -  importantly  in  Python  -  to  sidestep  a  Global  Interpreter  Lock  that
prevents threads from running CPU-bound work in parallel.

Rule  of  thumb:  I/O-bound  and  shared-state  work  leans  toward  threads;  CPU-bound  work  needing  real  parallel
isolation, or anything where a fault must be contained, leans toward processes.

Q53. [Medium]  Can multithreading improve performance on a single-core CPU?
MODEL ANSWER
Yes, for I/O-bound workloads. On a single core you get no true parallelism for computation, but while one thread is
blocked  waiting  on  disk  or  network,  another  thread  can  use  the  CPU.  So  overall  throughput  and  responsiveness
improve because you're overlapping computation with waiting.

For purely CPU-bound work on a single core, multithreading won't speed things up - you're sharing one CPU, and the
context-switching overhead can even make it slightly slower. The benefit there only appears with multiple cores.

Q54. [Medium]  Why is creating and switching threads cheaper than processes?
MODEL ANSWER
Because  threads  share  the  process's  address  space.  Creating  a  thread  doesn't  require  setting  up  a  new  address
space, page tables, or copying memory - it mainly needs a new stack and a small thread structure. Switching between
threads of the same process keeps the same page tables, so the TLB doesn't need a full flush and much of the CPU
cache stays warm.

Switching between processes changes the address space, forcing a TLB flush and cold caches afterward - that's the
expensive hidden cost. Same-process thread switches avoid most of it.

Operating Systems  |  SDE Fresher Question Bank

Page 13

Q55. [Medium]  What is a race condition?
n Asked everywhere
MODEL ANSWER
A  race  condition  is  when  the  correctness  of  a  program  depends  on  the  relative  timing  or  interleaving  of  concurrent
operations on shared data - and at least one is a write. The outcome 'races' on who runs first.

Canonical example: two threads both do counter = counter + 1, which is really read-modify-write. If they both read the
same old value before either writes back, one increment is lost. The fix is to make the critical section atomic with a
lock, semaphore, or atomic instruction so only one thread updates the shared variable at a time.

Q56. [Medium]  What does it mean for code to be thread-safe?
MODEL ANSWER
Thread-safe  code  behaves  correctly  when  called  from  multiple  threads  simultaneously,  with  no  data  races  or
corruption,  regardless  of  how  the  threads  interleave.  You  achieve  it  by  protecting  shared  mutable  state  with
synchronisation  (locks,  atomics),  by  avoiding  shared  state  altogether  (immutability,  thread-local  data),  or  by  using
already-thread-safe data structures.

Worth noting: thread-safety isn't free - locks add contention and can hurt scalability - so the best thread-safe designs
often minimise shared mutable state rather than locking everything.

Q57. [Medium]  What's the difference between OS threads and language-level threads like goroutines?
n Relevant to Go/backend roles
MODEL ANSWER
OS  (kernel)  threads  are  scheduled  by  the  operating  system  and  are  relatively  heavy  -  each  has  a  fixed-size  stack
(often ~1-8 MB) and switching involves the kernel. Language-level threads / green threads (goroutines in Go, virtual
threads in Java) are scheduled by the language runtime in user space and are extremely lightweight - tiny growable
stacks (a few KB), so you can run millions of them.

The runtime multiplexes these many user-space threads onto a small pool of OS threads (the many-to-many model).
The win is you write simple blocking-style concurrent code while the runtime efficiently parks/wakes goroutines onto
real threads - far cheaper than one OS thread per task.

Q58. [Medium]  What happens to a process's threads when the process exits, and what is the main
thread?
MODEL ANSWER
The main thread is the initial thread created when the process starts (the one running main()). When the process exits
-  whether  the  main  thread  returns  or  any  thread  calls  exit()  -  the  entire  process  terminates  and  all  its  threads  are
destroyed immediately, because they live inside the process's address space which is being torn down. If you want a
thread to finish its work first, you join it before exiting; otherwise it's killed mid-flight.

Q59. [Medium]  What is thread-local storage (TLS)?
MODEL ANSWER
Thread-local storage gives each thread its own private copy of a variable even though the variable is declared once.
Reads and writes by one thread don't affect another's copy. It's used for per-thread context that you don't want to pass
around explicitly or guard with locks - for example errno, a per-thread random-number seed, or a per-request context
in a server. It's a way to get safe, lock-free per-thread state by avoiding sharing entirely.

Operating Systems  |  SDE Fresher Question Bank

Page 14

4. CPU Scheduling

High-yield and very testable, because it mixes concept questions with numericals you can be made to solve on the spot.
Know each algorithm's idea, its one fatal flaw, and be able to draw a Gantt chart and compute average waiting /
turnaround time fast.

Q60. [Easy]  What is CPU scheduling and why do we need it?
MODEL ANSWER
CPU  scheduling  is  the  OS  deciding  which  ready  process  gets  the  CPU  next.  We  need  it  because  in  a
multiprogrammed system many processes are ready at once but a core can run only one at a time, so the scheduler
multiplexes the CPU to maximise utilisation and keep the system responsive.

It  exploits  the  CPU-I/O  burst  cycle:  whenever  the  running  process  blocks  on  I/O,  the  scheduler  hands  the  CPU  to
someone else instead of letting it sit idle.

Q61. [Medium]  What are the scheduling criteria - the metrics a scheduler tries to optimise?
MODEL ANSWER
CPU  utilisation  -  keep  the  CPU  as  busy  as  possible.  Throughput  -  processes  completed  per  unit  time.  Turnaround
time - total time from submission to completion. Waiting time - time spent sitting in the ready queue. Response time -
time from submission to the first response (matters most for interactive systems).

The  tension  is  that  you  can't  maximise  all  at  once  -  we  generally  want  high  utilisation  and  throughput,  and  low
turnaround, waiting, and response times. Batch systems optimise throughput/turnaround; interactive systems optimise
response time.

Q62. [Medium]  What's the difference between preemptive and non-preemptive scheduling?
n Commonly asked
MODEL ANSWER
Non-preemptive: once a process gets the CPU it keeps it until it finishes or voluntarily blocks (on I/O). Simpler, but a
long job can hog the CPU and hurt response time. FCFS and basic SJF are non-preemptive.

Preemptive:  the  OS  can  forcibly  take  the  CPU  away  -  on  a  timer  interrupt  (Round  Robin)  or  when  a
higher-priority/shorter job arrives (SRTF, preemptive priority). It gives better responsiveness and fairness but needs
careful synchronisation, because a process can be interrupted mid-update of shared data, which is the root of race
conditions.

Q63. [Medium]  Explain FCFS scheduling and the convoy effect.
n Asked at service & product companies
MODEL ANSWER
First-Come-First-Served runs processes in arrival order, non-preemptively, using a FIFO queue. It's the simplest and
fairest in an ordering sense, but it suffers from the convoy effect: if one long CPU-bound process arrives first, all the
short ones queue behind it, inflating average waiting time - like one slow truck holding up a line of cars.

Example: bursts P1=24, P2=3, P3=3 arriving in that order give waiting times 0, 24, 27 -> average 17. Reverse the
order so the short jobs go first and the average drops to 3. Same jobs, 5x better - that's the convoy effect, and it's why
FCFS alone is rarely used.

Q64. [Medium]  Work through a FCFS numerical: bursts P1=24, P2=3, P3=3, arriving together in order P1,
P2, P3.
MODEL ANSWER
Draw the Gantt chart in arrival order, then waiting time = start time (all arrive at 0), and turnaround = completion time.

Gantt:  | P1        | P2 | P3 |
        0          24   27   30

Waiting:    P1=0,  P2=24, P3=27   -&gt; avg = 51/3 = 17
Turnaround: P1=24, P2=27, P3=30   -&gt; avg = 81/3 = 27

If instead the short jobs ran first (P2, P3, P1), waiting times become 0, 3, 6 -> average 3. The huge gap demonstrates
the convoy effect and motivates SJF.

Operating Systems  |  SDE Fresher Question Bank

Page 15

Q65. [Medium]  Explain SJF scheduling. Is it optimal? What's its drawback?
n Asked at Amazon, Microsoft
MODEL ANSWER
Shortest-Job-First picks the process with the smallest next CPU burst. It is provably optimal for minimising average
waiting time - putting shorter jobs first reduces the cumulative wait of everyone behind them.

Two drawbacks. First, it can starve long jobs: a steady stream of short jobs means a long one may never run (fixed
with aging). Second, and more fundamentally, you can't know the next burst length in advance - so real schedulers
estimate it by exponential averaging of past bursts. SJF comes in non-preemptive and preemptive (SRTF) flavours.

Q66. [Hard]  Work through an SJF numerical and compare it to FCFS: bursts P1=6, P2=8, P3=7, P4=3 (all
at time 0).
MODEL ANSWER
Non-preemptive SJF runs them shortest-first: P4(3), P1(6), P3(7), P2(8).

SJF Gantt:  | P4 | P1    | P3     | P2      |
            0    3     9       16        24

Waiting:  P4=0, P1=3, P3=9, P2=16  -&gt; avg = 28/4 = 7.0

FCFS (order P1,P2,P3,P4) waiting:
          P1=0, P2=6, P3=14, P4=21 -&gt; avg = 41/4 = 10.25

SJF gives 7.0 vs FCFS's 10.25 average waiting time on the identical workload - a concrete demonstration of SJF's
optimality.

Q67. [Medium]  What is SRTF (Shortest Remaining Time First)?
MODEL ANSWER
SRTF is the preemptive version of SJF: at every moment - including whenever a new process arrives - the CPU is
given to the process with the smallest remaining burst, preempting the current one if a shorter job appears. It pushes
average  waiting  time  even  lower  than  non-preemptive  SJF,  at  the  cost  of  more  context  switches  and  the  same
starvation risk for long jobs.

Q68. [Hard]  How does a scheduler predict the next CPU burst for SJF?
MODEL ANSWER
It can't know it exactly, so it estimates using exponential averaging of previous bursts. The prediction is tau(n+1) =
alpha  *  t(n)  +  (1  -  alpha)  *  tau(n),  where  t(n)  is  the  actual  length  of  the  most  recent  burst,  tau(n)  was  the  previous
prediction, and alpha (0..1) weights recent history.

alpha  =  0  ignores  recent  behaviour  (prediction  never  changes);  alpha  =  1  uses  only  the  last  burst;  alpha  =  0.5  is
common, blending recent and historical bursts. It's a nice answer because it shows you know SJF is theoretical and
how it's approximated in practice.

Q69. [Medium]  Explain priority scheduling, and the starvation problem with its fix.
n Commonly asked
MODEL ANSWER
Each  process  gets  a  priority  and  the  CPU  goes  to  the  highest-priority  ready  process  (can  be  preemptive  or
non-preemptive). SJF is actually a special case where priority = inverse of next burst length.

The  problem  is  starvation/indefinite  blocking:  a  low-priority  process  may  never  run  if  higher-priority  ones  keep
arriving. The fix is aging - gradually increasing a process's priority the longer it waits, so eventually even a low-priority
job rises to the top and runs. (Legend: when MIT shut down an IBM 7094 in 1973 they found a low-priority job from
1967 still waiting.)

Q70. [Medium]  Explain Round Robin scheduling and how the time quantum affects it.
n Asked at Amazon, Microsoft
MODEL ANSWER
Round Robin is FCFS with preemption: each process gets the CPU for one fixed time quantum, then it's preempted
and sent to the back of the ready queue. It's designed for time-sharing because it guarantees bounded response time
- no process waits more than (n-1) quanta.

The quantum size is the whole game. Too large and RR degenerates into FCFS (poor response). Too small and you
spend more time context-switching than computing (overhead). The rule of thumb is to make the quantum a bit larger

Operating Systems  |  SDE Fresher Question Bank

Page 16

than a typical CPU burst - often 10-100 ms - so most processes finish a burst within their quantum but no one hogs
the CPU.

Q71. [Hard]  Work through a Round Robin numerical: bursts P1=24, P2=3, P3=3, time quantum = 4.
MODEL ANSWER
Each process runs at most 4 units, then rejoins the back of the queue.

Gantt: |P1 |P2|P3|P1 |P1 |P1 |P1 |P1 |
       0   4  7 10  14  18  22  26  30

Completion: P1=30, P2=7, P3=10
Turnaround: P1=30, P2=7, P3=10
Waiting = TAT - burst:
          P1=6, P2=4, P3=7  -&gt; avg = 17/3 = 5.67
Response:  P1=0, P2=4, P3=7

Note RR's average waiting (5.67) is higher than SJF would give, but its response time is excellent - P2 and P3 start
within 7 units - which is exactly the trade RR makes for interactivity.

Q72. [Medium]  What is Multilevel Queue scheduling?
MODEL ANSWER
It  partitions  the  ready  queue  into  several  separate  queues  by  process  type  -  e.g.  a  high-priority  queue  for
interactive/foreground processes and a lower one for batch/background - each with its own scheduling algorithm (say
RR  for  foreground,  FCFS  for  background).  There's  also  scheduling  between  queues,  usually  fixed  priority  (serve
foreground first) or time-slicing across queues. The limitation is that a process is permanently assigned to one queue
and can't move.

Q73. [Hard]  What is Multilevel Feedback Queue (MLFQ) scheduling?
MODEL ANSWER
MLFQ  fixes  the  rigidity  of  multilevel  queues  by  letting  processes  move  between  queues  based  on  observed
behaviour.  New  processes  enter  the  top  (highest-priority,  short-quantum)  queue;  if  a  process  uses  up  its  quantum
(CPU-bound), it's demoted to a lower-priority queue with a longer quantum; processes that yield/block early stay high.

The effect is elegant: interactive, I/O-bound jobs naturally float to the top (great response time) while CPU-bound jobs
sink to the bottom (they get longer uninterrupted slices but lower priority). Periodic priority boosts prevent starvation. It
approximates SJF without needing to know burst lengths, which is why real schedulers resemble it.

Q74. [Easy]  Define turnaround time, waiting time, and response time.
MODEL ANSWER
Turnaround  time  =  completion  time  -  arrival  time:  the  total  time  the  process  spends  in  the  system.  Waiting  time  =
turnaround time - CPU burst time: the time spent waiting in the ready queue (not executing, not doing I/O). Response
time  =  time  of  first  CPU  response  -  arrival  time:  how  long  until  the  process  first  starts  producing  output.  Interactive
systems care about response time; batch systems care about turnaround.

Q75. [Easy]  What is the dispatcher, and what is dispatch latency?
MODEL ANSWER
The  dispatcher  is  the  module  that  actually  hands  the  CPU  to  the  process  the  scheduler  selected  -  it  performs  the
context switch, switches to user mode, and jumps to the right instruction to resume the process. Dispatch latency is
the time it takes to stop one process and start another. The scheduler decides; the dispatcher does. Dispatch latency
should be minimal since it's pure overhead.

Q76. [Medium]  Which scheduling algorithm fits interactive, batch, and real-time systems respectively?
MODEL ANSWER
Interactive/time-sharing: Round Robin or MLFQ - bounded response time is what users feel. Batch: FCFS or SJF - no
users  waiting,  so  optimise  throughput  and  turnaround.  Real-time:  priority-based  algorithms  like  Rate  Monotonic  or
Earliest  Deadline  First  -  correctness  depends  on  meeting  deadlines,  so  the  highest-priority/most-urgent  task  must
preempt immediately.

Operating Systems  |  SDE Fresher Question Bank

Page 17

Q77. [Medium]  What's the difference between starvation and a deadlock?
MODEL ANSWER
Starvation is when a process waits indefinitely because the scheduling/resource policy keeps favouring others - but
the system as a whole is making progress, and in principle the starved process could still run (aging fixes it). Deadlock
is  when  a  set  of  processes  are  all  blocked  waiting  on  each  other  in  a  cycle,  so  none  can  ever  proceed  without
intervention. Short version: in starvation the system progresses but one victim doesn't; in deadlock nobody in the set
progresses.

Q78. [Easy]  What is the CPU-I/O burst cycle?
MODEL ANSWER
Process execution alternates between CPU bursts (doing computation) and I/O bursts (waiting for I/O). A process is
essentially a sequence: CPU burst, I/O burst, CPU burst, and so on, ending with a CPU burst. CPU-bound processes
have long, infrequent CPU bursts; I/O-bound processes have many short CPU bursts. Scheduling exists precisely to
use the CPU during another process's I/O bursts.

Operating Systems  |  SDE Fresher Question Bank

Page 18

5. Process Synchronization

The conceptual heart of OS interviews and the source of the hardest follow-ups. Nail the critical-section requirements,
mutex vs semaphore (the ownership distinction), and at least one classic problem (producer-consumer) end to end.

Q79. [Medium]  What is the critical section problem?
n Foundational - asked everywhere
MODEL ANSWER
A critical section is the part of code where a process accesses shared resources (variables, files, data structures). The
problem is ensuring that when one process is executing in its critical section, no other process is allowed in its critical
section for the same resource - otherwise concurrent updates interleave and corrupt the data (a race condition).

The structure is: entry section (request permission) -> critical section -> exit section (release) -> remainder section.
The whole field of synchronisation is about implementing those entry/exit sections correctly.

Q80. [Medium]  What three requirements must any correct solution to the critical-section problem satisfy?
MODEL ANSWER
Mutual exclusion - at most one process in the critical section at a time. Progress - if no one is in the critical section
and some processes want in, the selection of who goes next can't be postponed indefinitely; only contenders decide,
and  they  must  decide.  Bounded  waiting  -  there's  a  limit  on  how  many  times  others  can  enter  before  a  waiting
process gets its turn, so no starvation.

Mutual exclusion is about safety; progress and bounded waiting are about liveness/fairness. A lock that gives mutual
exclusion but lets one thread monopolise the section violates bounded waiting.

Q81. [Hard]  Explain Peterson's solution.
MODEL ANSWER
Peterson's  algorithm  is  a  classic  software-only  solution  to  the  critical-section  problem  for  two  processes,  using  two
shared variables: a flag[] array (do I want in?) and a turn variable (whose turn is it?).

// process i (j is the other)
flag[i] = true;     // I want to enter
turn  = j;          // but let you go first
while (flag[j] &amp;&amp; turn == j)
    ;               // busy-wait
// --- critical section ---
flag[i] = false;    // I'm done

By setting turn = j after raising its own flag, each process defers to the other, and the combination guarantees mutual
exclusion, progress, and bounded waiting. The caveat: it assumes sequential consistency, so on modern CPUs that
reorder memory it needs memory barriers to actually work - which is why we use hardware atomics in practice.

Q82. [Hard]  What hardware support exists for synchronisation - Test-and-Set and Compare-and-Swap?
MODEL ANSWER
These  are  atomic  instructions  the  CPU  guarantees  execute  indivisibly,  which  is  what  lets  us  build  locks  correctly.
Test-and-Set atomically reads a lock variable and sets it to true, returning the old value - if it returns false, you got the
lock. Compare-and-Swap (CAS) atomically checks whether a memory location equals an expected value and, only if
so, swaps in a new value, reporting success.

Without atomicity, the read-modify-write of acquiring a lock could itself be interrupted, recreating the race. CAS is the
more powerful primitive and underpins lock-free data structures and the atomic types in modern languages.

Q83. [Easy]  What is a mutex?
MODEL ANSWER
A mutex (mutual-exclusion lock) is a synchronisation primitive that allows exactly one thread into a critical section at a
time. A thread locks/acquires it before the section and unlocks/releases it after; any other thread that tries to lock it
blocks until it's released. Crucially a mutex has the notion of ownership - the thread that locked it is the one that must
unlock it.

Operating Systems  |  SDE Fresher Question Bank

Page 19

Q84. [Medium]  What is a semaphore, and what are the wait() and signal() operations?
n Asked at Amazon, Microsoft
MODEL ANSWER
A semaphore is an integer counter with two atomic operations used to control access to a pool of resources. wait()
(also  called  P  or  down)  decrements  the  counter  and,  if  it  goes  negative,  blocks  the  caller  until  a  resource  is  free.
signal() (V or up) increments the counter and wakes a waiting process if any.

The count represents available units of a resource. A semaphore initialised to 1 acts as a lock (binary semaphore);
initialised to N it permits up to N concurrent users - for example limiting a connection pool to N connections.

Q85. [Medium]  What's the difference between a binary semaphore and a counting semaphore?
MODEL ANSWER
A binary semaphore takes only values 0 and 1, so it's used for mutual exclusion over a single resource - functionally
like a lock. A counting semaphore can take any non-negative value and controls access to a resource with multiple
identical  units  -  initialise  it  to  the  number  of  units  (say  5  database  connections)  and  it  lets  up  to  that  many  threads
proceed concurrently, blocking the rest until one signals.

Q86. [Medium]  Mutex vs semaphore - what's the real difference?
n Asked at Amazon, Adobe, Flipkart - very common
MODEL ANSWER
The  headline  difference  is  ownership  and  purpose.  A  mutex  is  a  locking  mechanism  owned  by  the  thread  that
acquires  it  -  only  that  thread  can  release  it  -  and  it's  meant  for  mutual  exclusion.  A  semaphore  is  a  signalling
mechanism with no ownership: any thread can signal it, including a different thread than the one that waited.

That ownership difference matters: because a semaphore can be signalled by anyone, it's ideal for signalling between
threads (producer signals consumer), whereas a mutex is for protecting a critical section. Also a binary semaphore
can  be  used  to  signal  from  an  interrupt  handler;  a  mutex  cannot.  Common  one-liner:  'a  mutex  is  for  locking,  a
semaphore is for counting/signalling.'

Q87. [Medium]  What is a spinlock / busy-waiting, and when is it appropriate?
MODEL ANSWER
A  spinlock  makes  a  thread  loop  ('spin')  repeatedly  checking  a  lock  until  it's  free,  instead  of  going  to  sleep.
Busy-waiting  wastes  CPU  cycles,  which  sounds  bad  -  but  it  avoids  the  cost  of  a  context  switch  (blocking  and  later
waking the thread).

So  spinlocks  win  when  the  lock  is  held  very  briefly  and  you're  on  a  multicore  system  -  spinning  for  a  few  cycles  is
cheaper than two context switches. They're terrible on a single core (you spin while the lock holder can't run) or for
long critical sections. Real systems use hybrids: spin briefly, then block.

Q88. [Medium]  What is a monitor?
MODEL ANSWER
A  monitor  is  a  higher-level  synchronisation  construct  that  bundles  shared  data  together  with  the  procedures  that
operate on it, and guarantees that only one thread can be active inside the monitor at a time - mutual exclusion is
automatic,  you  don't  manually  lock/unlock.  It  also  provides  condition  variables  for  threads  to  wait  for  specific
conditions.

It's safer than raw semaphores because the mutual exclusion is built in and scoped to the object, so you can't forget to
release a lock. Java's synchronized methods and every-object's wait()/notify() are essentially the monitor concept.

Q89. [Medium]  What is a condition variable?
MODEL ANSWER
A condition variable lets a thread wait for a particular condition to become true while inside a monitor/holding a mutex.
It supports wait() - atomically release the lock and sleep until signalled - and signal()/notify() - wake a waiting thread.
The classic use is the bounded buffer: a consumer wait()s on 'not empty' and the producer signal()s it after adding an
item.

Key subtlety: always re-check the condition in a while loop after waking (not an if), because of spurious wakeups and
because another thread might have changed the state between the signal and your reacquiring the lock.

Operating Systems  |  SDE Fresher Question Bank

Page 20

Q90. [Hard]  Explain the producer-consumer (bounded buffer) problem and a semaphore solution.
n Asked at Amazon, Microsoft - the #1 classic
MODEL ANSWER
Producers add items to a fixed-size shared buffer and consumers remove them. We must ensure a producer doesn't
add to a full buffer, a consumer doesn't remove from an empty one, and they don't corrupt the buffer by accessing it
simultaneously.

The standard solution uses three semaphores: empty (count of free slots, init N), full (count of filled slots, init 0), and
mutex (init 1) for exclusive buffer access.

Producer:                 Consumer:
wait(empty);              wait(full);
wait(mutex);              wait(mutex);
  add item to buffer;       remove item;
signal(mutex);            signal(mutex);
signal(full);             signal(empty);

empty/full  handle  the  counting  (block  when  buffer  full/empty),  mutex  handles  mutual  exclusion.  Order  matters:  you
must wait on empty/full before mutex - reverse them and you can deadlock (grab mutex, then block on a full buffer
while holding it).

Q91. [Hard]  Explain the readers-writers problem.
MODEL ANSWER
Multiple  threads  share  data;  readers  only  read,  writers  modify.  The  rules:  any  number  of  readers  may  read
simultaneously (reading doesn't conflict), but a writer needs exclusive access - no other reader or writer while it writes.

The solution uses a read-count guarded by a mutex plus a write lock: the first reader acquires the write lock (blocking
writers)  and  the  last  reader  releases  it;  writers  simply  take  the  write  lock.  The  catch  is  fairness  -  a  naive
'readers-preference' solution can starve writers if readers keep arriving, so real solutions add writer-preference or a
queue. This maps directly to read-write locks (RWMutex) you use in real code.

Q92. [Hard]  Explain the dining philosophers problem and how to avoid deadlock in it.
n Asked at Amazon, Microsoft
MODEL ANSWER
Five philosophers sit around a table with one fork between each pair; a philosopher needs both adjacent forks to eat.
If every philosopher picks up their left fork simultaneously, each holds one and waits forever for the right - a deadlock
(it satisfies all four Coffman conditions, notably circular wait).

Fixes  that  break  a  condition:  (1)  allow  at  most  four  philosophers  at  the  table  at  once  (breaks  hold-and-wait/circular
wait); (2) pick up both forks only if both are available (atomic acquisition); or the cleanest - (3) resource ordering:
number  the  forks  and  require  each  philosopher  to  pick  up  the  lower-numbered  fork  first.  Then  one  philosopher
reaches for the same fork as a neighbour and the cycle can't form. It's the canonical illustration of deadlock and how
ordering resources prevents it.

Q93. [Hard]  What is priority inversion?
n Asked at product/systems companies
MODEL ANSWER
Priority  inversion  is  when  a  high-priority  task  is  blocked  waiting  on  a  resource  held  by  a  low-priority  task,  and  a
medium-priority  task  that  doesn't  need  the  resource  preempts  the  low-priority  one  -  so  the  medium  task  effectively
runs ahead of the high-priority task. The priorities are 'inverted'.

The famous case is the 1997 Mars Pathfinder, which kept resetting due to exactly this. The fix is priority inheritance:
while a low-priority task holds a resource a high-priority task needs, it temporarily inherits the high priority so it can
finish and release the resource quickly. (Priority ceiling is a related protocol.)

Q94. [Medium]  What's the difference between deadlock, livelock, and starvation?
MODEL ANSWER
Deadlock  -  processes  are  blocked  forever,  each  waiting  on  a  resource  another  holds;  no  one  moves.  Livelock  -
processes  aren't  blocked  and  keep  changing  state  in  response  to  each  other,  but  make  no  real  progress  (like  two
people stepping side to side in a hallway, each politely moving the same way). Starvation - a process is perpetually
denied resources because the policy keeps favouring others, though the system as a whole progresses.

Operating Systems  |  SDE Fresher Question Bank

Page 21

Crisp  distinction:  deadlock  =  stuck  and  idle;  livelock  =  busy  but  going  nowhere;  starvation  =  others  progress,  you
don't.

Q95. [Medium]  Can a semaphore's value go negative? What does it signify?
MODEL ANSWER
In  the  classic  counting-semaphore  definition,  yes  -  and  the  magnitude  of  the  negative  value  tells  you  how  many
processes are currently blocked waiting on that semaphore. For example a value of -3 means three processes are
queued  waiting  for  a  resource.  (Some  implementations  clamp  at  0  and  track  the  wait  queue  separately,  but  the
conceptual answer interviewers want is that a negative count = number of waiting processes.)

Q96. [Easy]  What is an atomic operation?
MODEL ANSWER
An atomic operation is one that executes as a single indivisible step - it either happens completely or not at all, and no
other  thread  can  observe  it  half-done.  Incrementing  a  counter  atomically  means  the  read-modify-write  can't  be
interrupted  between  steps,  which  eliminates  the  lost-update  race.  Hardware  provides  atomicity  via  instructions  like
compare-and-swap, and languages expose it through atomic types - letting you avoid locks for simple operations.

Q97. [Hard]  Why isn't declaring a variable 'volatile' enough to make multithreaded code correct?
MODEL ANSWER
volatile  only  guarantees  visibility  and  prevents  the  compiler  from  caching  the  variable  in  a  register  -  every  access
goes to memory. It does not provide atomicity. A volatile counter++ is still a read-modify-write of three steps, so two
threads can still interleave and lose an update.

For correctness you need atomicity and ordering, which means atomic operations or locks. (In Java, volatile also adds
happens-before ordering, but still not atomic compound operations; in C/C++ volatile is purely about not optimising
away accesses and is the wrong tool for threading - use std::atomic.) So volatile != thread-safe.

Q98. [Medium]  Why must the semaphore wait() and signal() operations themselves be atomic?
MODEL ANSWER
Because they read and modify the shared counter. If two processes call wait() simultaneously and the decrement isn't
atomic,  both  could  read  the  same  value,  both  decide  a  resource  is  available,  and  both  enter  -  defeating  the
semaphore's entire purpose. So the OS implements wait()/signal() using a lower-level mechanism (disabling interrupts
on a uniprocessor, or a spinlock/atomic instruction on multiprocessors) to make the counter update indivisible. It's the
classic 'who guards the guard' point - the synchronisation primitive itself needs a tiny atomic core.

Operating Systems  |  SDE Fresher Question Bank

Page 22

6. Deadlocks

Predictable and high-yield. Memorise the four Coffman conditions, be able to map each deadlock-handling strategy to
which condition it attacks, and be ready to run the safety/Banker's algorithm on a small table.

Q99. [Medium]  What is a deadlock, and what are the four necessary conditions for it?
n Asked at Amazon, Microsoft, every core round
MODEL ANSWER
A deadlock is a state where a set of processes are each blocked waiting for a resource held by another process in the
set, so none can ever proceed. All four Coffman conditions must hold simultaneously for a deadlock to be possible:

Mutual exclusion - at least one resource is non-shareable (only one process at a time). Hold and wait - a process
holds  at  least  one  resource  while  waiting  for  others.  No  preemption  -  resources  can't  be  forcibly  taken;  they're
released  only  voluntarily.  Circular  wait  -  there's  a  cycle  of  processes  each  waiting  on  the  next.  Break  any  one  of
these and deadlock can't occur, which is the basis of prevention.

Q100. [Medium]  What is a Resource Allocation Graph and how do you spot a deadlock in it?
MODEL ANSWER
It's a directed graph with processes and resources as nodes. A request edge goes from a process to a resource it
wants; an assignment edge goes from a resource to a process holding it.

If every resource type has a single instance, then a cycle in the graph means deadlock - period. If resources have
multiple instances, a cycle is only a necessary condition: there may be a cycle but no deadlock if some instance held
outside the cycle can be released. So 'cycle => deadlock' only for single-instance resources.

Q101. [Medium]  What are the strategies for handling deadlocks?
MODEL ANSWER
Four approaches. Prevention - design the system so one of the four Coffman conditions can never hold. Avoidance -
allow  the  conditions  but  use  runtime  information  (max  resource  needs)  to  never  enter  an  unsafe  state,  via  the
Banker's algorithm. Detection and recovery - let deadlocks happen, detect them with an algorithm, then recover by
killing or rolling back processes. Ignore it (the ostrich algorithm) - assume deadlocks are rare and just reboot if one
occurs, which is what general-purpose OSes like Windows and Linux actually do.

Q102. [Hard]  How does deadlock prevention break each of the four conditions?
MODEL ANSWER
Mutual  exclusion  -  make  resources  shareable  where  possible  (e.g.  read-only  files);  but  some  resources  are
inherently non-shareable, so this is the hardest to remove. Hold and wait - require a process to request all resources
up front (atomically) or to hold none while requesting - hurts utilisation and can starve. No preemption - if a process
holding  resources  requests  one  that's  unavailable,  force  it  to  release  what  it  holds  and  retry  later.  Circular  wait  -
impose  a  total  ordering  on  resource  types  and  require  processes  to  request  them  in  increasing  order;  a  cycle  then
becomes impossible. The last one is the most practical in real code.

Q103. [Medium]  What's the difference between deadlock prevention and deadlock avoidance?
MODEL ANSWER
Prevention removes the possibility of deadlock structurally, by ensuring one of the four conditions can never hold - it's
a  static  design  constraint  and  often  wastes  resources.  Avoidance  allows  all  four  conditions  but  makes  dynamic
decisions: before granting each request it checks whether doing so could lead to an unsafe state, and refuses if so.
Avoidance needs to know each process's maximum future demand in advance (the Banker's algorithm), which is the
trade-off - more flexible, but requires more information.

Q104. [Medium]  What is a safe state, and is an unsafe state the same as deadlock?
MODEL ANSWER
A state is safe if there exists at least one ordering of processes (a 'safe sequence') in which each process can obtain
its maximum needed resources, run, and release them - so all can finish. Avoidance keeps the system in safe states
only.

An unsafe state is not necessarily a deadlock - it just means the system can no longer guarantee all processes will
finish; deadlock might occur depending on future requests. So: safe => no deadlock; deadlock => unsafe; but unsafe
does not imply deadlock. That nuance is a common follow-up.

Operating Systems  |  SDE Fresher Question Bank

Page 23

Q105. [Hard]  Explain the Banker's algorithm.
n Asked at Amazon, Microsoft, Samsung
MODEL ANSWER
It's a deadlock-avoidance algorithm (Dijkstra) modelled on how a banker lends money without going insolvent. Each
process  declares  its  maximum  demand  up  front.  The  system  tracks  Allocation  (held  now),  Max,  Need  (=  Max  -
Allocation), and Available.

When a process requests resources, the system pretends to grant them and runs the safety algorithm: starting from
Available (the Work vector), it repeatedly finds a process whose Need <= Work, assumes it finishes and returns its
allocation (Work += Allocation), and marks it done. If all processes can be finished this way, the state is safe and the
request is granted; otherwise it's denied and the process waits. So it only ever grants requests that keep the system in
a safe state.

Q106. [Hard]  Run the Banker's safety algorithm on this snapshot (3 resource types A=10, B=5, C=7).
MODEL ANSWER
Compute Available = Total - sum(Allocation), and Need = Max - Allocation, then look for a safe sequence.

Proc  Alloc   Max     Need
      A B C   A B C   A B C
P0    0 1 0   7 5 3   7 4 3
P1    2 0 0   3 2 2   1 2 2
P2    3 0 2   9 0 2   6 0 0
P3    2 1 1   2 2 2   0 1 1
P4    0 0 2   4 3 3   4 3 1

Allocated = (7,2,5)  -&gt;  Available = (3,3,2)

Work=(3,3,2)
P1 Need(1,2,2)&lt;=Work -&gt; Work=(5,3,2)
P3 Need(0,1,1)&lt;=Work -&gt; Work=(7,4,3)
P0 Need(7,4,3)&lt;=Work -&gt; Work=(7,5,3)
P2 Need(6,0,0)&lt;=Work -&gt; Work=(10,5,5)
P4 Need(4,3,1)&lt;=Work -&gt; Work=(10,5,7)

Safe sequence: &lt;P1, P3, P0, P2, P4&gt;  =&gt;  state is SAFE

Because a full sequence exists, the system is in a safe state. If no process's Need fit the Work vector at some step,
we'd declare it unsafe and deny the triggering request.

Q107. [Medium]  How does deadlock detection work when you allow deadlocks to occur?
MODEL ANSWER
For  single-instance  resources,  the  OS  maintains  a  wait-for  graph  (collapse  the  resource  allocation  graph  to  just
processes: an edge P1 -> P2 means P1 is waiting for a resource held by P2). A cycle in this graph means a deadlock.
The OS runs cycle detection periodically.

For multiple-instance resources it uses a detection algorithm similar to the Banker's safety check, but using current
requests instead of maximum needs. The cost is the overhead of running detection - run it too often and you waste
CPU, too rarely and deadlocks linger.

Q108. [Medium]  Once a deadlock is detected, how does the system recover?
MODEL ANSWER
Two broad options. Process termination - either abort all deadlocked processes (drastic but simple) or abort them
one at a time until the cycle breaks, choosing victims by lowest priority, least work done, or fewest resources held to
minimise loss. Resource preemption - forcibly take resources from some processes and give them to others, rolling
the  victim  back  to  a  safe  checkpoint;  here  you  must  avoid  always  picking  the  same  victim,  which  would  cause
starvation. Databases do exactly this - they detect deadlocks and abort the 'cheapest' transaction, which then retries.

Q109. [Easy]  What is the ostrich algorithm?
MODEL ANSWER
It's the tongue-in-cheek name for ignoring the deadlock problem entirely - 'stick your head in the sand.' The reasoning:
deadlocks are rare in general-purpose systems, and the cost of prevention/avoidance/detection (in performance and
complexity) outweighs the rare inconvenience of a hang. So Windows and Linux mostly do nothing about user-level
deadlocks; if one happens, you kill the process or reboot. It's a pragmatic cost-benefit decision, not a real algorithm.

Operating Systems  |  SDE Fresher Question Bank

Page 24

Q110. [Medium]  Can a deadlock occur if every resource type has only a single instance? Can it occur
with a single resource overall?
MODEL ANSWER
With single-instance resources, deadlock occurs exactly when there's a cycle in the resource-allocation graph - and it
needs at least two resources and two processes to form that cycle. With a single resource (one unit, one type) you
cannot  have  a  deadlock,  because  circular  wait  requires  a  cycle  of  at  least  two  distinct  resources  being
held-and-waited. One process holding the only resource and others simply waiting for it is contention, not deadlock.

Q111. [Medium]  Why is attacking the circular-wait condition the most practical prevention technique?
MODEL ANSWER
Because  it's  the  least  disruptive  to  remove.  You  can't  easily  drop  mutual  exclusion  (some  resources  are  inherently
exclusive), eliminating hold-and-wait kills utilisation, and forcing preemption is complex and can corrupt in-progress
work.  Imposing  a  global  ordering  on  resources  and  always  acquiring  locks  in  that  order  is  cheap,  enforceable  in
code,  and  is  exactly  the  discipline  real  multithreaded  software  uses  to  avoid  lock-ordering  deadlocks.  That's  why
'always acquire locks in a consistent order' is standard engineering advice.

Q112. [Easy]  Give a real-world software example of a deadlock.
MODEL ANSWER
Two threads each lock a mutex and then try to lock the other's: Thread A locks lock1 and waits for lock2; Thread B
locks lock2 and waits for lock1. Both block forever - a textbook lock-ordering deadlock. The same thing happens with
database transactions: transaction T1 locks row X and wants row Y, while T2 locks Y and wants X. The fix in both
cases is consistent lock ordering, and databases additionally detect the cycle and abort one transaction.

Operating Systems  |  SDE Fresher Question Bank

Page 25

7. Memory Management

Interviewers love this because it mixes definitions (fragmentation, paging vs segmentation) with translation mechanics
and the occasional effective-access-time numerical. Be precise about internal vs external fragmentation - it's a frequent
gotcha.

Q113. [Medium]  What's the difference between a logical (virtual) address and a physical address, and
what does the MMU do?
n Commonly asked
MODEL ANSWER
A  logical/virtual  address  is  the  one  the  CPU  generates  -  what  the  program  sees.  A  physical  address  is  the  actual
location  in  RAM.  They  differ  because  each  process  has  its  own  virtual  address  space  starting  at  0,  which  must  be
mapped onto real memory shared with everyone else.

The  Memory  Management  Unit  is  the  hardware  that  translates  virtual  to  physical  addresses  at  runtime,  on  every
memory  access,  using  the  page  table.  This  indirection  is  what  gives  us  isolation  (a  process  literally  cannot  name
another's memory) and the illusion of a large contiguous address space.

Q114. [Medium]  What is address binding, and what are the compile-time, load-time, and execution-time
binding options?
MODEL ANSWER
Address  binding  is  mapping  a  program's  symbolic/relative  addresses  to  actual  memory  addresses.  Compile-time:  if
you know where the program will load, the compiler generates absolute addresses (fast but inflexible - the program
must always load at that address). Load-time: the compiler generates relocatable code and final addresses are fixed
when  the  program  is  loaded.  Execution-time:  binding  is  deferred  until  runtime  so  the  process  can  be  moved  in
memory during execution - this needs hardware (the MMU) and is what modern systems use.

Q115. [Medium]  What's the difference between static and dynamic loading?
MODEL ANSWER
With static loading the entire program and its routines are loaded into memory before execution begins. With dynamic
loading,  a  routine  isn't  loaded  until  it's  actually  called  -  the  program  starts,  and  unused  routines  never  consume
memory. Dynamic loading gives better memory utilisation (rarely used error-handling code may never load) at the cost
of a little runtime overhead to load on demand.

Q116. [Medium]  What's the difference between static and dynamic linking?
MODEL ANSWER
Static  linking  copies  all  the  library  code  your  program  uses  into  the  executable  at  build  time  -  the  binary  is
self-contained but large, and every program duplicates the same library code in memory. Dynamic linking leaves a
stub and links to a shared library (.so / .dll) at load or run time - the binary is smaller, one copy of the library is shared
across processes in memory, and you can update the library without recompiling. The trade-off is the classic 'DLL hell'
- the right library version must be present at runtime.

Q117. [Easy]  What is contiguous memory allocation, and what are fixed vs variable partitioning?
MODEL ANSWER
Contiguous  allocation  gives  each  process  a  single  continuous  block  of  memory.  In  fixed  partitioning,  memory  is
pre-divided  into  fixed-size  partitions  -  simple,  but  a  small  process  in  a  big  partition  wastes  the  remainder  (internal
fragmentation). In variable partitioning, partitions are created to fit each process's exact size - no internal waste, but
as processes come and go they leave scattered holes (external fragmentation). Contiguous allocation's fragmentation
problems are exactly what paging was invented to solve.

Q118. [Medium]  Explain first-fit, best-fit, and worst-fit allocation.
MODEL ANSWER
These choose which free hole to give a process in variable partitioning. First-fit - allocate the first hole big enough;
fastest and works well in practice. Best-fit - allocate the smallest hole that fits; sounds efficient but leaves many tiny
unusable slivers and is slow (must scan all). Worst-fit - allocate the largest hole, leaving a big remainder that's more
likely  reusable;  in  practice  it  performs  poorly.  First-fit  and  best-fit  generally  beat  worst-fit;  first-fit  is  usually  the
pragmatic winner.

Operating Systems  |  SDE Fresher Question Bank

Page 26

Q119. [Medium]  What's the difference between internal and external fragmentation?
n Asked at Amazon, Microsoft - top fragmentation question
MODEL ANSWER
Internal fragmentation is wasted space inside an allocated block - you gave a process a fixed-size unit larger than it
needs, and the leftover within that unit can't be used by anyone else. Paging causes this: the last page of a process is
usually only partially filled.

External fragmentation is wasted space between allocated blocks - enough total free memory exists, but it's split into
scattered holes too small to satisfy a request. Contiguous/variable allocation causes this. Mnemonic: internal = wasted
space  within  an  allocation;  external  =  wasted  space  scattered  outside  allocations.  Paging  trades  external
fragmentation away and accepts a little internal fragmentation.

Q120. [Easy]  What is compaction?
MODEL ANSWER
Compaction  is  shuffling  allocated  memory  blocks  together  to  combine  the  scattered  free  holes  into  one  large
contiguous  free  region  -  the  cure  for  external  fragmentation.  It's  expensive  (you  must  copy  memory  and  update
addresses,  and  it  requires  execution-time  address  binding  so  processes  can  be  relocated),  so  it's  done  sparingly.
Paging avoids needing compaction by removing the contiguity requirement entirely.

Q121. [Medium]  What is paging?
n Asked everywhere
MODEL ANSWER
Paging is a memory-management scheme that lets a process's physical memory be non-contiguous. Logical memory
is divided into fixed-size pages and physical memory into same-size frames. Any page can go into any free frame,
and a per-process page table records which frame holds each page.

This  eliminates  external  fragmentation  (any  frame  fits  any  page)  and  decouples  a  process's  virtual  layout  from
physical placement. The only waste is internal fragmentation on the final partial page. Typical page size is 4 KB.

Q122. [Medium]  What is a page table, and what's stored in a page table entry?
MODEL ANSWER
A  page  table  maps  each  virtual  page  number  to  the  physical  frame  number  that  holds  it,  one  table  per  process.  A
page  table  entry  typically  stores  the  frame  number  plus  control  bits:  a  valid/invalid  bit  (is  this  page  in  memory?),
protection  bits  (read/write/execute),  a  dirty/modified  bit  (was  it  written,  so  it  must  be  saved  on  eviction?),  and  a
reference/accessed bit (used by replacement algorithms). The page table itself lives in memory, with its base address
in a register (PTBR).

Q123. [Hard]  How is a virtual address translated to a physical address under paging?
MODEL ANSWER
The virtual address is split into two parts: a page number (high bits) and a page offset (low bits). The page number
indexes the page table to get the frame number; the physical address is then (frame number x page size) + offset - the
offset is carried over unchanged because pages and frames are the same size.

Example: with a 4 KB page (12-bit offset) and a 32-bit address, the top 20 bits are the page number and the bottom 12
bits are the offset. The MMU does this on every access, and the TLB caches recent translations so it doesn't hit the
page table in memory each time.

Q124. [Medium]  What's the trade-off in choosing a larger vs smaller page size?
MODEL ANSWER
Larger  pages:  smaller  page  table  (fewer  entries),  better  TLB  coverage,  and  efficient  bulk  disk  transfers  -  but  more
internal fragmentation (bigger partial last page) and you may pull in data you don't need. Smaller pages: less internal
fragmentation  and  finer-grained  loading  -  but  a  much  larger  page  table  and  more  page  faults/TLB  misses.  It's  a
space-vs-overhead  balance;  4  KB  is  the  common  default,  with  'huge  pages'  (2  MB+)  offered  for  memory-heavy
workloads to reduce TLB pressure.

Operating Systems  |  SDE Fresher Question Bank

Page 27

Q125. [Medium]  What is the TLB and why is it important?
n Commonly asked
MODEL ANSWER
The Translation Lookaside Buffer is a small, fast associative cache inside the MMU that stores recent virtual-page ->
physical-frame  translations.  Without  it,  every  memory  access  would  need  an  extra  memory  access  just  to  read  the
page table - effectively halving memory speed. With it, a TLB hit gives the frame number immediately.

On a TLB miss, the hardware/OS walks the page table, finds the frame, and loads that translation into the TLB for next
time. Because programs exhibit locality, hit rates are typically 95-99%. Note the TLB must be flushed on a context
switch (different address space) unless entries are tagged with an address-space ID.

Q126. [Hard]  Compute the effective memory access time with a TLB: TLB lookup 20 ns, memory access
100 ns, hit ratio 80%.
MODEL ANSWER
On a hit you pay TLB lookup + one memory access. On a miss you pay TLB lookup + a memory access to read the
page table + the actual memory access.

Hit  (80%): 20 + 100            = 120 ns
Miss (20%): 20 + 100 + 100      = 220 ns

EAT = 0.80 x 120 + 0.20 x 220
    = 96 + 44
    = 140 ns

So the effective access time is 140 ns. Push the hit ratio to 98% and it drops to about 122 ns - which is the whole point
of the TLB. (If they specify the page-table walk overlaps differently, adjust the miss formula, but this is the standard
model.)

Q127. [Hard]  Why do we use multilevel (hierarchical) page tables?
MODEL ANSWER
Because a single flat page table is huge. With a 32-bit address space and 4 KB pages you have 2^20 (~1 million)
entries per process; at 4 bytes each that's 4 MB of contiguous table per process - and on 64-bit it's absurd. Most of
that space is never used.

A multilevel page table pages the page table itself: an outer table points to inner tables, and you only allocate the inner
tables  for  regions  the  process  actually  uses.  Sparse  address  spaces  then  cost  far  less  memory.  The  price  is  more
memory references per translation (one per level) - which is exactly why the TLB matters so much.

Q128. [Medium]  What is an inverted page table?
MODEL ANSWER
Instead  of  one  page  table  per  process  (mapping  pages  ->  frames),  an  inverted  page  table  has  one  entry  per
physical  frame  for  the  whole  system,  recording  which  process  and  virtual  page  currently  occupy  that  frame.  This
makes the table size proportional to physical memory, not to the sum of all virtual address spaces - a big memory
saving.

The downside is lookup: to translate a virtual address you must search the table for a matching (process, page) pair
rather than indexing directly, so implementations use a hash table to make it fast. It trades fast indexing for compact
size.

Q129. [Medium]  What is segmentation?
MODEL ANSWER
Segmentation divides a process's address space into variable-size logical units that match the programmer's view - a
code  segment,  a  data  segment,  a  stack  segment,  etc.  A  logical  address  is  a  (segment  number,  offset)  pair,  and  a
segment table maps each segment to a base and limit in physical memory.

Its  advantage  is  that  it's  meaningful  to  the  program  (segments  correspond  to  logical  modules,  enabling  natural
protection and sharing - e.g. share a code segment). Its drawback is that variable-size segments reintroduce external
fragmentation, which is why pure segmentation gave way to paging or a hybrid.

Operating Systems  |  SDE Fresher Question Bank

Page 28

Q130. [Medium]  Paging vs segmentation - compare them.
n Asked at Amazon, Microsoft
MODEL ANSWER
Paging uses fixed-size pages, is invisible to the programmer, and is a purely physical division of memory; it eliminates
external fragmentation but has internal fragmentation, and needs one page table. Segmentation uses variable-size,
logically-meaningful segments, is visible to the programmer, suffers external fragmentation but no internal, and needs
a segment table with base+limit.

Net: paging is simpler for the OS and great for memory management; segmentation is better for the logical structure,
protection, and sharing of a program. Real systems (x86) combine them - segmentation on top of paging - to get the
best of both.

Q131. [Medium]  How does the OS stop one process from accessing another process's memory?
MODEL ANSWER
Through hardware-enforced address translation. Each process has its own page table, so its virtual addresses can
only map to frames the OS assigned to it - there's simply no way for it to name another process's physical memory.
On a context switch the OS swaps in the new process's page table (changing the page-table base register), so the
address space changes entirely. Any access to an unmapped or protected page triggers a fault that traps to the kernel
(a segmentation fault). The protection is enforced by the MMU on every single access, which is why it's reliable.

Operating Systems  |  SDE Fresher Question Bank

Page 29

8. Virtual Memory & Page Replacement

Demand paging, page faults, and the replacement algorithms - plus the two crowd-favourites, Belady's anomaly and
thrashing. Be ready to trace a reference string and count faults for FIFO, LRU, and Optimal.

Q132. [Medium]  What is virtual memory and what does it buy us?
n Asked everywhere
MODEL ANSWER
Virtual memory is a technique that lets a process execute even if it isn't entirely in physical memory, by keeping only
the  needed  pages  in  RAM  and  the  rest  on  disk.  It  gives  each  process  the  illusion  of  a  large,  contiguous,  private
address space larger than physical RAM.

Benefits: programs bigger than RAM can run; more processes fit in memory at once (higher multiprogramming and
CPU use); processes are isolated and protected; and loading is faster because you only bring in pages on demand.
The mechanism is demand paging with page replacement.

Q133. [Medium]  What is demand paging?
MODEL ANSWER
Demand paging loads a page into memory only when it's actually referenced, rather than loading the whole process
up front (lazy loading). Pages start marked invalid in the page table; the first access to such a page triggers a page
fault, the OS brings the page in from disk, and execution resumes. 'Pure' demand paging starts a process with zero
pages resident and faults them all in on first use. The payoff is fast start-up and not wasting RAM on code/data that's
never touched.

Q134. [Hard]  What is a page fault, and what are the steps to handle one?
n Asked at Amazon, Microsoft
MODEL ANSWER
A page fault is the trap that occurs when a process accesses a page that's valid in its address space but not currently
in physical memory. It is not an error - it's the normal mechanism of demand paging.

Handling:  (1)  the  MMU  traps  to  the  kernel  on  the  invalid-page  access;  (2)  the  OS  checks  whether  the  reference  is
legal - if truly invalid, it kills the process with a segfault; (3) it finds a free frame (or evicts one via page replacement,
writing it back if dirty); (4) it schedules a disk read to load the page into that frame; (5) it updates the page table to
mark the page valid and point to the frame; (6) it restarts the instruction that faulted. Because step 4 hits disk, a page
fault is enormously slower than a normal access - the basis of the EAT calculation.

Q135. [Easy]  Why do we need page-replacement algorithms?
MODEL ANSWER
Because physical memory is finite. When a page fault occurs and there's no free frame, the OS must evict an existing
page to make room for the new one. The page-replacement algorithm decides which page to evict - a good choice
(one  that  won't  be  needed  soon)  minimises  future  faults;  a  bad  choice  causes  the  evicted  page  to  be  re-faulted
immediately. If the evicted page was modified (dirty bit set), it must be written back to disk first.

Q136. [Medium]  Explain FIFO page replacement and its main weakness.
MODEL ANSWER
FIFO  evicts  the  page  that  has  been  in  memory  longest,  regardless  of  how  heavily  it's  used  -  a  simple  queue.  Its
weakness is that the oldest page may be a hot, frequently used one (think a page holding a core loop), so FIFO can
evict  exactly  the  page  it's  about  to  need  again.  It's  also  the  only  common  algorithm  that  suffers  Belady's  anomaly.
Simple to implement, but poor decisions in practice.

Q137. [Medium]  Explain the Optimal page-replacement algorithm. Why can't we use it in practice?
MODEL ANSWER
Optimal (Belady's MIN) evicts the page that will not be used for the longest time in the future. It provably yields the
minimum possible number of page faults. The catch is obvious: it requires knowledge of future references, which the
OS  doesn't  have.  So  it  can't  be  implemented  -  but  it's  invaluable  as  a  benchmark  to  measure  how  close  a  real
algorithm (like LRU) gets to the theoretical best.

Operating Systems  |  SDE Fresher Question Bank

Page 30

Q138. [Hard]  Explain LRU page replacement and how it's implemented.
n Commonly asked
MODEL ANSWER
LRU  (Least  Recently  Used)  evicts  the  page  that  hasn't  been  used  for  the  longest  time,  approximating  Optimal  by
assuming  the  recent  past  predicts  the  near  future.  It  works  well  because  of  locality  of  reference  and  never  suffers
Belady's anomaly.

Implementation  is  the  hard  part  -  you  need  to  track  recency  on  every  access.  Two  exact  methods:  a  counter
(timestamp each page on access, evict the smallest) or a doubly linked list moving the accessed page to the front
(evict the tail) - the same hashmap+DLL structure as the LRU Cache coding problem. Doing this on every memory
reference is too costly in hardware, so real systems use approximations like the clock algorithm.

Q139. [Hard]  Trace this reference string and give the page-fault count for FIFO, LRU, and Optimal with 3
frames: 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1.
MODEL ANSWER
Run each policy over the 20 references with 3 frames, counting a fault whenever the referenced page isn't resident:

Algorithm   Page faults (3 frames, 20 refs)
FIFO            15
LRU             12
Optimal          9   &lt;- theoretical minimum

Optimal is the floor at 9; LRU's 12 is much closer to it than FIFO's 15, which is the usual ordering Optimal <= LRU <=
FIFO.  The  takeaway  to  state:  LRU  approximates  Optimal  well  because  of  locality,  while  FIFO's  age-based  choice
ignores usage.

Q140. [Hard]  What is Belady's anomaly?
n Asked at Amazon, Microsoft - a favourite gotcha
MODEL ANSWER
Belady's  anomaly  is  the  counter-intuitive  situation  where  increasing  the  number  of  frames  increases  the  number  of
page faults, instead of decreasing it - which violates the natural expectation that more memory should help. It occurs
only with FIFO replacement.

Concrete demo with the string 1 2 3 4 1 2 5 1 2 3 4 5 under FIFO: with 3 frames you get 9 faults, but with 4 frames you
get 10. More memory, more faults. It happens because FIFO isn't a 'stack algorithm' - the set of pages in memory with
n frames isn't guaranteed to be a subset of the set with n+1 frames.

Q141. [Medium]  Which page-replacement algorithms are immune to Belady's anomaly, and why?
MODEL ANSWER
Stack algorithms - notably LRU and Optimal - never suffer Belady's anomaly. The reason is the stack property: the
set of pages that would be in memory with n frames is always a subset of the set with n+1 frames. So adding a frame
can only keep pages that were already there plus possibly more - it can never cause an extra fault. FIFO lacks this
property, which is exactly why it can misbehave. Quick demo: with the same string, LRU gives 10 faults at 3 frames
and 8 at 4 frames - monotonic, as expected.

Q142. [Medium]  What is the clock (second-chance) page-replacement algorithm?
MODEL ANSWER
Clock is a practical approximation of LRU that's cheap in hardware. Pages are kept in a circular list with a reference
bit set by the hardware on each access. A 'clock hand' sweeps the list looking for a victim: if a page's reference bit is
1, it gets a 'second chance' - the bit is cleared and the hand moves on; if the bit is 0, that page is evicted. So a recently
used  page  survives  one  sweep,  approximating  'least  recently  used'  without  per-access  bookkeeping.  It's  what  real
OSes actually use.

Q143. [Hard]  What is thrashing, and what causes it?
n Asked at Amazon, Microsoft
MODEL ANSWER
Thrashing  is  when  a  system  spends  more  time  paging  (swapping  pages  in  and  out  of  disk)  than  executing  useful
work, so CPU utilisation collapses. The processes are constantly faulting on pages they just evicted.

Cause: the combined working sets of the active processes exceed physical memory, so each process doesn't have
enough frames to hold its locality. The vicious cycle is brutal - high faults lower CPU use, so the OS (thinking the CPU

Operating Systems  |  SDE Fresher Question Bank

Page 31

is idle) admits more processes, which makes memory pressure worse. Fixes: reduce the degree of multiprogramming,
and use the working-set model or page-fault-frequency control to give each process enough frames or suspend it.

Q144. [Medium]  Explain the working-set model.
MODEL ANSWER
The working set of a process is the set of pages it has referenced in the most recent delta (the working-set window) of
its execution - essentially its current locality. The model says: give a process enough frames to hold its working set
and it'll fault rarely; give it fewer and it thrashes.

The OS sums the working-set sizes of all processes; if that total exceeds available frames, it suspends a process to
prevent thrashing. It's a direct, principled way to decide how many frames each process needs and to set the degree
of multiprogramming.

Q145. [Medium]  What is the page-fault-frequency (PFF) scheme?
MODEL ANSWER
PFF is a more direct way to control thrashing than the working set. The OS monitors each process's page-fault rate
and keeps it within an acceptable band: if a process's fault rate is too high, it's starving for frames, so give it more; if
it's  too  low,  it  has  more  frames  than  it  needs,  so  take  some  away.  If  no  frames  can  be  freed  and  faults  stay  high,
suspend a process. It directly targets the symptom (fault rate) rather than estimating localities.

Q146. [Easy]  What is locality of reference?
MODEL ANSWER
Locality  of  reference  is  the  empirical  tendency  of  programs  to  access  a  relatively  small,  clustered  portion  of  their
address space at any given time. Temporal locality - a recently accessed item is likely to be accessed again soon
(loops, reused variables). Spatial locality - items near a recently accessed address are likely next (array traversal,
sequential  code).  Locality  is  the  reason  caching,  the  TLB,  demand  paging,  and  LRU  all  work  -  without  it  they'd  be
useless.

Q147. [Medium]  What is copy-on-write (COW)?
MODEL ANSWER
Copy-on-write is an optimisation where two processes share the same physical pages (mapped read-only) until one
tries to write; the write traps, the OS copies that single page, and the writer gets its private copy. Until a write happens,
no copying occurs.

Its biggest use is fork(): instead of duplicating the parent's entire address space, the child shares it copy-on-write, so
fork() is fast and cheap - especially when the child immediately calls exec() and the copy was never needed. It saves
memory and time by deferring (often avoiding) the copy.

Q148. [Hard]  Compute the effective access time: memory access 100 ns, page-fault rate p = 0.001, and
average page-fault service time 8 ms.
MODEL ANSWER
EAT = (1 - p) x memory_access + p x page_fault_time. Convert 8 ms = 8,000,000 ns.

EAT = (1 - 0.001) x 100 ns + 0.001 x 8,000,000 ns
    = 99.9 ns + 8000 ns
    ~ 8100 ns

So  even  a  1-in-1000  fault  rate  balloons  the  effective  access  time  from  100  ns  to  ~8100  ns  -  an  80x  slowdown  -
because  a  disk  fault  is  ~80,000x  slower  than  RAM.  The  lesson:  page  faults  must  be  extremely  rare  (which  is  why
locality and good replacement matter so much).

Q149. [Easy]  What's the difference between demand paging and swapping?
MODEL ANSWER
Swapping (in the classic sense) moves an entire process between memory and disk - all or nothing. Demand paging
works at the granularity of individual pages, bringing in only the specific pages a process references. Demand paging
is far more efficient because a process can run with only a fraction of its pages resident, and it's what enables virtual
memory. Modern 'swapping' usually means paging to the swap area, blurring the old distinction.

Operating Systems  |  SDE Fresher Question Bank

Page 32

Q150. [Medium]  What are memory-mapped files?
MODEL ANSWER
Memory mapping (mmap) maps a file's contents directly into a process's address space, so the process accesses file
data with ordinary memory reads/writes instead of read()/write() system calls. The OS demand-pages the file in as you
touch it and writes dirty pages back lazily.

Benefits: no explicit I/O calls, the OS handles caching via the page cache, and multiple processes can map the same
file to share memory efficiently. It's used for loading executables and shared libraries, and for fast large-file access - a
neat unification of the file and memory abstractions.

Operating Systems  |  SDE Fresher Question Bank

Page 33

9. File Systems, I/O & Disk Scheduling

Lower-frequency than scheduling or memory, but inodes, file descriptors, hard vs soft links, and disk-scheduling
numericals show up regularly - especially for backend/infra roles. DMA and the page cache are good 'depth' answers.

Q151. [Easy]  What is a file system and what does it manage?
MODEL ANSWER
A file system is the part of the OS that controls how data is stored on and retrieved from storage devices. It provides
the  abstraction  of  files  and  directories  on  top  of  raw  blocks,  and  manages  metadata  (names,  sizes,  permissions,
timestamps), the mapping from files to disk blocks, free-space tracking, and access control. Examples: ext4, NTFS,
APFS, FAT32.

Q152. [Medium]  What is an inode?
n Asked at Unix/backend-heavy companies
MODEL ANSWER
An inode (index node) is the on-disk data structure that stores all the metadata about a file except its name: the file's
size, owner, permissions, timestamps, link count, and crucially the pointers to the disk blocks holding the file's data.
Each file has exactly one inode, identified by an inode number.

The filename lives separately, in a directory entry that maps the name to an inode number - which is precisely why
multiple  names  (hard  links)  can  point  to  the  same  inode,  and  why  renaming  a  file  is  cheap  (you  only  touch  the
directory entry, not the inode).

Q153. [Medium]  What is a file descriptor?
MODEL ANSWER
A file descriptor is a small non-negative integer that the kernel returns when you open a file (or socket, or pipe); your
program  uses  it  as  a  handle  for  subsequent  read/write/close  calls.  It's  an  index  into  the  process's  per-process
file-descriptor table, which points into the system-wide open-file table and then to the inode.

By  convention  every  process  starts  with  three:  0  =  stdin,  1  =  stdout,  2  =  stderr.  This  uniform  'everything  is  a  file
descriptor' model is what lets you redirect output, pipe between programs, and treat sockets like files.

Q154. [Medium]  What's the difference between a hard link and a soft (symbolic) link?
n Commonly asked
MODEL ANSWER
A hard link is a second directory entry pointing to the same inode as the original - both names are equal, first-class
references to the same file data. The file data is freed only when the inode's link count drops to zero, so deleting one
name leaves the file fully intact under the other. Hard links can't span filesystems or link to directories.

A soft link is a separate small file that just stores the path to the target - like a shortcut. It can cross filesystems and
point to directories, but if the target is deleted or moved, the symlink dangles (points to nothing). Short version: hard
link = another name for the same inode; soft link = a pointer to a path.

Q155. [Hard]  What are the file allocation methods - contiguous, linked, and indexed?
MODEL ANSWER
They describe how a file's data blocks are laid out on disk. Contiguous - blocks are stored back-to-back; excellent
sequential and random access, but causes external fragmentation and makes files hard to grow. Linked - each block
points to the next (a linked list); no fragmentation and files grow easily, but random access is slow (must follow the
chain) and a broken pointer loses the rest.

Indexed  -  each  file  has  an  index  block  listing  all  its  data-block  addresses;  supports  fast  random  access  and  easy
growth, at the cost of space for the index block. Real systems like ext use a hybrid: the inode holds a few direct block
pointers plus single, double, and triple indirect pointers, so small files are cheap and huge files are still addressable.

Q156. [Medium]  What are the file access methods?
MODEL ANSWER
Sequential access - read/write in order from start to end, like a tape; simple and the most common (logs, streaming).
Direct/random access - jump to any block by number without reading predecessors, needed for databases. Indexed
access - use an index that maps keys to block locations, then jump there; like a book index, good for searching large
files by key. The right method depends on the workload.

Operating Systems  |  SDE Fresher Question Bank

Page 34

Q157. [Medium]  What is journaling in a file system?
MODEL ANSWER
A journaling file system records intended changes in a dedicated log (the journal) before applying them to the main file
system. If the system crashes mid-update, on reboot it replays or rolls back the journal to bring the file system back to
a consistent state - avoiding the long, unreliable full-disk checks (fsck) older systems needed.

It's  the  same  write-ahead-logging  idea  databases  use  for  durability.  The  trade-off  is  a  small  write  overhead
(data/metadata  may  be  written  twice),  which  is  why  systems  offer  modes  like  journaling  metadata  only  vs  full  data
journaling. ext4 and NTFS are journaling file systems.

Q158. [Medium]  What are the components of disk access time - seek time, rotational latency, and transfer
time?
MODEL ANSWER
For a spinning disk, total access time has three parts. Seek time - moving the read/write head to the correct track;
usually the largest and most variable component, which is why disk scheduling targets it. Rotational latency - waiting
for the desired sector to rotate under the head (on average half a rotation). Transfer time - actually reading/writing the
bytes. SSDs eliminate the first two (no moving parts), which is why they're vastly faster for random access.

Q159. [Hard]  Explain the disk-scheduling algorithms: FCFS, SSTF, SCAN, C-SCAN, LOOK.
n Asked at Amazon, Microsoft
MODEL ANSWER
They  order  pending  disk  requests  to  minimise  head  movement.  FCFS  -  serve  in  arrival  order;  fair  but  lots  of
back-and-forth. SSTF (shortest seek time first) - serve the closest request next; efficient but can starve far requests.
SCAN  (the  'elevator')  -  head  sweeps  to  one  end  serving  everything,  then  reverses.  C-SCAN  -  sweeps  one  way
serving  requests,  then  jumps  back  to  the  start  without  serving  on  the  return,  giving  more  uniform  wait  times.
LOOK/C-LOOK - like SCAN/C-SCAN but the head only goes as far as the last request rather than all the way to the
disk edge.

Q160. [Hard]  Disk-scheduling numerical: request queue 98, 183, 37, 122, 14, 124, 65, 67; head at 53.
Compare FCFS and SSTF total head movement.
MODEL ANSWER
FCFS serves in order, summing the absolute differences along the path:

FCFS path: 53-&gt;98-&gt;183-&gt;37-&gt;122-&gt;14-&gt;124-&gt;65-&gt;67
moves: 45+85+146+85+108+110+59+2 = 640 cylinders

SSTF always jumps to the nearest pending request:

SSTF order: 53-&gt;65-&gt;67-&gt;37-&gt;14-&gt;98-&gt;122-&gt;124-&gt;183
moves: 12+2+30+23+84+24+2+59 = 236 cylinders

SSTF (236) more than halves FCFS (640) for this workload. For reference on the same queue, SCAN (toward 0, then
up) = 236, C-SCAN = 382, and LOOK = 208 - LOOK wins here because it avoids running to the disk edges.

Q161. [Medium]  What is RAID, and what do levels 0, 1, and 5 give you?
MODEL ANSWER
RAID (Redundant Array of Independent Disks) combines multiple physical disks into one logical unit for performance,
redundancy, or both. RAID 0 (striping) - splits data across disks for speed and full capacity, but zero redundancy (one
disk  fails,  all  data  lost).  RAID  1  (mirroring)  -  every  disk  is  duplicated,  so  you  survive  a  failure,  but  you  pay  50%
capacity. RAID 5 (striping with distributed parity) - spreads data plus parity across 3+ disks, surviving any single disk
failure with only one disk's worth of capacity overhead - the popular balance of speed, capacity, and fault tolerance.
(RAID 6 tolerates two failures; RAID 10 mirrors then stripes.)

Q162. [Medium]  What are the I/O techniques - programmed I/O, interrupt-driven I/O, and DMA?
MODEL ANSWER
Programmed I/O - the CPU busy-polls the device status and transfers each byte itself; simple but wastes the CPU
entirely on waiting. Interrupt-driven I/O - the CPU issues the request and goes off to do other work; the device raises
an  interrupt  when  ready,  so  the  CPU  isn't  polling  -  but  it's  still  involved  in  each  byte/word  transfer.  DMA  (Direct
Memory Access) - a dedicated DMA controller transfers whole blocks between the device and memory without the
CPU, interrupting it only once the entire block is done. DMA is essential for high-throughput devices like disks and
network cards.

Operating Systems  |  SDE Fresher Question Bank

Page 35

Q163. [Medium]  What is DMA and why is it useful?
MODEL ANSWER
Direct Memory Access lets a hardware DMA controller move data directly between an I/O device and main memory
without routing every byte through the CPU. The CPU just sets up the transfer (source, destination, count) and is then
free to compute; the DMA controller does the transfer and raises a single interrupt at completion.

It's useful because it frees the CPU from the enormous overhead of moving large blocks byte-by-byte - without DMA,
copying a file or receiving network packets would consume the CPU entirely. The one subtlety is cache coherency:
the OS must ensure the CPU caches stay consistent with DMA'd memory.

Q164. [Medium]  Polling vs interrupts - what's the trade-off?
MODEL ANSWER
Polling means the CPU repeatedly checks a device's status - simple and low-latency when an event is imminent, but it
wastes  cycles  spinning  when  nothing's  happening.  Interrupts  let  the  device  notify  the  CPU  asynchronously,  so  the
CPU  does  useful  work  in  the  meantime  -  efficient  for  infrequent  events,  but  each  interrupt  has  handling  overhead
(context save/restore).

The  practical  answer:  interrupts  for  rare  or  unpredictable  events  (keyboard),  polling  for  very  high-frequency  events
where interrupt overhead would dominate (high-speed NICs use polling-based NAPI). Many systems combine them.

Q165. [Medium]  What is the page cache / buffer cache?
MODEL ANSWER
The page cache is an area of RAM where the OS keeps recently accessed file data, so repeat reads are served from
memory  instead  of  hitting  the  slow  disk,  and  writes  can  be  buffered  and  flushed  lazily.  It's  why  reading  a  file  the
second time is dramatically faster, and why free RAM is 'wasted RAM' - the OS uses spare memory as cache.

The  trade-off  is  durability:  buffered  (write-back)  writes  can  be  lost  on  a  crash  before  they're  flushed,  which  is  why
databases call fsync() to force data to disk when they need a durability guarantee.

Q166. [Medium]  What happens, at the file-system level, when you delete a file?
MODEL ANSWER
Typically the OS removes the file's directory entry (name -> inode mapping) and decrements the inode's link count.
Only when the link count reaches zero and no process still has the file open are the inode and its data blocks actually
freed and returned to the free list. The data bytes usually aren't wiped - just marked free - which is why deleted files
are often recoverable until overwritten.

Two nice corollaries: a file with multiple hard links survives deletion of one name, and a file deleted while still open by
a process keeps existing until that process closes it (common trick for temp files).

Operating Systems  |  SDE Fresher Question Bank

Page 36

10. Linux & Practical OS

Service companies (TCS, Infosys, Wipro, Accenture) and backend roles love practical Linux questions - signals,
permissions, pipes, /proc, and 'how would you debug this' scenarios. These also double as great resume-defence
answers if you mention Docker/Linux anywhere.

Q167. [Medium]  What are signals in Linux? Give some common examples.
MODEL ANSWER
Signals are asynchronous software interrupts the kernel delivers to a process to notify it of an event - a lightweight
form of IPC. A process can usually catch a signal and run a handler, ignore it, or let the default action happen (often
termination).

Common ones: SIGINT (Ctrl+C, interrupt), SIGTERM (polite request to terminate), SIGKILL (force kill, uncatchable),
SIGSEGV (invalid memory access - the segfault), SIGCHLD (a child changed state), SIGHUP (terminal closed, often
repurposed to mean 'reload config'), and SIGSTOP/SIGCONT (pause/resume).

Q168. [Medium]  What's the difference between SIGKILL and SIGTERM, and which signals can't be
caught?
n Commonly asked
MODEL ANSWER
SIGTERM (kill's default) is a polite request to shut down - the process can catch it, clean up (flush buffers, close files),
and exit gracefully. SIGKILL (kill -9) is forceful and immediate - the kernel destroys the process; it cannot be caught,
blocked, or ignored, so the process gets no chance to clean up.

SIGKILL  and  SIGSTOP  are  the  two  uncatchable  signals  -  by  design,  so  there's  always  a  way  to  kill  or  pause  a
runaway  process.  Best  practice  is  to  send  SIGTERM  first  and  only  escalate  to  SIGKILL  if  it  doesn't  exit,  so  the
process can shut down cleanly.

Q169. [Medium]  What is the /proc filesystem?
MODEL ANSWER
/proc is a virtual filesystem that doesn't exist on disk - the kernel generates its contents on the fly to expose process
and  system  information  as  readable  files.  /proc//  has  details  about  each  process  (status,  memory  maps,  open  file
descriptors,  command  line);  files  like  /proc/cpuinfo,  /proc/meminfo,  and  /proc/loadavg  expose  system  state.  It's  the
'everything is a file' philosophy applied to kernel data, and it's how tools like ps and top get their information.

Q170. [Medium]  Explain Linux file permissions and what chmod 755 means.
MODEL ANSWER
Each file has three permission sets - for the owner, the group, and others - each with read (4), write (2), and execute
(1) bits. You sum them per group to get an octal digit. So 755 = owner 7 (rwx = 4+2+1), group 5 (r-x), others 5 (r-x):
the owner can do everything, everyone else can read and execute but not modify - typical for a program or script.

Worth knowing: on a directory, execute means 'can enter/traverse it'. And the special setuid bit makes an executable
run  with  the  file  owner's  privileges  rather  than  the  caller's  -  which  is  how  passwd  lets  a  normal  user  update  a
root-owned file, and a classic security-sensitive feature.

Q171. [Medium]  What is a pipe, and how does a named pipe (FIFO) differ from an ordinary pipe?
MODEL ANSWER
A pipe is a unidirectional IPC channel - one process writes, another reads, with the kernel buffering in between. An
ordinary  (anonymous)  pipe,  like  ls  |  grep,  exists  only  between  related  processes  (parent/child)  that  share  the  file
descriptor and disappears when they exit.

A named pipe (FIFO) is a pipe that exists as an entry in the filesystem (created with mkfifo), so unrelated processes
can open it by name to communicate, and it persists until deleted. Both are one-way and the writer blocks if the buffer
is full / reader blocks if empty - a built-in producer-consumer.

Operating Systems  |  SDE Fresher Question Bank

Page 37

Q172. [Easy]  Explain I/O redirection: >, >>, 2>&1, and the pipe |.
MODEL ANSWER
These  rewire  a  process's  standard  file  descriptors.  >  redirects  stdout  to  a  file,  truncating  it;  >>  appends  instead  of
truncating. 2>&1 redirects stderr (fd 2) to wherever stdout (fd 1) currently points - useful to capture errors and output
together. The pipe | connects one command's stdout to the next command's stdin, letting you chain programs. They
all work because the shell manipulates the file-descriptor table before exec()ing the command - a direct application of
the fd abstraction.

Q173. [Easy]  What are environment variables and what is the PATH?
MODEL ANSWER
Environment  variables  are  key-value  pairs  attached  to  a  process  that  configure  its  behaviour,  inherited  by  child
processes. PATH is the most important: a colon-separated list of directories the shell searches, in order, to find the
executable for a command you type - which is why 'command not found' usually means the binary isn't on your PATH.
Others  like  HOME,  USER,  and  LANG  carry  user/locale  context.  They're  a  simple,  ubiquitous  configuration
mechanism.

Q174. [Medium]  What do the load average and the top output tell you?
MODEL ANSWER
Load average is the average number of processes runnable or in uninterruptible (usually I/O) wait over the last 1, 5,
and  15  minutes.  Interpreted  relative  to  core  count:  on  a  4-core  machine  a  load  of  4  means  fully  utilised,  above  4
means processes are queuing. Rising across the three numbers means load is increasing.

top  shows  per-process  CPU%  and  memory  plus  system-wide  CPU  breakdown  (user/system/iowait),  memory,  and
swap usage. High iowait points to disk bottlenecks; high system time points to heavy syscall/kernel activity. It's the first
tool you reach for to diagnose 'the server is slow.'

Q175. [Medium]  What is the OOM killer?
MODEL ANSWER
The Out-Of-Memory killer is a Linux kernel mechanism that triggers when the system is critically low on memory (and
swap)  and  can't  satisfy  an  allocation.  To  avoid  a  total  freeze,  it  selects  and  kills  a  process  to  reclaim  memory,
choosing a victim by an 'oom_score' that favours large memory hogs that aren't critical.

It exists because Linux overcommits memory - it hands out more virtual memory than physically exists, betting not
everyone  uses  it  all  at  once.  When  that  bet  fails,  the  OOM  killer  is  the  safety  valve.  You  can  tune  a  process's
oom_score_adj to protect or sacrifice it.

Q176. [Easy]  What is swap space and swappiness?
MODEL ANSWER
Swap space is disk space the OS uses as an overflow for RAM: when memory is tight, inactive pages are written to
swap  to  free  physical  frames.  It  lets  the  system  handle  more  memory  pressure  than  RAM  alone,  but  accessing
swapped  pages  is  far  slower  (disk),  so  heavy  swapping  causes  thrashing.  'swappiness'  (0-100)  is  a  Linux  knob
controlling how aggressively the kernel swaps out pages vs reclaiming cache - lower values keep application pages in
RAM longer, which databases often prefer.

Q177. [Hard]  How does Linux represent threads internally?
MODEL ANSWER
Linux doesn't have a fundamentally separate notion of thread vs process - both are represented by the same kernel
structure (task_struct), and both are created by the clone() system call. The difference is just what they share: clone()
takes flags specifying whether the new task shares the address space, file descriptors, signal handlers, etc.

A  'process'  is  a  clone  sharing  nothing  (new  address  space);  a  'thread'  is  a  clone  sharing  the  address  space
(CLONE_VM)  and  other  resources  with  its  creator.  So  in  Linux  a  thread  is  just  a  task  that  shares  memory  with  its
siblings,  scheduled  independently  by  the  kernel  (a  1:1  model).  This  is  why  people  say  'in  Linux,  threads  are
lightweight processes.'

Operating Systems  |  SDE Fresher Question Bank

Page 38

Q178. [Medium]  In top, what's the difference between VIRT, RES, and SHR memory?
MODEL ANSWER
VIRT is the total virtual memory the process has mapped - including code, data, shared libraries, and memory that's
reserved but not actually resident; it can look alarmingly large and usually doesn't matter on its own. RES (resident set
size)  is  the  actual  physical  RAM  the  process  is  using  right  now  -  the  number  you  usually  care  about.  SHR  is  the
portion of RES that's shared with other processes (like shared libraries). So to judge real memory pressure, look at
RES, not VIRT.

Q179. [Easy]  What is strace and when would you use it?
MODEL ANSWER
strace traces the system calls a process makes and the signals it receives, printing each call with its arguments and
return value. You reach for it when a program misbehaves and you want to see what it's actually asking the kernel to
do  -  which  file  it  can't  open  (and  the  errno),  where  it's  hanging  (blocked  in  a  read),  or  why  it's  slow  (thousands  of
redundant syscalls). It's the go-to black-box debugging tool when you don't have the source or a debugger handy.

Q180. [Medium]  What's the difference between fork() and vfork()?
MODEL ANSWER
fork()  creates  a  child  with  a  copy  of  the  parent's  address  space  (copy-on-write  in  practice).  vfork()  is  an  older
optimisation for the fork-then-exec case: it creates a child that shares the parent's address space and suspends the
parent until the child calls exec() or exits - so no page tables are copied at all.

vfork()  was  meant  to  avoid  wasted  copying  when  the  child  immediately  exec()s,  but  it's  dangerous  (the  child  can
clobber the parent's memory) and largely obsolete now that fork() uses copy-on-write, which gets most of the benefit
safely. Worth knowing as a concept, rarely used today.

Operating Systems  |  SDE Fresher Question Bank

Page 39

11. Scenario, Synthesis & Backend-Relevant

The questions that separate strong candidates: end-to-end 'what actually happens' walk-throughs, memory-bug
vocabulary, and the I/O-model concepts (blocking vs async, epoll) that every backend interviewer probes. These reward
connecting concepts across the whole subject.

Q181. [Hard]  What happens from when you type ./program and press Enter to when it's running?
n Asked at Amazon, Microsoft - great synthesis question
MODEL ANSWER
The shell parses the line and resolves ./program to an executable. It calls fork() to create a child process (a copy of
the shell), then the child calls exec() which replaces its image with your program: the loader reads the ELF header,
maps the code, data, and BSS segments into the new address space, sets up the stack and heap, and (for dynamic
binaries) the dynamic linker loads and links the shared libraries.

Execution starts at the entry point (C runtime startup, which calls main()). Pages are brought in on demand via page
faults rather than all at once. Meanwhile the shell wait()s for the child; when the program exits, the kernel reclaims its
resources and returns the exit status to the shell, which prints the next prompt. This single answer touches fork/exec,
loading, virtual memory, demand paging, and process termination - which is why interviewers love it.

Q182. [Hard]  Walk me through what malloc() does under the hood.
MODEL ANSWER
malloc() is a user-space library function, not a system call - it manages a pool of memory the process already owns
and only goes to the kernel when it needs more. For small requests it carves chunks out of the heap, which it grows
by calling brk()/sbrk() to move the program break (the top of the heap). For large requests it usually calls mmap() to
map fresh anonymous pages directly.

The allocator keeps free lists / bins of previously freed chunks so it can reuse them without asking the kernel again -
which  is  why  free()  often  doesn't  return  memory  to  the  OS  (the  process  keeps  it  for  future  mallocs).  The  actual
physical pages aren't committed until you first touch them (demand paging). So malloc is mostly bookkeeping over
memory obtained in bulk via brk/mmap.

Q183. [Medium]  Stack vs heap - what are the differences and when is each used?
n Asked everywhere
MODEL ANSWER
The  stack  holds  function  call  frames  -  local  variables,  parameters,  return  addresses.  It's  automatically  managed
(allocated on call, freed on return), very fast (just move a pointer), LIFO, and limited in size. The heap is for dynamic
allocation (malloc/new) whose lifetime you control manually; it's larger, slower, and can fragment.

Use  the  stack  for  short-lived,  known-size  data  and  the  heap  when  you  need  memory  to  outlive  the  function  that
created  it  or  whose  size  is  only  known  at  runtime.  The  stack  grows  downward,  the  heap  upward;  collisions  cause
overflow/out-of-memory.  Key  gotcha:  returning  a  pointer  to  a  stack  local  is  a  bug  because  that  frame  is  gone  after
return.

Q184. [Medium]  What's the difference between a stack overflow and a heap overflow?
MODEL ANSWER
A stack overflow is running out of stack space - typically from unbounded or infinite recursion, or huge local arrays - so
the  stack  grows  past  its  limit  and  the  program  crashes  (often  SIGSEGV).  A  heap  overflow  usually  means  a  buffer
overflow on the heap: writing past the end of a heap-allocated buffer, corrupting adjacent heap metadata or data - a
classic security vulnerability. One is about exhausting the stack; the other is about writing out of bounds on the heap.

Q185. [Medium]  Explain memory leak vs dangling pointer vs double free.
MODEL ANSWER
Memory leak - you allocate memory and lose all references to it without freeing, so it's never reclaimed; the process's
memory grows over time. Dangling pointer - a pointer that still refers to memory that has already been freed (or went
out of scope); dereferencing it is undefined behaviour and a security risk (use-after-free). Double free - calling free()
twice on the same pointer, which corrupts the allocator's metadata and can crash or be exploited.

They're  the  three  canonical  manual-memory  bugs,  which  is  exactly  why  garbage-collected  and  ownership-based
(Rust) languages exist - to eliminate them.

Operating Systems  |  SDE Fresher Question Bank

Page 40

Q186. [Medium]  What is a segmentation fault and what commonly causes it?
MODEL ANSWER
A segmentation fault is the signal (SIGSEGV) the OS sends when a process accesses memory it isn't allowed to - the
MMU  detects  an  access  to  an  unmapped  or  protection-violating  address  and  traps  to  the  kernel,  which  kills  the
process. It's the hardware-enforced memory protection doing its job.

Common  causes:  dereferencing  a  null  or  uninitialised  pointer,  using  a  dangling  pointer  after  free,  writing  past  an
array's bounds into unmapped memory, stack overflow from infinite recursion, or writing to read-only memory (like a
string literal). The fix is usually found by running under a debugger or a tool like valgrind/AddressSanitizer.

Q187. [Medium]  How is a hardware interrupt handled, step by step?
MODEL ANSWER
A  device  asserts  an  interrupt  request.  The  CPU  finishes  the  current  instruction,  then  saves  minimal  state  (program
counter,  flags)  and  uses  the  interrupt  number  to  index  the  interrupt  vector  table,  which  gives  the  address  of  the
matching interrupt service routine (ISR). It switches to kernel mode and runs the ISR, which services the device (e.g.
reads the byte, acknowledges the controller).

When  the  ISR  finishes,  the  CPU  restores  the  saved  state  and  resumes  the  interrupted  program  as  if  nothing
happened. ISRs are kept short - often they just note that work is pending and defer the heavy lifting to a lower-priority
context (bottom half / softirq) - so interrupts aren't disabled for long.

Q188. [Easy]  What's the difference between user space and kernel space?
MODEL ANSWER
They're two protected regions of the address space with different privilege. Kernel space holds the kernel's code and
data and runs in privileged mode with full hardware access; user space is where application code runs, with restricted
privileges and no direct hardware or kernel-memory access. A user program crosses into kernel space only through
controlled  gates  (system  calls,  interrupts).  The  separation  is  what  stops  a  buggy  app  from  corrupting  the  kernel  or
other processes.

Q189. [Easy]  What's the difference between preemptive and cooperative multitasking?
MODEL ANSWER
In preemptive multitasking the OS uses a timer interrupt to forcibly take the CPU from a running process after its time
slice, guaranteeing fairness and that one process can't freeze the system. In cooperative multitasking processes must
voluntarily  yield  the  CPU;  if  one  misbehaves  or  hangs  in  a  loop,  it  can  hold  the  CPU  forever  and  starve  everyone
(early Windows and Mac OS worked this way). Modern OSes are preemptive precisely to avoid that single point of
failure.

Q190. [Medium]  How does the OS regain control of the CPU from a running user process?
MODEL ANSWER
Through the timer (clock) interrupt. The kernel programs a hardware timer to fire periodically; when it fires, the CPU
traps into the kernel regardless of what the user process was doing, and the scheduler gets a chance to run - possibly
preempting the current process. This is the mechanism that makes preemptive multitasking possible.

Without it, a user process stuck in an infinite loop that makes no system calls would never give the CPU back - which
is exactly the failure mode of cooperative scheduling. The timer interrupt is the OS's guaranteed way back in.

Q191. [Easy]  Define throughput, latency, and response time, and how they can conflict.
MODEL ANSWER
Throughput  is  how  much  work  completes  per  unit  time  (requests/second).  Latency  is  how  long  a  single  operation
takes  end  to  end.  Response  time  is  how  quickly  the  system  starts  responding  to  a  request.  They  conflict:  batching
requests  improves  throughput  but  raises  individual  latency;  optimising  for  low  latency  (handle  each  request
immediately)  can  lower  peak  throughput.  Good  systems  pick  the  right  target  for  the  workload  -  interactive  systems
prioritise latency/response time, batch systems prioritise throughput.

Q192. [Medium]  Why are system calls expensive, and how can you reduce their cost?
MODEL ANSWER
Each  syscall  crosses  the  user/kernel  boundary:  it  mode-switches,  saves/restores  state,  validates  arguments,  and
pollutes caches - far more than a function call. In a hot loop, doing a syscall per item dominates runtime.

Operating Systems  |  SDE Fresher Question Bank

Page 41

Ways  to  reduce  them:  buffering  (read/write  large  chunks  instead  of  byte-by-byte  -  why  buffered  I/O  is  faster),
batching APIs (writev/readv, sendmmsg), memory-mapping files to avoid read()/write() calls, and modern interfaces
like io_uring that submit many operations with one crossing. The general principle: amortise the boundary crossing
over as much work as possible.

Q193. [Hard]  Explain blocking vs non-blocking and synchronous vs asynchronous I/O.
n Asked at backend/infra companies
MODEL ANSWER
Blocking vs non-blocking is about whether the call waits: a blocking read() puts the thread to sleep until data is ready;
a non-blocking read() returns immediately, with an error if there's nothing yet (so you poll or get notified). Synchronous
vs  asynchronous  is  about  who  does  the  work  and  when  you  get  the  result:  synchronous  means  you  wait  for
completion
the  operation,  continue  working,  and  get  notified
(callback/completion) when it's done.

line;  asynchronous  means  you  start

in

Concretely: blocking I/O is the simple thread-per-request model (easy, but threads don't scale to tens of thousands of
connections).  Non-blocking  +  an  event  loop  (or  async  I/O)  lets  one  thread  juggle  many  connections  -  the  model
behind Node.js, nginx, and high-concurrency servers.

Q194. [Hard]  What is I/O multiplexing (select/poll/epoll), and what's the C10K problem?
MODEL ANSWER
I/O multiplexing lets a single thread watch many file descriptors at once and wake only when some are ready, instead
of  dedicating  a  thread  per  connection.  select  and  poll  scan  all  fds  on  every  call  (O(n)),  which  doesn't  scale;  epoll
(Linux)  registers  fds  once  and  returns  only  the  ready  ones  (O(ready)),  scaling  to  hundreds  of  thousands  of
connections.

The  C10K  problem  is  the  classic  challenge  of  handling  10,000  concurrent  connections  on  one  server.
Thread-per-connection collapses under that many threads (memory and context-switch overhead), so the solution is
non-blocking sockets plus an epoll-based event loop - exactly how modern servers achieve high concurrency. Great
to mention for any backend role.

Q195. [Medium]  How does the OS schedule processes across multiple cores?
MODEL ANSWER
On a symmetric multiprocessing (SMP) system each core runs its own scheduler, typically off per-core run queues to
avoid contention on a single global queue. A load balancer periodically migrates tasks from busy cores to idle ones so
cores don't sit idle while others are overloaded.

The  tension  is  load  balancing  vs  cache  affinity:  moving  a  process  to  another  core  evens  out  load  but  loses  the
warm cache/TLB it built up on its old core, so schedulers try to keep a process on the same core (soft affinity) unless
imbalance is significant. On NUMA machines they also prefer the core near the process's memory.

Q196. [Easy]  What is CPU affinity?
MODEL ANSWER
CPU affinity is binding a process or thread to run on a specific core (or set of cores) rather than letting the scheduler
move it freely. The benefit is cache warmth - staying on one core keeps that core's caches and TLB populated with
the process's data, avoiding the cold-cache penalty of migration. It's used for latency-sensitive or high-performance
workloads (databases, real-time, packet processing). Set via taskset or sched_setaffinity on Linux.

Q197. [Medium]  Summarise the inter-process communication (IPC) mechanisms.
MODEL ANSWER
Pipes and named pipes (FIFOs) - simple unidirectional byte streams. Message queues - discrete messages with the
kernel  buffering  them.  Shared  memory  -  the  fastest:  processes  map  a  common  memory  region  and  read/write  it
directly (but you must synchronise access yourself). Semaphores - for synchronisation/signalling between processes.
Sockets  -  bidirectional,  work  both  locally  (Unix  domain  sockets)  and  across  the  network.  Signals  -  lightweight
asynchronous  notifications.  You  pick  based  on  speed,  data  shape,  and  whether  the  processes  are  on  the  same
machine.

Operating Systems  |  SDE Fresher Question Bank

Page 42

Q198. [Medium]  Shared memory vs message passing - which is faster and why?
MODEL ANSWER
Shared memory is faster for large data because, once the region is set up, processes read and write it directly with no
kernel
is  you  must  coordinate  access  yourself  with
semaphores/mutexes to avoid races. Message passing copies data through the kernel on every send/receive, which
is slower for big payloads, but it's simpler and safer (no shared state to corrupt) and works naturally across machines.
Rule of thumb: shared memory for high-bandwidth local IPC, message passing for safety, simplicity, or distribution.

involvement  per  access  -  no  copying.  The  cost

Q199. [Easy]  Describe the memory hierarchy and why it exists.
MODEL ANSWER
From  fastest/smallest/most  expensive  to  slowest/largest/cheapest:  CPU  registers,  L1/L2/L3  caches,  main  memory
(RAM), then disk/SSD (and network beyond). Each level is roughly an order of magnitude slower but much larger and
cheaper than the one above.

It exists because we can't have memory that's simultaneously huge, fast, and cheap - so we stack tiers and rely on
locality of reference to keep the data we're actively using in the fast tiers. Caching, the TLB, and virtual memory are all
instances of this same idea: keep the hot subset close.

Q200. [Medium]  A production process is pinning a core at 100% CPU. How would you diagnose it?
MODEL ANSWER
Start with top/htop to confirm which process and whether it's user or system CPU. If it's system-heavy, the process is
likely hammering syscalls - strace -c shows which ones and how often. For user-heavy CPU, attach a profiler (perf
top, perf record, or a language profiler) to find the hot function. Check whether it's a real workload spike vs a bug like a
busy-wait/tight loop (no I/O), thread contention (spinning on a lock), or a GC storm in managed runtimes.

The structured story - reproduce, observe with the right tool (top -> strace/perf), isolate the hot path, then fix - is what
interviewers want to hear, more than a specific command.

Q201. [Easy]  Why is it said that in Unix 'everything is a file'?
MODEL ANSWER
Because Unix exposes most resources - regular files, directories, devices, pipes, sockets, and even kernel info via
/proc - through the same file abstraction and the same small set of system calls (open, read, write, close). A program
can  read  from  a  keyboard  device,  a  network  socket,  or  a  disk  file  with  identical  code,  and  you  can  redirect  or  pipe
between them freely.

This  uniformity  is  a  huge  design  win:  it  makes  tools  composable  (the  whole  shell  pipeline  philosophy),  keeps  the
system-call interface tiny, and lets new resource types plug into existing tooling for free. It's one of the most elegant
ideas in OS design.

Operating Systems  |  SDE Fresher Question Bank

Page 43


