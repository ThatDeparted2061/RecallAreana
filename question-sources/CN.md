COMPUTER NETWORKS

SDE Fresher Interview Question Bank

Product & service-based company interviews  -  India 2026 cycle

Complete, interview-ready coverage of Computer Networks for fresher SDE interviews - the OSI/TCP-IP
layers, TCP vs UDP, the 3-way handshake, congestion & flow control, HTTP/HTTPS and TLS, DNS
resolution, IP addressing & subnetting, sockets, and the all-time favourite 'what happens when you
type a URL'. Phrased the way interviewers actually ask, with answers written the way a strong
candidate would say them out loud.

Prepared for: Harsh Rao - BITS Pilani Goa, SDE-1 prep
Volume 3 of 5 - Core CS Interview Series - June 2026
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

Computer Networks  |  SDE Fresher Question Bank

Page 2

Table of Contents

1. Networking Fundamentals & the OSI / TCP-IP Models

2. Physical & Data Link Layer

3. Network Layer & IP Addressing

4. Transport Layer: TCP & UDP

5. Application Layer: HTTP & HTTPS

6. DNS

7. Web, Email & Other Protocols

8. Network Security

9. Sockets & Network Programming

10. Scenario, Synthesis & Debugging

11. Rapid-fire & Miscellaneous

4

7

10

14

18

22

24

27

31

34

38

Computer Networks  |  SDE Fresher Question Bank

Page 3

1. Networking Fundamentals & the OSI / TCP-IP Models

The layered models are the scaffolding for every other networking question - interviewers expect you to name the layers,
say what each does, and place a protocol on the right layer instantly. Know OSI vs TCP/IP cold.

Q1. [Easy]  What is a computer network and why do we use one?
MODEL ANSWER
A computer network is a set of interconnected devices (computers, servers, phones, IoT) that can exchange data and
share  resources  using  agreed-upon  protocols.  We  use  networks  to  share  resources  (files,  printers,  internet),
communicate  (email,  messaging,  video),  centralise  data  and  services,  and  enable  distributed/cloud  computing.  The
internet is just the largest example - a network of networks.

Q2. [Medium]  What is the OSI model and what are its seven layers?
n Universally asked
MODEL ANSWER
The OSI (Open Systems Interconnection) model is a conceptual 7-layer framework that standardises how data moves
across a network, each layer handling a specific function and serving the one above it. From bottom to top: Physical,
Data Link, Network, Transport, Session, Presentation, Application.

A  common  mnemonic  (bottom-up)  is  'Please  Do  Not  Throw  Sausage  Pizza  Away.'  It's  a  reference  model  -  real
networks use TCP/IP - but interviewers use OSI's vocabulary to test whether you can place protocols and functions on
the right layer.

Q3. [Medium]  Explain what each OSI layer does.
MODEL ANSWER
Physical - transmits raw bits over the medium (cables, radio); deals with voltages, connectors, signalling. Data Link -
node-to-node  delivery  on  the  same  link,  framing,  MAC  addressing,  error  detection  (switches,  Ethernet).  Network  -
logical  addressing  and  routing  of  packets  across  networks  (IP,  routers).  Transport  -  end-to-end  delivery,  reliability,
flow/congestion control (TCP, UDP).

Session  -  establishes,  manages,  and  tears  down  sessions/dialogs.  Presentation  -  translation,  encryption,
compression  (data  format,  TLS,  serialization).  Application  -  the  interface  to  user-facing  protocols  (HTTP,  DNS,
SMTP). The bottom four move data; the top three are about the application's use of it.

Q4. [Medium]  What is the TCP/IP model and how does it map to OSI?
MODEL ANSWER
The  TCP/IP  model  is  the  practical  4-layer  model  the  internet  actually  runs  on:  Network  Access/Link,  Internet,
Transport, and Application. It maps to OSI by collapsing layers: TCP/IP's Application layer covers OSI's Application
+ Presentation + Session; its Transport and Internet map to OSI's Transport and Network; and its Link layer covers
OSI's Data Link + Physical.

So  TCP/IP  is  the  implementation  reality,  OSI  is  the  teaching/reference  model.  Some  texts  use  a  5-layer  hybrid
(splitting Link into Data Link + Physical), which is also fine to mention.

Q5. [Medium]  What are the main differences between the OSI and TCP/IP models?
n Commonly asked
MODEL ANSWER
OSI  has  7  layers,  TCP/IP  has  4  (or  5  in  the  hybrid  view).  OSI  is  a  generic,  protocol-independent  reference  model
developed before the protocols; TCP/IP was built around existing protocols and is what the internet actually uses. OSI
strictly  separates  services,  interfaces,  and  protocols  and  distinguishes  presentation/session  layers;  TCP/IP  folds
those into the application layer.

Practically: cite OSI for conceptual discussion and layer terminology, but remember real-world networking is TCP/IP.
OSI is the map; TCP/IP is the territory.

Computer Networks  |  SDE Fresher Question Bank

Page 4

Q6. [Medium]  What is encapsulation and decapsulation in networking?
MODEL ANSWER
As data travels down the layers at the sender, each layer wraps it with its own header (and the data-link layer adds a
trailer too) - this is encapsulation. The transport layer adds a TCP/UDP header (making a segment), the network layer
adds an IP header (a packet), the data-link layer adds a frame header/trailer (a frame). At the receiver the reverse
happens - decapsulation - each layer strips its own header and passes the payload up. It's how each layer adds the
control information its peer layer needs without the other layers caring.

Q7. [Medium]  What are the PDUs (data units) at each layer?
MODEL ANSWER
The Protocol Data Unit name changes per layer: at the Application/Presentation/Session layers it's data/message; at
the Transport layer it's a segment (TCP) or datagram (UDP); at the Network layer it's a packet (or IP datagram); at
the  Data  Link  layer  it's  a  frame;  and  at  the  Physical  layer  it's  bits.  Knowing  'segment,  packet,  frame,  bits'
top-to-bottom is a quick way to show you understand encapsulation.

Q8. [Easy]  Why is the network architecture split into layers?
MODEL ANSWER
Layering  provides  separation  of  concerns:  each  layer  has  one  job  and  a  clean  interface  to  the  layers  above  and
below, so you can change or improve one layer without touching the others (swap Wi-Fi for Ethernet at the physical
layer  without  changing  HTTP).  It  enables  interoperability  (standard  interfaces),  modular  design,  and  easier
troubleshooting  (isolate  the  problem  to  a  layer).  The  cost  is  some  overhead  per  layer,  but  the  modularity  is
overwhelmingly worth it.

Q9. [Easy]  What's the difference between a protocol and a service in networking?
MODEL ANSWER
A service is what a layer offers to the layer above it (the set of operations, like 'reliable byte stream'); a protocol is the
set of rules and message formats that peer entities at the same layer use to actually implement that service and talk to
each other. In short: a service is the interface/abstraction; a protocol is the agreement on the wire that realises it.

Q10. [Easy]  What are LAN, MAN, and WAN?
MODEL ANSWER
They classify networks by geographic scale. LAN (Local Area Network) - a small area like a home, office, or campus;
high  speed,  privately  owned  (your  office  Ethernet/Wi-Fi).  MAN  (Metropolitan  Area  Network)  -  spans  a  city,  e.g.  a
cable-TV or city-wide network. WAN (Wide Area Network) - spans large distances, countries or globally; the internet is
the largest WAN. As scale grows, speed typically drops and cost/latency rise.

Q11. [Easy]  What are the common network topologies?
MODEL ANSWER
Bus  -  all  devices  share  one  backbone  cable;  cheap  but  a  cable  fault  kills  everything  and  collisions  rise.  Star  -  all
devices connect to a central switch/hub; the most common today, easy to manage, but the hub is a single point of
failure. Ring - each device connects to two neighbours forming a loop; data travels in one direction. Mesh - devices
interconnect with many redundant paths; highly fault-tolerant (the internet backbone is mesh-like) but expensive. Real
networks mix these (hybrid).

Q12. [Medium]  What's the difference between bandwidth, throughput, and latency?
n Asked at Amazon, Microsoft
MODEL ANSWER
Bandwidth is the maximum data rate a link can carry (capacity), e.g. 1 Gbps - like the width of a pipe. Throughput is
the data rate you actually achieve, which is always <= bandwidth due to overhead, congestion, and protocol limits.
Latency is the time for data to travel from source to destination (delay), often measured as round-trip time.

Key intuition: bandwidth is how much can flow, latency is how long it takes to get there. A satellite link can have high
bandwidth but terrible latency. They're independent - and you optimise for different ones depending on the application.

Computer Networks  |  SDE Fresher Question Bank

Page 5

Q13. [Medium]  What's the difference between connection-oriented and connectionless communication?
MODEL ANSWER
Connection-oriented  (like  TCP)  establishes  a  dedicated  logical  connection  (handshake)  before  sending  data,  then
guarantees  ordered,  reliable  delivery,  and  tears  the  connection  down  afterward  -  like  a  phone  call.  Connectionless
(like  UDP)  just  fires  off  independent  packets  with  no  setup  and  no  guarantees  of  delivery  or  order  -  like  mailing
postcards.  Connection-oriented  trades  setup  overhead  for  reliability;  connectionless  trades  reliability  for  speed  and
simplicity.

Q14. [Medium]  What's the difference between unicast, multicast, broadcast, and anycast?
MODEL ANSWER
They describe how many recipients a message targets. Unicast - one sender to one specific receiver (normal web
request). Broadcast - one sender to all devices on the network segment (ARP requests). Multicast - one sender to a
group of interested receivers (IPTV, streaming to subscribers). Anycast - one sender to the nearest of several nodes
sharing an address (used by DNS root servers and CDNs to route you to the closest instance).

Q15. [Easy]  What's the difference between simplex, half-duplex, and full-duplex?
MODEL ANSWER
They  describe  the  direction  of  data  flow.  Simplex  -  one  direction  only  (keyboard  to  computer,  TV  broadcast).
Half-duplex  -  both  directions  but  only  one  at  a  time  (a  walkie-talkie;  older  Ethernet  hubs).  Full-duplex  -  both
directions simultaneously (a phone call; modern switched Ethernet). Full-duplex effectively doubles usable bandwidth
and eliminates collisions, which is why switches replaced hubs.

Q16. [Medium]  What's the difference between a hub, a switch, and a router?
n Commonly asked
MODEL ANSWER
Hub (Layer 1) - dumb repeater that broadcasts incoming data out every port; one collision domain, obsolete. Switch
(Layer  2)  -  forwards  frames  only  to  the  specific  port  of  the  destination  MAC  address,  using  a  MAC  table;  creates
separate collision domains and is the backbone of LANs. Router (Layer 3) - connects different networks and forwards
packets between them based on IP addresses, choosing routes. Short version: hub broadcasts to all, switch forwards
by MAC within a network, router forwards by IP between networks.

Q17. [Medium]  What's the difference between a MAC address and an IP address?
n Asked at Amazon, Microsoft
MODEL ANSWER
A MAC address is a 48-bit hardware address burned into a network interface (Layer 2), globally unique, and used for
delivery within a local network segment - it doesn't change. An IP address is a logical Layer-3 address (32-bit IPv4 /
128-bit  IPv6)  assigned  by  the  network,  used  to  route  packets  across  networks,  and  can  change  (DHCP,  moving
networks).

Analogy: the IP address is like the destination city/street on an envelope (used for long-haul routing), while the MAC
address is like the specific house handed the letter on the final local leg. ARP maps an IP to the MAC for that last hop.

Q18. [Easy]  What is a port number and why is it needed?
MODEL ANSWER
A port is a 16-bit number (0-65535) that identifies a specific application/service on a host, so the transport layer can
deliver  data  to  the  right  process.  An  IP  address  gets  the  packet  to  the  right  machine;  the  port  gets  it  to  the  right
application  on  that  machine.  That's  why  a  (IP,  port,  protocol)  combination  plus  the  remote  pair  defines  a  unique
connection. Well-known ports: 80 (HTTP), 443 (HTTPS), 22 (SSH), 53 (DNS), 25 (SMTP).

Computer Networks  |  SDE Fresher Question Bank

Page 6

2. Physical & Data Link Layer

Less glamorous than TCP/HTTP but still tested - error detection (CRC), flow control, ARQ protocols, ARP, and the
collision-vs-broadcast-domain distinction are the recurring asks.

Q19. [Medium]  What does the data link layer do, and what are its two sublayers?
MODEL ANSWER
The data link layer provides node-to-node delivery over a single physical link - it packages bits into frames, handles
physical  (MAC)  addressing,  detects  (and  sometimes  corrects)  transmission  errors,  and  does  flow  control.  Its  two
sublayers: LLC (Logical Link Control) - interfaces with the network layer, handles flow/error control and multiplexing;
and  MAC  (Media  Access  Control)  -  controls  how  devices  share  the  medium  and  adds  MAC  addressing.  Switches
operate here.

Q20. [Easy]  What is framing?
MODEL ANSWER
Framing is the data-link layer's job of dividing the raw bit stream into discrete units called frames, each with a header
(addresses, control) and trailer (error-check), so the receiver knows where each frame begins and ends. Boundaries
are marked with techniques like byte/bit stuffing or special flag patterns. Without framing, the receiver would just see
an undifferentiated stream of bits.

Q21. [Medium]  What's the difference between a collision domain and a broadcast domain?
n Commonly asked
MODEL ANSWER
A collision domain is a network segment where simultaneous transmissions can collide. A broadcast domain is the
set of devices that will receive a broadcast frame sent by any one of them.

The device that bounds each differs: a hub is one big collision domain (and one broadcast domain). A switch puts
each  port  in  its  own  collision  domain  (so  collisions  essentially  vanish  with  full-duplex)  but  all  its  ports  remain  one
broadcast  domain.  A  router  separates  broadcast  domains  -  broadcasts  don't  cross  routers.  VLANs  also  split
broadcast domains within a switch.

Q22. [Medium]  What is CSMA/CD and where is it used?
MODEL ANSWER
Carrier Sense Multiple Access with Collision Detection is the protocol classic (half-duplex) Ethernet used to share a
medium.  'Carrier  sense'  -  a  device  listens  before  transmitting;  if  the  line  is  idle  it  sends.  'Collision  detection'  -  while
sending it keeps listening, and if it detects a collision (two sent at once), it stops, sends a jam signal, and retries after a
random backoff (binary exponential backoff). It's largely historical now, because modern full-duplex switched Ethernet
has no collisions.

Q23. [Medium]  What is CSMA/CA and why is it used in Wi-Fi instead of CSMA/CD?
MODEL ANSWER
CSMA/CA (Collision Avoidance) tries to avoid collisions rather than detect them: a device senses the channel, waits
for  it  to  be  idle  plus  a  random  backoff  before  transmitting,  and  often  uses  RTS/CTS  handshakes  to  reserve  the
channel. Wi-Fi uses CA rather than CD because in wireless a station can't reliably detect collisions while transmitting
(it can't hear other transmitters well - the hidden-terminal problem), so detection isn't feasible and avoidance is the
practical choice.

Q24. [Medium]  What's the difference between error detection and error correction?
MODEL ANSWER
Error  detection  only  tells  you  that  the  received  data  is  corrupted  (via  a  check  like  a  checksum  or  CRC)  -  then  you
typically request retransmission. Error correction adds enough redundancy that the receiver can not only detect but fix
certain errors without retransmission (forward error correction, e.g. Hamming codes). Detection is cheaper and used
where  retransmission  is  easy  (TCP);  correction  is  used  where  retransmission  is  costly  or  impossible  (deep-space
links, storage, streaming).

Computer Networks  |  SDE Fresher Question Bank

Page 7

Q25. [Medium]  Explain parity, checksum, and CRC for error detection.
MODEL ANSWER
Parity bit - a single extra bit making the number of 1s even/odd; detects any single-bit error but misses even numbers
of  errors.  Cheap  but  weak.  Checksum  -  sum  the  data  words  and  send  the  sum  (or  its  complement);  the  receiver
re-sums  and  compares.  Used  in  TCP/IP,  but  can  miss  errors  that  cancel  out.  CRC  (Cyclic  Redundancy  Check)  -
treats  data  as  a  polynomial  and  divides  by  a  generator  polynomial,  sending  the  remainder;  the  receiver  checks
divisibility. It's far more robust (catches burst errors) and is used in Ethernet and Wi-Fi frames. Strength order: CRC >
checksum > parity.

Q26. [Hard]  How does a Hamming code correct a single-bit error?
MODEL ANSWER
A  Hamming  code  inserts  parity  bits  at  power-of-two  positions  (1,  2,  4,  8,  ...),  each  covering  a  specific  set  of  bit
positions. The combination of parity checks forms a binary number (the syndrome). If all parity checks pass, the data
is clean; if some fail, the syndrome's value directly gives the position of the flipped bit, which you then invert to correct.

So a single-bit error is both detected and located, letting you fix it without retransmission. With an extra overall parity
bit (SECDED), it can also detect (not correct) double-bit errors. It's the classic forward-error-correction example.

Q27. [Medium]  What's the difference between stop-and-wait and sliding-window flow control?
MODEL ANSWER
Stop-and-wait - the sender transmits one frame and waits for its acknowledgment before sending the next. Simple
but terrible utilisation on high-latency links (the line sits idle during each round trip). Sliding window - the sender can
have multiple unacknowledged frames 'in flight' up to a window size, and slides the window forward as ACKs arrive.
This keeps the pipe full and dramatically improves throughput, especially on high bandwidth-delay-product links. TCP
uses a sliding window.

Q28. [Hard]  Explain the ARQ protocols: Stop-and-Wait, Go-Back-N, and Selective Repeat.
MODEL ANSWER
Automatic Repeat reQuest protocols use acknowledgments and timeouts for reliable delivery. Stop-and-Wait ARQ -
send one, wait for ACK, retransmit on timeout; simple, low throughput. Go-Back-N - send a window of frames; if one
is  lost,  the  receiver  discards  it  and  all  subsequent  frames,  and  the  sender  retransmits  from  the  lost  frame  onward.
Simple receiver (no buffering) but wastes bandwidth re-sending good frames.

Selective Repeat - the receiver buffers out-of-order frames and ACKs them individually; the sender retransmits only
the  specific  lost  frame.  More  efficient  (no  needless  retransmission)  but  needs  buffering  and  more  complex
bookkeeping at both ends. TCP's behaviour is closest to selective repeat with SACK.

Q29. [Medium]  What is ARP and how does it work?
n Asked at Amazon, Microsoft
MODEL ANSWER
ARP (Address Resolution Protocol) maps a known IP address to the MAC address needed for delivery on the local
link. When a host wants to send to an IP on its subnet but doesn't know the MAC, it broadcasts an ARP request ('who
has 192.168.1.5?'); the owner replies with its MAC (unicast), and the sender caches it in its ARP table for future use.

It bridges Layer 3 (IP) and Layer 2 (MAC) - you route by IP but the final hop needs a MAC. For destinations outside
the subnet, ARP resolves the default gateway's MAC, not the final host's.

Q30. [Medium]  How does a switch learn which MAC address is on which port?
MODEL ANSWER
Through backward learning. When a frame arrives, the switch records the source MAC address and the port it came
in on, building a MAC address table (CAM table). To forward a frame, it looks up the destination MAC: if known, it
sends only out that port (unicast); if unknown, it floods the frame out all ports except the incoming one, and learns the
location when the reply comes back. Entries age out after a timeout. This is why a switch is far more efficient than a
hub - it learns and forwards selectively.

Computer Networks  |  SDE Fresher Question Bank

Page 8

Q31. [Medium]  What is a VLAN?
MODEL ANSWER
A VLAN (Virtual LAN) logically segments a single physical switch (or set of switches) into multiple isolated broadcast
domains,  so  devices  in  different  VLANs  can't  directly  reach  each  other  at  Layer  2  even  if  plugged  into  the  same
switch. Benefits: isolate traffic for security (separate HR from Engineering), reduce broadcast traffic, and group users
logically regardless of physical location. Inter-VLAN communication must go through a router/Layer-3 switch.

Q32. [Medium]  What is the structure of an Ethernet frame?
MODEL ANSWER
Key fields: a Preamble (sync), the Destination MAC and Source MAC (6 bytes each), an EtherType/Length field
(what's  inside,  e.g.  0x0800  for  IPv4),  the  Payload  (46-1500  bytes,  the  encapsulated  packet),  and  a  FCS  (Frame
Check  Sequence  -  a  CRC  for  error  detection).  The  1500-byte  payload  max  is  the  standard  MTU.  Knowing  src/dst
MAC + type + payload + CRC is usually enough detail.

Q33. [Medium]  What's the difference between bit rate and baud rate?
MODEL ANSWER
Bit rate is the number of bits transmitted per second; baud rate is the number of signal units (symbols) per second.
They're equal only when each symbol carries exactly one bit. With modulation schemes where one symbol encodes
multiple bits (e.g. a symbol carrying 4 bits), the bit rate is several times the baud rate: bit rate = baud rate x bits per
symbol. So a 1000-baud line using 4 bits/symbol gives 4000 bps.

Q34. [Easy]  What does the physical layer do, and what are guided vs unguided media?
MODEL ANSWER
The physical layer transmits raw bits over the medium - it defines voltages/signal levels, data rates, connectors, and
how  0s  and  1s  are  physically  represented  and  synchronised.  Guided  media  confine  the  signal  to  a  physical  path:
twisted-pair  copper,  coaxial  cable,  and  optical  fibre  (fastest,  immune  to  EMI).  Unguided  media  transmit  through
air/space without a conductor: radio, microwave, and infrared (Wi-Fi, cellular, satellite). Guided is faster/more secure;
unguided gives mobility.

Q35. [Easy]  What's the difference between baseband and broadband transmission?
MODEL ANSWER
Baseband  uses  the  entire  bandwidth  of  the  medium  for  a  single  digital  signal  at  a  time  (one  channel),  typically
bidirectional  -  classic  Ethernet  is  baseband.  Broadband  divides  the  medium's  bandwidth  into  multiple  channels
carrying  different  signals  simultaneously  via  frequency-division  (like  cable  TV/internet  sharing  one  coax  for  many
channels). Baseband = one signal using the whole pipe; broadband = many signals sharing the pipe by frequency.

Computer Networks  |  SDE Fresher Question Bank

Page 9

3. Network Layer & IP Addressing

IP addressing, subnetting, NAT, and routing. Subnetting numericals and the public/private/NAT story are common; be
able to compute hosts-per-subnet and explain how a packet finds its way across networks.

Q36. [Easy]  What does the network layer do?
MODEL ANSWER
The network layer (Layer 3) is responsible for logical addressing (IP addresses) and routing packets from source to
destination  across  multiple  interconnected  networks.  It  decides  the  path  a  packet  takes  hop  by  hop,  handles
fragmentation when a packet is too big for a link's MTU, and is best-effort (no reliability guarantee - that's the transport
layer's job). IP, routers, ICMP, and routing protocols live here.

Q37. [Easy]  What is an IP address and what does an IPv4 address look like?
MODEL ANSWER
An IP address is a logical address that uniquely identifies a device on a network for routing purposes. IPv4 is 32 bits,
written as four dotted decimal octets (e.g. 192.168.1.10), each 0-255, giving about 4.3 billion addresses. It's split into a
network  portion  (which  network)  and  a  host  portion  (which  device  on  it),  with  the  subnet  mask  marking  the
boundary.

Q38. [Medium]  What are the main differences between IPv4 and IPv6?
n Commonly asked
MODEL ANSWER
IPv4  is  32-bit  (~4.3  billion  addresses,  now  exhausted),  written  in  dotted  decimal.  IPv6  is  128-bit  (~3.4  x  10^38
addresses - effectively unlimited), written as eight groups of hex separated by colons. Beyond size, IPv6 has built-in
IPsec  support,  simpler/fixed  header
faster  routing,  no  broadcast  (uses  multicast/anycast),  stateless
autoconfiguration  (SLAAC),  and  no  need  for  NAT.  IPv6  was  created  mainly  to  solve  IPv4  address  exhaustion;
adoption is gradual via dual-stack.

for

Q39. [Medium]  What are the IPv4 address classes?
MODEL ANSWER
Classful addressing split IPv4 by leading bits: Class A (1-126, /8, huge networks), Class B (128-191, /16, medium),
Class  C  (192-223,  /24,  small  networks),  Class  D  (224-239,  multicast),  Class  E  (240-255,  experimental).  Class  is
determined by the first octet's range. Note classful addressing is largely obsolete - it wasted addresses, so we moved
to CIDR (classless) for flexible prefix lengths, but interviewers still ask the classes.

Q40. [Hard]  What is subnetting and what is a subnet mask?
n Asked at Amazon, Microsoft, networking-heavy roles
MODEL ANSWER
Subnetting  divides  a  larger  network  into  smaller  sub-networks  by  borrowing  bits  from  the  host  portion  to  create  a
subnet portion - improving address utilisation, reducing broadcast traffic, and isolating segments. The subnet mask
marks which bits are the network/subnet portion (1s) versus the host portion (0s); e.g. 255.255.255.0 (/24) means the
first 24 bits are network.

Each  subnet  reserves  two  host  addresses:  the  all-zeros  host  bits  =  the  network  address,  and  the  all-ones  =  the
broadcast address. So usable hosts per subnet = 2^(host bits) - 2.

Q41. [Hard]  Worked example: divide 192.168.1.0/24 into 4 equal subnets. Give the masks, ranges, and
host counts.
MODEL ANSWER
To make 4 subnets you borrow 2 host bits (2^2 = 4), changing /24 to /26. A /26 leaves 6 host bits -> 2^6 - 2 = 62
usable hosts each, and the new mask is 255.255.255.192.

Subnet   Network/CIDR        Usable range            Broadcast
1        192.168.1.0/26      .1   - .62              .63
2        192.168.1.64/26     .65  - .126             .127
3        192.168.1.128/26    .129 - .190             .191
4        192.168.1.192/26    .193 - .254             .255

The block size is 64 (256 / 4), so subnets start at 0, 64, 128, 192. Each loses 2 addresses (network + broadcast),
leaving 62 usable. This 'block size' method is the fast way to subnet in an interview.

Computer Networks  |  SDE Fresher Question Bank

Page 10

Q42. [Medium]  What is CIDR notation?
MODEL ANSWER
CIDR (Classless Inter-Domain Routing) replaces rigid address classes with a flexible prefix length written as /n, where
n is the number of network bits. So 192.168.1.0/24 means a 24-bit network prefix and 8 host bits (256 addresses). It
lets you size networks to need (a /30 for a 2-host point-to-point link, a /20 for ~4000 hosts) instead of being stuck with
class A/B/C sizes, which drastically reduces address waste and enables route aggregation (supernetting).

Q43. [Medium]  What's the difference between public and private IP addresses?
MODEL ANSWER
A public IP is globally unique and routable on the internet, assigned by your ISP. A private IP is used only within a
local  network  and  is  not  routable  on  the  public  internet  -  the  reserved  ranges  are  10.0.0.0/8,  172.16.0.0/12,  and
192.168.0.0/16.  Many  devices  on  a  home/office  network  share  private  IPs  and  reach  the  internet  through  a  single
public IP via NAT. Private addressing (plus NAT) is a big reason IPv4 lasted despite only ~4 billion addresses.

Q44. [Medium]  What is NAT and why is it needed?
n Asked at Amazon, Microsoft
MODEL ANSWER
NAT (Network Address Translation) lets multiple devices with private IPs share one (or a few) public IP by rewriting
address/port  information  in  packet  headers  as  they  cross  the  router.  The  most  common  form,  PAT  (port  address
translation / 'NAT overload'), maps each internal (IP:port) to the public IP with a unique port, and uses a translation
table to send responses back to the right device.

It's  needed  because  IPv4  addresses  are  scarce  -  NAT  massively  conserved  them  by  letting  whole  networks  hide
behind  one  public  IP.  A  side  benefit  is  a  basic  security  boundary  (internal  hosts  aren't  directly  addressable  from
outside). IPv6's huge address space removes the need for NAT.

Q45. [Easy]  What is a default gateway?
MODEL ANSWER
The default gateway is the router a device sends packets to when the destination is outside its own subnet - the 'exit
door'  to  other  networks  and  the  internet.  If  the  destination  IP  is  on  the  local  subnet,  the  host  delivers  directly  (via
ARP/MAC);  otherwise  it  forwards  the  packet  to  the  default  gateway,  which  routes  it  onward.  Without  a  configured
gateway, a device can only talk to hosts on its own subnet.

Q46. [Medium]  What is DHCP and how does it assign an address (DORA)?
n Commonly asked
MODEL ANSWER
DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses and network config (subnet mask,
gateway,  DNS)  to  devices,  so  you  don't  configure  each  one  manually.  The  exchange  is  DORA:  Discover  (client
broadcasts  looking  for  a  DHCP  server),  Offer  (server  offers  an  IP),  Request  (client  requests  that  offered  IP),
Acknowledge (server confirms and leases it).

The address is leased for a time and renewed. DHCP uses UDP (ports 67/68) and broadcasts initially because the
client has no IP yet. It's what lets you join a Wi-Fi network and 'just work.'

Q47. [Medium]  What is routing, and what's the difference between static and dynamic routing?
MODEL ANSWER
Routing is the process of selecting paths for packets to travel from source to destination across networks, done by
routers  using  routing  tables.  Static  routing  -  routes  are  manually  configured  by  an  admin;  simple,  predictable,  no
overhead,  but  doesn't  adapt  to  failures  and  doesn't  scale.  Dynamic  routing  -  routers  exchange  information  using
routing  protocols  (OSPF,  BGP,  RIP)  and  automatically  compute  and  update  routes,  adapting  to  topology  changes;
scalable but adds protocol overhead and complexity. The internet runs on dynamic routing (BGP between providers).

Computer Networks  |  SDE Fresher Question Bank

Page 11

Q48. [Hard]  What's the difference between distance-vector and link-state routing?
MODEL ANSWER
Distance-vector  (e.g.  RIP)  -  each  router  knows  only  the  'direction  and  distance'  (next  hop  and  hop  count)  to
destinations and shares its whole routing table with neighbours periodically ('routing by rumour'). Simple but slow to
converge and prone to loops/count-to-infinity. Link-state (e.g. OSPF) - each router learns the entire network topology
by  flooding  link-state  advertisements,  then  independently  computes  shortest  paths  with  Dijkstra's  algorithm.  Faster
convergence and loop-free, but more memory/CPU intensive. Distance-vector knows distances; link-state knows the
whole map.

Q49. [Medium]  What is ICMP, and how do ping and traceroute use it?
n Asked at Amazon, Microsoft
MODEL ANSWER
ICMP (Internet Control Message Protocol) is the network layer's error-reporting and diagnostic protocol - routers and
hosts use it to send messages like 'destination unreachable', 'time exceeded', and echo request/reply.

ping  sends  ICMP  Echo  Request  packets  and  measures  the  time  until  the  Echo  Reply  comes  back  -  testing
reachability and round-trip latency. traceroute cleverly sends packets with increasing TTL values (1, 2, 3, ...); each
router that decrements TTL to 0 sends back an ICMP 'Time Exceeded', revealing that hop - so you map the entire
path and per-hop latency to a destination.

Q50. [Medium]  What is IP fragmentation, and what is MTU?
MODEL ANSWER
MTU (Maximum Transmission Unit) is the largest packet size a link can carry in one frame (Ethernet's is 1500 bytes).
If a packet is larger than the next link's MTU, the network layer fragments it into smaller pieces that are reassembled
at the destination (using the IP header's identification, flags, and fragment-offset fields).

Fragmentation  hurts  performance  (more  overhead,  and  losing  one  fragment  means  resending  all),  so  it's  avoided
where possible - IPv6 doesn't fragment in routers at all, relying on Path MTU Discovery so the sender picks a size that
fits the whole path.

Q51. [Easy]  What is TTL (Time To Live)?
MODEL ANSWER
TTL is a field in the IP header that limits a packet's lifetime to prevent it from looping forever. It starts at some value
(e.g. 64) and each router that forwards the packet decrements it by 1; when TTL hits 0, the router drops the packet
and sends back an ICMP 'Time Exceeded' message. This both stops routing loops from congesting the network and is
exactly the mechanism traceroute exploits to discover each hop.

Q52. [Medium]  What's the difference between routing and forwarding?
MODEL ANSWER
Routing  is  the  control-plane  process  of  building  the  routing  table  -  running  protocols,  exchanging  information,  and
computing  the  best  paths  (happens  relatively  slowly,  in  the  background).  Forwarding  is  the  data-plane  action  of
actually  moving  each  incoming  packet  to  the  correct  outgoing  interface  by  looking  it  up  in  that  table  (happens
per-packet, at line speed). Routing decides the map; forwarding follows it for every packet.

Q53. [Hard]  How does a router decide where to send a packet (longest prefix match)?
MODEL ANSWER
A router looks up the packet's destination IP in its routing table, which contains network prefixes (like 10.1.0.0/16) and
the next hop for each. When multiple entries match, it uses longest prefix match - it picks the most specific route, i.e.
the  one  with  the  longest  prefix  (largest  /n).  For  example,  for  destination  10.1.2.3,  a  10.1.2.0/24  entry  wins  over  a
10.1.0.0/16 entry, which wins over a 0.0.0.0/0 default route. Most specific match means more precise routing, with the
default route as the catch-all.

Q54. [Easy]  What are some special/reserved IPv4 addresses?
MODEL ANSWER
127.0.0.1  (the  loopback  /  localhost  -  traffic  to  yourself,  never  leaves  the  host).  0.0.0.0  (this  host  /  'any'  address).
255.255.255.255 (limited broadcast to the local network). 169.254.x.x (APIPA / link-local - self-assigned when DHCP
fails). The private ranges (10/8, 172.16/12, 192.168/16). Knowing localhost = 127.0.0.1 and the private ranges is the
high-value part.

Computer Networks  |  SDE Fresher Question Bank

Page 12

Q55. [Medium]  How many usable hosts are in a /26, /30, and /28 subnet?
MODEL ANSWER
Usable hosts = 2^(32 - prefix) - 2 (subtracting the network and broadcast addresses). So /26 -> 2^6 - 2 = 62 hosts; /28
->  2^4  -  2  =  14  hosts;  /30  ->  2^2  -  2  =  2  hosts  (the  classic  point-to-point  link  between  two  routers).  Memorising
'subtract two and the host bits are 32 minus the prefix' lets you answer any of these instantly.

Q56. [Easy]  What's the difference between a router and a Layer-3 switch?
MODEL ANSWER
Both route between networks/VLANs at Layer 3, but a Layer-3 switch does it in hardware (ASICs) at very high speed
and is optimised for fast inter-VLAN routing within a LAN, typically with many Ethernet ports and no WAN interfaces. A
router is more general-purpose: it connects different network types (LAN to WAN/internet), supports WAN interfaces,
NAT,  and  richer  routing/security  features,  but  is  usually  slower  per  packet.  Rule  of  thumb:  Layer-3  switch  for  fast
internal routing, router for connecting to the outside world.

Computer Networks  |  SDE Fresher Question Bank

Page 13

4. Transport Layer: TCP & UDP

The most heavily tested networking area. TCP vs UDP, the 3-way handshake (and why three), flow vs congestion
control, and TIME_WAIT are near-guaranteed. Be able to draw the handshake and explain each reliability mechanism.

Q57. [Easy]  What does the transport layer do?
MODEL ANSWER
The transport layer provides end-to-end (process-to-process) communication between applications on different hosts.
It multiplexes/demultiplexes data to the right application using port numbers, and - depending on the protocol - adds
reliability, ordering, flow control, and congestion control. TCP and UDP are the two main transport protocols, offering
reliable-ordered and fast-unreliable service respectively.

Q58. [Medium]  TCP vs UDP - give the full comparison.
n Asked at virtually every company
MODEL ANSWER
TCP is connection-oriented (3-way handshake first), reliable (acknowledgments + retransmission), ordered (sequence
numbers  reassemble  in  order),  and  has  flow  and  congestion  control  -  but  this  adds  latency  and  overhead  (20-byte
header).  UDP  is  connectionless  (just  send),  unreliable  (no  ACKs,  no  retransmission),  unordered,  with  no
flow/congestion control - but it's fast and lightweight (8-byte header).

So TCP guarantees correctness at the cost of speed; UDP gives speed at the cost of guarantees. TCP for web, email,
file  transfer  (correctness  matters);  UDP  for  live  video,  VoIP,  gaming,  DNS  (speed  matters,  occasional  loss  is
tolerable).

Q59. [Medium]  When would you choose UDP over TCP?
MODEL ANSWER
Choose  UDP  when  low  latency  matters  more  than  perfect  reliability,  when  occasional  loss  is  acceptable  or  better
handled by the app, or for simple request-response where TCP's handshake overhead isn't worth it. Concrete cases:
live video/audio streaming and VoIP (a late packet is useless - skip it rather than wait), online gaming (fresh position
data beats retransmitted stale data), DNS (one small query/response), and broadcast/multicast (which TCP can't do).
Many such apps add their own lightweight reliability on top of UDP (as QUIC/HTTP-3 do).

Q60. [Hard]  Explain the TCP three-way handshake.
n Asked at Amazon, Microsoft - must-know
MODEL ANSWER
It's how TCP establishes a connection and synchronises sequence numbers before any data flows:

Client                         Server
  |------ SYN (seq=x) -----------&gt;|   1. client wants to connect
  |&lt;-- SYN-ACK (seq=y, ack=x+1) --|   2. server agrees, sends its seq
  |------ ACK (ack=y+1) ---------&gt;|   3. client acknowledges
  |        [connection established]

Step 1 the client sends SYN with its initial sequence number x. Step 2 the server replies SYN-ACK, acknowledging x
and  sending  its  own  sequence  number  y.  Step  3  the  client  ACKs  y.  Now  both  sides  have  confirmed  each  other's
sequence numbers and receive capability, so data can flow reliably.

Q61. [Hard]  Why does TCP use a three-way handshake and not a two-way one?
n Asked at Amazon, Microsoft - the 'why' follow-up
MODEL ANSWER
Because both sides must confirm that the other can both send and receive, and both must agree on each other's initial
sequence numbers. Each direction needs a SYN (to share its sequence number) and an ACK (to confirm the other's) -
that's four events, but the server's SYN and ACK piggyback into one message, giving three.

A  two-way  handshake  can't  safely  synchronise  both  sequence  numbers  and  is  vulnerable  to  stale/duplicate  SYNs
from an old connection establishing a half-open connection. The third ACK lets the server be sure the client actually
received its SYN and that this isn't a delayed duplicate - so three is the minimum for reliable, unambiguous setup.

Q62. [Hard]  Explain how a TCP connection is terminated (the four-way handshake).
MODEL ANSWER
TCP closes each direction independently, since the connection is full-duplex - hence four steps:

Computer Networks  |  SDE Fresher Question Bank

Page 14

  |------ FIN -----------&gt;|   1. A done sending, sends FIN
  |&lt;----- ACK ------------|   2. B acknowledges
  |&lt;----- FIN ------------|   3. B also done, sends its FIN
  |------ ACK -----------&gt;|   4. A acknowledges, enters TIME_WAIT

A sends FIN (no more data), B ACKs it (B can still send). When B is also finished it sends its own FIN, and A ACKs. A
then  waits  in  TIME_WAIT  before  fully  closing.  It's  four  messages  because  each  side  closes  its  half  separately
(sometimes the middle two combine into three if B has nothing left to send).

Q63. [Hard]  What is the TIME_WAIT state and why does it exist?
MODEL ANSWER
After  actively  closing  a  connection  (sending  the  final  ACK),  a  host  enters  TIME_WAIT  for  roughly  2x  the  maximum
segment  lifetime  (2*MSL)  before  fully  releasing  the  connection.  Two  reasons:  (1)  to  ensure  the  final  ACK  actually
reached  the  other  side  -  if  it  was  lost,  the  peer  resends  its  FIN  and  this  host  can  re-ACK;  and  (2)  to  let  any
delayed/duplicate  packets  from  this  connection  die  out,  so  they  can't  be  mistaken  for  data  on  a  new  connection
reusing the same port pair. Lots of TIME_WAIT sockets on a busy server is normal, though it can exhaust ephemeral
ports under very high connection churn.

Q64. [Medium]  How does TCP guarantee reliable, in-order delivery?
n Commonly asked
MODEL ANSWER
Through  several  cooperating  mechanisms.  Sequence  numbers  label  every  byte  so  the  receiver  can  reorder
out-of-order  segments  and  detect  duplicates.  Acknowledgments
the  sender  what's  been  received;
unacknowledged  data  is  retransmitted  after  a  timeout  (or  on  duplicate  ACKs  via  fast  retransmit).  A  checksum
detects corruption (corrupt segments are dropped and resent). Flow control stops the sender from overrunning the
receiver. Together these turn the unreliable IP layer underneath into a reliable, ordered byte stream.

tell

Q65. [Medium]  What is TCP flow control?
MODEL ANSWER
Flow  control  prevents  a  fast  sender  from  overwhelming  a  slow  receiver's  buffer.  TCP  uses  a  sliding  window:  the
receiver advertises a 'receive window' (rwnd) - how much buffer space it has free - in every ACK, and the sender limits
its  in-flight  unacked  data  to  that  window.  If  the  receiver's  buffer  fills,  it  advertises  a  smaller  window  (even  zero),
throttling the sender. It's strictly receiver-driven and end-to-end - distinct from congestion control, which is about the
network.

Q66. [Hard]  Explain TCP congestion control (slow start, congestion avoidance, AIMD).
n Asked at Amazon, Microsoft
MODEL ANSWER
Congestion control prevents the sender from overwhelming the network (vs flow control, which protects the receiver).
It uses a congestion window (cwnd). Slow start - begin small and double cwnd every RTT (exponential growth) until
reaching  a  threshold  (ssthresh).  Congestion  avoidance  -  past  the  threshold,  grow  cwnd  linearly  (by  ~1  MSS  per
RTT) to probe capacity gently.

On  packet  loss  (the  congestion  signal),  it  backs  off  -  this  is  AIMD  (Additive  Increase,  Multiplicative  Decrease):
increase slowly, but on loss cut cwnd sharply (e.g. halve it). The additive-increase/multiplicative-decrease pattern is
what makes TCP fair and stable across many flows sharing a link.

Q67. [Hard]  What are fast retransmit and fast recovery?
MODEL ANSWER
They  speed  up  loss  recovery  without  waiting  for  a  slow  timeout.  Fast  retransmit  -  if  the  sender  receives  three
duplicate ACKs (the receiver keeps asking for the same next byte), it infers that segment was lost and retransmits it
immediately, rather than waiting for the retransmission timer. Fast recovery - after fast retransmit, instead of dropping
all the way back to slow start, TCP halves cwnd and continues in congestion avoidance, since the arrival of duplicate
ACKs means packets are still flowing. Together (TCP Reno) they keep throughput high during isolated losses.

Computer Networks  |  SDE Fresher Question Bank

Page 15

Q68. [Medium]  What's the difference between flow control and congestion control?
n Commonly asked
MODEL ANSWER
Both throttle the sender, but for different reasons. Flow control protects the receiver from being overwhelmed - it's
governed  by  the  receiver's  advertised  window  (rwnd),  an  end-to-end  concern.  Congestion  control  protects  the
network  (routers/links)  from  being  overwhelmed  -  it's  governed  by  the  sender's  congestion  window  (cwnd),  inferred
from  loss/delay  signals.  The  actual  amount  a  sender  can  transmit  is  the  minimum  of  the  two  windows:  min(rwnd,
cwnd). One is about the endpoint, the other about the path.

Q69. [Medium]  What are sequence and acknowledgment numbers in TCP?
MODEL ANSWER
The sequence number identifies the position of the first byte of a segment's data within the overall byte stream, letting
the receiver reorder segments and detect gaps/duplicates. The acknowledgment number is the next byte the receiver
expects  -  i.e.  it  cumulatively  acknowledges  all  bytes  up  to  that  point.  So  if  a  receiver  ACKs  1001,  it  has  correctly
received bytes through 1000 and wants 1001 next. They start from random initial sequence numbers (set during the
handshake) for security and to avoid confusion with old connections.

Q70. [Medium]  What are the key fields in the TCP header?
MODEL ANSWER
Source  and  destination  ports;  the  sequence  number  and  acknowledgment  number;  the  data  offset  (header
length); flags (SYN, ACK, FIN, RST, PSH, URG); the window size (for flow control); the checksum; and the urgent
pointer.  The  header  is  20  bytes  minimum  (vs  UDP's  8).  The  flags  and  seq/ack  numbers  are  the  most
interview-relevant - they drive the handshake and reliability.

Q71. [Medium]  What is MSS and how does it relate to MTU?
MODEL ANSWER
MSS  (Maximum  Segment  Size)  is  the  largest  amount  of  application  data  TCP  will  put  in  one  segment,  while  MTU
(Maximum Transmission Unit) is the largest frame a link can carry. They're related: MSS = MTU - IP header - TCP
header.  For  typical  Ethernet,  MSS  =  1500  -  20  -  20  =  1460  bytes.  Sizing  MSS  to  fit  the  path  MTU  avoids  IP
fragmentation, which would hurt performance - so the two ends negotiate MSS during the handshake.

Q72. [Easy]  What is a socket, and what's the difference between a port and a socket?
MODEL ANSWER
A port is just a 16-bit number identifying an application on a host. A socket is the actual endpoint of a connection - the
combination of an IP address and a port (plus protocol). A unique TCP connection is identified by the 4-tuple (source
IP, source port, destination IP, destination port). So one server port (say 443) can have thousands of simultaneous
connections, because each is a distinct socket pair differing in the client's IP/port.

Q73. [Medium]  What is Nagle's algorithm?
MODEL ANSWER
Nagle's algorithm improves efficiency by reducing the number of small packets ('tinygrams'). It holds back sending a
small chunk of data if there's already unacknowledged data in flight, buffering small writes until either an ACK arrives
or enough data accumulates to fill a segment. This avoids flooding the network with many tiny packets (each with 40
bytes of header for a few bytes of data). The downside is added latency for interactive/real-time apps, which is why
latency-sensitive applications disable it with the TCP_NODELAY option.

Q74. [Hard]  What is head-of-line (HOL) blocking?
MODEL ANSWER
Head-of-line  blocking  is  when  one  delayed/lost  item  holds  up  everything  queued  behind  it,  even  if  those  could  be
processed independently. In TCP, because it delivers a strictly ordered byte stream, a single lost segment makes the
receiver hold all subsequent segments until the missing one is retransmitted - so unrelated data waits.

This  hurt  HTTP/2,  which  multiplexes  many  streams  over  one  TCP  connection:  one  lost  packet  stalls  all  streams.
That's a major reason HTTP/3 moved to QUIC over UDP, which gives each stream independent delivery so a loss in
one doesn't block the others.

Computer Networks  |  SDE Fresher Question Bank

Page 16

Q75. [Medium]  What is a SYN flood attack?
MODEL ANSWER
A SYN flood is a denial-of-service attack that abuses the handshake: the attacker sends many SYN packets (often
with spoofed source IPs) but never completes the handshake with the final ACK. Each leaves a half-open connection
consuming  server  resources  in  the  backlog  queue;  enough  of  them  exhaust  the  queue  so  legitimate  clients  can't
connect. Defences include SYN cookies (the server encodes connection state into the sequence number instead of
allocating  resources  until  the  ACK  returns),  rate  limiting,  and  bigger  backlogs.  It's  a  classic  example  tying  the
handshake to security.

Q76. [Medium]  What happens if a TCP acknowledgment is lost?
MODEL ANSWER
If an ACK is lost, the sender's retransmission timer for that data expires and it retransmits the segment. The receiver,
which  already  got  the  original,  recognises  the  duplicate  by  its  sequence  number,  discards  the  duplicate  data,  and
re-sends the ACK. Because TCP ACKs are cumulative, a later ACK also covers earlier ones - so a single lost ACK is
often implicitly recovered by the next ACK without any retransmission at all. Either way, no data is lost; reliability is
preserved.

Q77. [Easy]  What is TCP keepalive?
MODEL ANSWER
TCP keepalive periodically sends a small probe on an otherwise idle connection to check whether the other end is still
reachable.  If  several  probes  go  unanswered,  the  connection  is  considered  dead  and  closed,  freeing  resources.  It
detects  half-open  connections  (e.g.  the  peer  crashed  or  a  NAT  dropped  the  mapping)  that  would  otherwise  linger
forever.  Note  it's  relatively  infrequent  by  default  (hours),  so  many  apps  implement  their  own  application-level
heartbeats for faster detection.

Q78. [Medium]  Why do DNS, video streaming, and online games typically use UDP?
MODEL ANSWER
Because for these, speed and timeliness beat guaranteed delivery. DNS - a query and response are tiny and fit in one
packet;  TCP's  handshake  would  triple  the  latency,  and  on  the  rare  loss  the  client  just  retries.  Live  video/VoIP  -  a
retransmitted old frame arrives too late to be useful, so it's better to drop it and keep playing than to stall waiting (TCP
would stall). Games - the latest position update matters; resending stale state wastes time. These apps tolerate or
handle loss themselves, so UDP's no-overhead, no-blocking behaviour wins.

Q79. [Medium]  How does the UDP header differ from the TCP header?
MODEL ANSWER
UDP's header is just 8 bytes with four fields: source port, destination port, length, and checksum. TCP's is 20+ bytes
with  sequence/acknowledgment  numbers,  flags,  window  size,  and  more  -  all  the  machinery  for  reliability,  ordering,
and flow/congestion control. The minimal UDP header is exactly why UDP is faster and lighter: it carries no state for
reliability  because  it  provides  none.  The  header  size  difference  (8  vs  20)  is  a  quick  way  to  summarise  the
philosophies.

Q80. [Easy]  People say 'TCP/IP' as one thing - what's the actual difference between TCP and IP?
MODEL ANSWER
They're two different protocols at two different layers that work together. IP (network layer) handles addressing and
routing - getting individual packets from source to destination across networks - but it's best-effort: no guarantee of
delivery, order, or integrity. TCP (transport layer) sits on top of IP and adds reliability - connections, acknowledgments,
retransmission, ordering, and flow/congestion control.

So  IP  moves  packets  (possibly  lost  or  out  of  order),  and  TCP  turns  that  unreliable  packet  delivery  into  a  reliable,
ordered byte stream for applications. 'TCP/IP' refers to the whole protocol suite, but the two pieces do distinct jobs -
which is exactly why UDP can replace TCP over the same IP layer when you don't need reliability.

Computer Networks  |  SDE Fresher Question Bank

Page 17

5. Application Layer: HTTP & HTTPS

The layer closest to backend work, so it's heavily probed - HTTP methods, status codes, idempotency, the TLS
handshake, REST, and caching. Your web/backend projects make these natural strengths; answer with practical detail.

Q81. [Easy]  What does the application layer do, and what are some common protocols?
MODEL ANSWER
The application layer is the topmost layer - it provides the protocols that user-facing applications use to exchange data
over the network. It defines message formats and rules for specific services. Common protocols: HTTP/HTTPS (web),
DNS  (name  resolution),  SMTP/IMAP/POP3  (email),  FTP/SFTP  (file  transfer),  SSH  (secure  remote  login),  DHCP
(address assignment), and WebSocket (real-time bidirectional). It's where 'what the data means' lives, on top of the
transport layer that moves it.

Q82. [Easy]  What is HTTP?
MODEL ANSWER
HTTP  (HyperText  Transfer  Protocol)  is  the  application-layer,  request-response  protocol  the  web  runs  on  -  a  client
(browser)  sends  a  request,  the  server  returns  a  response.  It's  stateless  (each  request  is  independent),  text-based
and  human-readable,  and  runs  over  TCP  (port  80;  443  for  HTTPS).  A  request  has  a  method,  URL,  headers,  and
optional body; a response has a status code, headers, and body.

Q83. [Medium]  What are the main HTTP methods?
n Commonly asked
MODEL ANSWER
GET  -  retrieve  a  resource  (no  body,  no  side  effects).  POST  -  create  a  resource  or  submit  data  (has  a  body,  not
idempotent). PUT - replace a resource entirely (idempotent). PATCH - partially update a resource. DELETE - remove
a resource (idempotent). HEAD - like GET but headers only. OPTIONS - ask what methods/capabilities are supported
(used by CORS preflight). Knowing which are safe and idempotent is the common follow-up.

Q84. [Medium]  What do 'safe' and 'idempotent' mean for HTTP methods?
n Asked at Amazon, backend roles
MODEL ANSWER
A method is safe if it doesn't modify server state - just reads (GET, HEAD, OPTIONS). A method is idempotent if
making the same request multiple times has the same effect as making it once - the end state is identical. GET, PUT,
DELETE, HEAD are idempotent; POST is not.

Why it matters: idempotency makes retries safe. If a PUT or DELETE times out, the client can resend it without fear of
double effects, but resending a POST might create two orders. This is central to designing reliable APIs - which is why
payment endpoints add idempotency keys to make POSTs safely retryable.

Q85. [Medium]  What's the difference between GET and POST?
n Universally asked
MODEL ANSWER
GET retrieves data: parameters go in the URL query string, it has no body, it's safe and idempotent, can be cached
and bookmarked, and has URL length limits. POST submits data: parameters go in the request body, it can change
server state, it's neither safe nor idempotent, isn't cached by default, and has no practical size limit.

Practically: use GET to fetch/read (search, view), POST to create or perform actions (submit a form, place an order).
And never put sensitive data in a GET URL - it lands in logs, history, and referer headers.

Q86. [Medium]  What are the categories of HTTP status codes?
MODEL ANSWER
Five classes by first digit. 1xx Informational (request received, continuing). 2xx Success (the request worked - 200
OK,  201  Created).  3xx  Redirection  (further  action  needed  -  301  Moved,  304  Not  Modified).  4xx  Client  error  (the
request was bad - 400, 401, 403, 404). 5xx Server error (the server failed - 500, 502, 503). The mnemonic: 4xx is 'you
messed up', 5xx is 'the server messed up.'

Computer Networks  |  SDE Fresher Question Bank

Page 18

Q87. [Medium]  Explain the most common specific status codes.
MODEL ANSWER
200 OK; 201 Created (after a successful POST); 204 No Content. 301 Moved Permanently / 302 Found (temporary
redirect); 304 Not Modified (use your cache). 400 Bad Request; 401 Unauthorized (not authenticated); 403 Forbidden
(authenticated but not allowed); 404 Not Found; 429 Too Many Requests (rate limited). 500 Internal Server Error; 502
Bad  Gateway;  503  Service  Unavailable;  504  Gateway  Timeout.  Being  crisp  on  401  vs  403  and  301  vs  302  scores
points.

Q88. [Hard]  What's the difference between HTTP/1.1, HTTP/2, and HTTP/3?
MODEL ANSWER
HTTP/1.1 - text-based, one request at a time per connection (with keep-alive reuse); multiple requests need multiple
connections,  and  pipelining  suffers  head-of-line  blocking.  HTTP/2  -  binary  framing  with  multiplexing  (many
concurrent streams over one TCP connection), header compression (HPACK), and server push - but a single TCP
packet loss still HOL-blocks all streams. HTTP/3 - runs over QUIC (UDP) instead of TCP, so streams are independent
(no  transport-level  HOL  blocking),  with  faster  connection  setup  (0-RTT)  and  built-in  TLS  1.3.  Each  version  mainly
attacks the previous one's latency/blocking limits.

Q89. [Medium]  What is HTTP keep-alive / a persistent connection?
MODEL ANSWER
By default in HTTP/1.0 each request opened a new TCP connection and closed it after the response - wasteful, since
every request paid the handshake cost. Keep-alive (persistent connections, the default in HTTP/1.1) reuses a single
TCP connection for multiple request-response exchanges, avoiding repeated handshakes and TCP slow-start. This
significantly  reduces  latency  for  pages  that  fetch  many  resources.  HTTP/2  takes  it  further  by  multiplexing  many
requests over that one connection simultaneously.

Q90. [Medium]  What does it mean that HTTP is stateless, and how do we maintain state?
MODEL ANSWER
Stateless  means  the  server  doesn't  inherently  remember  anything  about  previous  requests  -  each  request  is
independent and must carry all the information needed to handle it. This makes servers simpler and far easier to scale
(any server can handle any request).

But real apps need state (who's logged in), so we layer it on top: cookies store a small token on the client that's sent
with each request; the server uses a session (or a stateless token like a JWT) to recognise the user. So HTTP stays
stateless while the application maintains state through these mechanisms.

Q91. [Medium]  What's the difference between cookies and sessions?
n Commonly asked
MODEL ANSWER
A  cookie  is  a  small  piece  of  data  stored  on  the  client  (browser)  and  sent  automatically  with  each  request  to  that
domain. A session is data stored on the server identifying a user's activity; the server gives the client a session ID
(usually in a cookie) to link subsequent requests back to that server-side data.

So cookies live client-side and can hold small data (preferences, the session ID); sessions live server-side and hold
sensitive/larger  data  (logged-in  user,  cart).  Cookies  are  less  secure  (user-visible,  tamperable)  so  you  keep  secrets
server-side.  The  modern  stateless  alternative  is  a  signed  JWT  carried  in  a  cookie/header,  avoiding  server-side
session storage.

Q92. [Medium]  What are HTTP headers, and what are some important ones?
MODEL ANSWER
Headers  are  key-value  metadata  sent  with  requests  and  responses  that  aren't  part  of  the  body.  Request  headers:
(credentials/tokens),  Cookie,  Content-Type.  Response  headers:
Host,  User-Agent,  Accept,  Authorization
Content-Type,  Content-Length,  Set-Cookie,  Cache-Control,  Location  (for  redirects),  and  security  headers  like
Strict-Transport-Security. They control content negotiation, caching, authentication, and security - the 'how to interpret
and handle this message' instructions around the payload.

Computer Networks  |  SDE Fresher Question Bank

Page 19

Q93. [Easy]  What does an HTTP request and response look like structurally?
MODEL ANSWER
A request has a request line (method, path, HTTP version - e.g. 'GET /index.html HTTP/1.1'), then headers (Host,
Accept, ...), a blank line, and an optional body (for POST/PUT). A response has a status line ('HTTP/1.1 200 OK'),
then headers (Content-Type, Content-Length, ...), a blank line, and the body (the HTML/JSON/etc.). The blank line
separating headers from body is part of the format.

Q94. [Medium]  What is HTTPS and how does it differ from HTTP?
n Asked at Amazon, Microsoft
MODEL ANSWER
HTTPS is HTTP running over TLS (formerly SSL), adding encryption, integrity, and authentication - it uses port 443.
Plain  HTTP  sends  everything  in  cleartext,  so  anyone  on  the  path  can  read  or  tamper  with  it;  HTTPS  encrypts  the
traffic so eavesdroppers see gibberish, detects tampering, and verifies the server's identity via a certificate.

So  HTTPS  gives  you  three  things  HTTP  lacks:  confidentiality  (encryption),  integrity  (tamper  detection),  and
authentication (you're really talking to the claimed site). It's now the default for essentially all web traffic.

Q95. [Hard]  How does the TLS handshake work?
n Asked at Amazon, Microsoft - the depth question
MODEL ANSWER
The  TLS  handshake  establishes  a  secure  channel  before  any  HTTP  data  flows.  In  essence:  (1)  the  client  sends
'ClientHello' with supported cipher suites and a random; (2) the server replies 'ServerHello' choosing a cipher, sends
its certificate (containing its public key), and its random; (3) the client verifies the certificate against trusted CAs; (4)
the  two  sides  perform  a  key  exchange  (e.g.  Diffie-Hellman)  to  agree  on  a  shared  symmetric  session  key  without
ever sending it in the clear; (5) they switch to encrypting everything with that symmetric key.

The clever part is the hybrid model: slow asymmetric crypto is used only to authenticate and securely establish the
session key, then fast symmetric encryption protects the actual data. TLS 1.3 streamlines this to a single round trip (or
zero on resumption).

Q96. [Medium]  Why does TLS use both asymmetric and symmetric encryption?
MODEL ANSWER
Because  they  have  complementary  strengths.  Asymmetric  (public/private  key)  encryption  solves  key  distribution  -
you can share a public key openly and let anyone encrypt to you - and enables authentication via certificates, but it's
computationally expensive (slow) for bulk data. Symmetric encryption is fast and efficient for large amounts of data,
but both sides need the same secret key.

TLS combines them: use asymmetric crypto once during the handshake to authenticate the server and securely agree
on a shared symmetric key, then use that fast symmetric key to encrypt all the actual traffic. Best of both - secure key
exchange plus fast bulk encryption.

Q97. [Medium]  What is an SSL/TLS certificate and the role of a Certificate Authority?
MODEL ANSWER
A TLS certificate is a digital document that binds a public key to an identity (a domain name), proving 'this public key
really  belongs  to  example.com.'  It's  issued  and  digitally  signed  by  a  trusted  Certificate  Authority  (CA)  (e.g.  Let's
Encrypt, DigiCert).

Your browser ships with a list of trusted root CAs; when a site presents its certificate, the browser verifies the CA's
signature up the chain to a trusted root. If valid, you can trust the public key and that you're talking to the real site (not
an impostor) - which is what prevents man-in-the-middle attacks. If the cert is expired, self-signed, or for the wrong
domain, the browser warns you.

Q98. [Medium]  What is REST, and what makes an API RESTful?
n Asked at backend roles
MODEL ANSWER
REST  (Representational  State  Transfer)  is  an  architectural  style  for  web  APIs  built  on  HTTP.  Its  key  principles:
resources  are
them  with  standard  HTTP  methods
(/users/42);  you  act  on
(GET/POST/PUT/DELETE)  mapping  to  read/create/update/delete;  communication  is  stateless  (each  request
self-contained);  responses  use  standard  representations  (usually  JSON)  and  status  codes;  and  it's  uniform  and
cacheable.

identified  by  URLs

Computer Networks  |  SDE Fresher Question Bank

Page 20

So a RESTful API uses nouns in URLs and verbs as HTTP methods - GET /users/42 to read, DELETE /users/42 to
remove  -  rather  than  RPC-style  endpoints  like  /getUser.  It's  popular  because  it  leverages  HTTP  cleanly,  is  simple,
scalable, and language-agnostic.

Q99. [Medium]  How do REST, GraphQL, and gRPC compare?
MODEL ANSWER
REST  -  resource-oriented  over  HTTP/JSON;  simple,  cacheable,  ubiquitous,  but  can  over-fetch/under-fetch  (fixed
endpoints  return  fixed  shapes)  and  need  many  round  trips.  GraphQL  -  a  query  language  where  the  client  asks  for
exactly  the  fields  it  needs  in  one  request;  great  for  flexible  front-ends  and  avoiding  over-fetching,  but  caching  and
complexity  are  harder.  gRPC  -  binary,  contract-first  (Protobuf)  RPC  over  HTTP/2;  very  fast  and  efficient  with
streaming, ideal for internal service-to-service communication, but not human-readable and limited in browsers. Rule
of thumb: REST for public/simple APIs, GraphQL for flexible client data needs, gRPC for high-performance internal
microservices.

Q100. [Medium]  How does HTTP caching work (Cache-Control, ETag, 304)?
MODEL ANSWER
HTTP  caching  avoids  re-downloading  unchanged  resources.  The  server  sends  Cache-Control  headers  (e.g.
max-age=3600, no-cache, private/public) telling clients/proxies how long a response can be reused. For revalidation,
the server sends an ETag (a version fingerprint) or Last-Modified date; on the next request the client sends it back via
If-None-Match  /  If-Modified-Since,  and  if  unchanged  the  server  replies  304  Not  Modified  with  no  body  -  saving
bandwidth. This layered caching (browser, CDN, proxy) is one of the biggest web performance levers.

Q101. [Medium]  What is CORS and why does it exist?
MODEL ANSWER
CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls whether a web page from one
origin  (domain+port+scheme)  can  make  requests  to  a  different  origin.  By  default  the  same-origin  policy  blocks
cross-origin requests to protect users; CORS lets a server opt in by sending headers like Access-Control-Allow-Origin
to say which origins are permitted.

For  certain  requests  the  browser  first  sends  a  preflight  OPTIONS  request  to  check  permission  before  the  real
request. It's a frequent source of 'it works in Postman but not the browser' confusion - because CORS is enforced by
the browser, not the server. The fix is configuring the right Allow headers on the server.

Q102. [Medium]  What's the difference between PUT and PATCH?
MODEL ANSWER
PUT replaces the entire resource with the payload you send - if you omit a field, it's typically removed/reset, so you
must send the complete representation. PATCH applies a partial update - you send only the fields to change. PUT is
idempotent  by  definition  (sending  the  same  full  representation  repeatedly  yields  the  same  state);  PATCH  can  be
idempotent depending on how it's defined. Use PUT for full replacement, PATCH for modifying a few fields.

Q103. [Easy]  What's the difference between 401 Unauthorized and 403 Forbidden?
MODEL ANSWER
401  Unauthorized  actually  means  'unauthenticated'  -  the  server  doesn't  know  who  you  are;  you  need  to  log  in  or
provide valid credentials, and retrying with proper auth could work. 403 Forbidden means the server knows who you
are  but  you  don't  have  permission  for  this  resource  -  authenticating  differently  won't  help  (it's  an  authorization
problem, not authentication). Mnemonic: 401 = 'who are you?', 403 = 'I know you, but no.'

Q104. [Medium]  What do the Secure, HttpOnly, and SameSite cookie attributes do?
n Asked at backend/security rounds
MODEL ANSWER
They harden cookies against common attacks. Secure - the cookie is only sent over HTTPS, so it can't be intercepted
on  a  plaintext  connection.  HttpOnly  -  the  cookie  is  inaccessible  to  JavaScript  (document.cookie),  which  blocks  an
XSS  script  from  stealing  the  session  token.  SameSite  (Strict/Lax/None)  -  controls  whether  the  cookie  is  sent  on
cross-site  requests,  the  primary  defence  against  CSRF  (Lax,  the  modern  default,  withholds  it  on  most  cross-site
requests).

Together they're best practice for session cookies: Secure + HttpOnly + SameSite=Lax/Strict mitigates interception,
XSS theft, and CSRF respectively - a strong, concrete security answer.

Computer Networks  |  SDE Fresher Question Bank

Page 21

6. DNS

DNS is asked everywhere because it underpins 'what happens when you type a URL.' Know the resolution flow,
recursive vs iterative, the common record types, and why it leans on UDP plus caching.

Q105. [Easy]  What is DNS?
n Universally asked
MODEL ANSWER
DNS (Domain Name System) is the internet's phonebook - it translates human-friendly domain names (google.com)
into  the  IP  addresses  (142.250.x.x)  machines  use  to  route  traffic.  It's  a  distributed,  hierarchical,  globally-cached
database, so no single server holds everything. Without DNS you'd have to memorise IP addresses for every site.

Q106. [Hard]  Walk me through the DNS resolution process when you visit a domain.
n Asked at Amazon, Microsoft - the classic
MODEL ANSWER
Your machine asks a resolver (usually your ISP's or 8.8.8.8) for the domain's IP. The resolver checks its cache; on a
miss it walks the hierarchy: it asks a root server, which directs it to the right TLD server (e.g. for .com), which directs it
to the domain's authoritative name server, which returns the actual IP.

browser cache -&gt; OS cache -&gt; resolver cache
     |  (miss)
resolver -&gt; root NS    -&gt; 'ask the .com TLD'
resolver -&gt; .com TLD   -&gt; 'ask example.com's authoritative NS'
resolver -&gt; authoritative NS -&gt; 'example.com = 93.184.x.x'
resolver -&gt; caches + returns IP to client

Each step is cached (with a TTL) at multiple levels, so most lookups never travel this whole path. The resolver does
the heavy lifting recursively; the servers it queries answer iteratively.

Q107. [Medium]  What's the difference between a recursive and an iterative DNS query?
MODEL ANSWER
In a recursive query, the client asks the resolver for the final answer and the resolver does all the work - chasing root,
TLD,  and  authoritative  servers  -  then  returns  the  complete  answer  (or  an  error).  In  an  iterative  query,  each  server
doesn't fully resolve; it just returns a referral ('I don't know, but ask this server'), and the asker follows the chain itself.
Typically the client-to-resolver query is recursive, and the resolver-to-nameservers queries are iterative.

Q108. [Medium]  What are the common DNS record types?
MODEL ANSWER
A - maps a domain to an IPv4 address. AAAA - to an IPv6 address. CNAME - an alias pointing one name to another
canonical name. MX - mail exchange server for the domain. NS - the authoritative name servers for the domain. TXT -
arbitrary text (used for SPF, DKIM, domain verification). PTR - reverse lookup (IP to name). SOA - start of authority
(zone metadata). A, CNAME, and MX are the ones you'll most likely be asked to explain.

Q109. [Medium]  Describe the DNS hierarchy (root, TLD, authoritative servers).
MODEL ANSWER
DNS  is  a  tree.  At  the  top  are  the  root  servers  (the  '.'),  which  know  where  the  TLD  servers  are.  TLD  (Top-Level
Domain)  servers  handle  a  suffix  like  .com,  .org,  .in,  and  know  the  authoritative  servers  for  domains  under  them.
Authoritative  name  servers  hold  the  actual  DNS  records  for  a  specific  domain  and  give  the  definitive  answer.
Reading a name right-to-left (example.com.) mirrors the traversal: root -> .com -> example. This delegation is what
makes DNS scalable and decentralised.

Q110. [Medium]  How does DNS caching work, and what role does TTL play?
MODEL ANSWER
Because DNS records rarely change, answers are cached at many levels - the browser, the OS, and the resolver - so
repeat lookups are instant and the authoritative servers aren't hammered. Each record carries a TTL (Time To Live)
set by the domain owner, specifying how long it may be cached before a fresh lookup is required.

TTL is a trade-off: a high TTL means better performance and fewer queries but slower propagation of changes; a low
TTL means changes (like a server migration) take effect quickly but more lookups hit the authoritative servers. That's
why admins lower the TTL before a planned IP change.

Computer Networks  |  SDE Fresher Question Bank

Page 22

Q111. [Medium]  Why does DNS primarily use UDP, and when does it use TCP?
MODEL ANSWER
DNS uses UDP (port 53) for normal queries because they're small (a query and its response usually fit in one packet),
and UDP's no-handshake, low-overhead nature makes lookups fast; if a response is lost, the client just retries. DNS
switches to TCP when the response is too large to fit in a single UDP packet (historically over 512 bytes, common with
DNSSEC) and for zone transfers between name servers, which need reliable bulk transfer. So: UDP for speed on the
common case, TCP for large or bulk responses.

Q112. [Easy]  What is a DNS resolver?
MODEL ANSWER
A DNS resolver (recursive resolver) is the server that does the work of resolving a domain on the client's behalf - it
receives the recursive query, checks its cache, and if needed queries the root, TLD, and authoritative servers, then
returns the final answer and caches it. It's usually run by your ISP, or a public one like Google (8.8.8.8) or Cloudflare
(1.1.1.1). Your device just asks the resolver and gets an answer.

Q113. [Easy]  What's the difference between an A record and a CNAME record?
MODEL ANSWER
An  A  record  maps  a  domain  name  directly  to  an  IP  address.  A  CNAME  maps  a  domain  name  to  another  domain
name (an alias), which is then itself resolved to an IP. Use a CNAME when you want several names to follow one
canonical target (e.g. www.example.com -> example.com, or pointing to a CDN's hostname) so you only update the
IP in one place. Caveat: you can't put a CNAME at the zone apex (the bare domain) in standard DNS, and a CNAME
adds one extra lookup.

Q114. [Medium]  What is DNS round-robin, and how is it used for load balancing?
MODEL ANSWER
DNS round-robin configures multiple A records (multiple IPs) for the same domain; the DNS server hands them out in
rotating order, so different clients connect to different servers - a simple, cheap form of load distribution. Its limitations:
it doesn't account for server load or health (it'll keep sending clients to a dead server until the record is removed and
caches expire), and client/resolver caching skews distribution. So it's a coarse tool, usually combined with real load
balancers and health checks.

Q115. [Medium]  What is DNS spoofing / cache poisoning?
MODEL ANSWER
DNS cache poisoning is an attack where false DNS records are injected into a resolver's cache, so a domain name
resolves to an attacker-controlled IP - sending users to a malicious site while the URL looks correct. It exploits DNS's
traditional  lack  of  authentication  (especially  over  UDP,  where  responses  can  be  forged  if  the  attacker  guesses  the
query ID). The defence is DNSSEC, which cryptographically signs DNS records so resolvers can verify authenticity,
plus randomising query IDs/ports to make forgery harder.

Q116. [Easy]  What happens if DNS resolution fails?
MODEL ANSWER
If a domain can't be resolved, the client can't get an IP address, so the connection never even starts - the browser
shows  an  error  like  'server  not  found'  /  DNS_PROBE_FINISHED_NXDOMAIN.  Causes  include  the  domain  not
existing (NXDOMAIN), a misconfigured or unreachable DNS server, or network issues. Common quick checks: try a
different resolver (8.8.8.8), flush the DNS cache, or use nslookup/dig to see where resolution breaks. It's a reminder
that DNS is the very first step - if it fails, nothing else can happen.

Q117. [Medium]  What's the difference between an authoritative and a non-authoritative DNS answer?
MODEL ANSWER
An  authoritative  answer  comes  directly  from  the  name  server  that  actually  holds  the  domain's  records  -  it's  the
definitive source. A non-authoritative answer comes from a resolver's cache rather than the source - it's a (possibly
slightly stale) copy served because the record was cached from a previous lookup. When you run nslookup and see
'Non-authoritative answer', it just means your resolver answered from cache, not that the answer is wrong.

Computer Networks  |  SDE Fresher Question Bank

Page 23

7. Web, Email & Other Protocols

The supporting cast - FTP, the email trio (SMTP/IMAP/POP3), SSH, proxies, CDNs, and load balancers. Often asked as
quick 'what is X and which port' or 'difference between X and Y' questions; the proxy/CDN/load-balancer trio also feeds
into system-design discussions.

Q118. [Medium]  How does FTP work, and what's the difference between active and passive mode?
MODEL ANSWER
FTP  (File  Transfer  Protocol)  transfers  files  using  two  separate  connections:  a  control  connection  (port  21)  for
commands, and a data connection (port 20 or negotiated) for the actual file bytes. In active mode the server opens
the data connection back to the client, which often breaks behind NAT/firewalls. In passive mode the server opens a
port  and  the  client  initiates  the  data  connection  -  firewall-friendly,  so  it's  the  common  default.  Note  plain  FTP  is
unencrypted; SFTP (over SSH) or FTPS is used for security.

Q119. [Medium]  What are SMTP, IMAP, and POP3?
MODEL ANSWER
They're the email protocols, split by direction. SMTP (Simple Mail Transfer Protocol, port 25/587) sends mail - from
your client to your mail server and between servers. IMAP (port 143/993) and POP3 (port 110/995) retrieve mail from
your server to your client. So the rule of thumb: SMTP pushes mail out, IMAP/POP3 pull mail in.

Q120. [Medium]  What's the difference between IMAP and POP3?
MODEL ANSWER
POP3  downloads  emails  to  a  single  device  and  (by  default)  deletes  them  from  the  server  -  mail  lives  on  that  one
device, with no sync. IMAP keeps emails on the server and syncs state (read/unread, folders) across all your devices,
so  your  inbox  looks  the  same  everywhere.  IMAP  is  what  virtually  everyone  uses  today  because  we  read  mail  on
multiple  devices;  POP3  suits  a  single-device,  offline-storage  scenario  or  when  you  want  to  pull  mail  off  the  server
entirely.

Q121. [Medium]  What is SSH and what does it provide?
MODEL ANSWER
SSH (Secure Shell, port 22) is a protocol for securely accessing and managing a remote machine over an untrusted
network - most commonly a remote terminal/shell. It provides encryption (all traffic is confidential), authentication
(via passwords or, better, public-key pairs), and integrity. Beyond shells it powers SCP/SFTP file transfer and port
forwarding/tunneling. It replaced Telnet, which sent everything (including passwords) in plaintext.

Q122. [Easy]  What's the difference between Telnet and SSH?
MODEL ANSWER
Both  give  remote  command-line  access,  but  Telnet  (port  23)  transmits  everything  -  including  your  username  and
password - in plaintext, so anyone sniffing the network can read it. SSH (port 22) encrypts the entire session and
supports strong key-based authentication. Telnet is essentially obsolete for remote access because of this; SSH is the
secure standard. The one-liner: SSH is Telnet done securely.

Q123. [Medium]  What is a proxy server, and what's the difference between a forward and reverse proxy?
n Asked at backend/system-design rounds
MODEL ANSWER
A proxy is an intermediary that sits between clients and servers and relays requests. A forward proxy sits in front of
clients and represents them to the internet - used for caching, content filtering, anonymity, or bypassing restrictions
(the server sees the proxy, not the client). A reverse proxy sits in front of servers and represents them to clients -
used for load balancing, SSL termination, caching, and hiding/protecting backend servers (the client sees the proxy,
not the real servers). Nginx and HAProxy are common reverse proxies.

Q124. [Medium]  What is a CDN and how does it speed things up?
n Asked at Amazon, system-design-adjacent
MODEL ANSWER
A CDN (Content Delivery Network) is a geographically distributed network of edge servers that cache copies of your
content (images, video, CSS/JS, even API responses) close to users. When a user requests content, they're served
from the nearest edge location rather than your origin server far away.

Computer Networks  |  SDE Fresher Question Bank

Page 24

This speeds things up by reducing latency (shorter physical distance = lower RTT), offloading traffic from the origin
(less load, lower cost), and absorbing spikes/DDoS. It's a foundational scaling tool - and a great thing to mention in
system design for any static or cacheable content.

Q125. [Medium]  What is a load balancer, and what's the difference between L4 and L7?
n Asked at system-design rounds
MODEL ANSWER
A  load  balancer  distributes  incoming  traffic  across  multiple  backend  servers  to  improve  availability,  scalability,  and
reliability (and does health checks to avoid dead servers). An L4 (transport-layer) load balancer routes based on IP
and  TCP/UDP  port  without  inspecting  content  -  very  fast,  but  it  can't  make  content-aware  decisions.  An  L7
(application-layer)  load  balancer  inspects  the  actual  request  (URL,  headers,  cookies)  and  can  route  intelligently  -
e.g.  /api  to  one  pool,  /images  to  another,  or  sticky  sessions  -  at  the  cost  of  more  processing.  Common  algorithms:
round-robin, least-connections, IP-hash.

Q126. [Easy]  What are some well-known port numbers?
MODEL ANSWER
Worth memorising: 20/21 FTP, 22 SSH/SCP/SFTP, 23 Telnet, 25 SMTP, 53 DNS, 67/68 DHCP, 80 HTTP, 110 POP3,
143  IMAP,  443  HTTPS,  3306  MySQL,  5432  PostgreSQL,  6379  Redis,  27017  MongoDB.  Ports  0-1023  are
'well-known' (system), 1024-49151 registered, and 49152+ are ephemeral (client-side). 80, 443, 22, and 53 are the
ones you should never hesitate on.

Q127. [Easy]  What is NTP?
MODEL ANSWER
NTP (Network Time Protocol, UDP port 123) synchronises the clocks of computers across a network to a reference
time source, keeping them accurate to within milliseconds. It matters more than it sounds: many systems depend on
synchronised  clocks  for  log  correlation,  TLS  certificate  validity,  distributed-system  ordering,  scheduled  jobs,  and
security  tokens.  Clock  skew  between  servers  causes  subtle,  painful  bugs  -  which  is  why  NTP  runs  quietly  on
essentially every server.

Q128. [Medium]  What's the difference between a proxy and a VPN?
MODEL ANSWER
A  proxy  reroutes  traffic  for  specific  applications  (often  just  your  browser)  and  typically  doesn't  encrypt  it  -  it  mainly
changes your apparent IP. A VPN (Virtual Private Network) creates an encrypted tunnel for all of your device's traffic
at the OS level, securing it end-to-end to the VPN server and hiding it from your local network/ISP. So a VPN is more
comprehensive (system-wide + encrypted), while a proxy is lighter and app-specific. For privacy/security you want a
VPN; for a quick per-app IP change, a proxy suffices.

Q129. [Easy]  What are MIME types?
MODEL ANSWER
MIME (Multipurpose Internet Mail Extensions) types are standardised labels that tell the recipient what kind of content
a  piece  of  data  is,  so  it's  handled  correctly.  They're  written  as  type/subtype  -  e.g.  text/html,  application/json,
image/png, multipart/form-data. HTTP uses them in the Content-Type header so the browser knows whether to render
HTML, parse JSON, or display an image. Originally created for email attachments, they're now central to the web.

Q130. [Medium]  What's the difference between a URL, a URI, and a URN?
MODEL ANSWER
A  URI  (Uniform  Resource  Identifier)  is  the  general  term  for  any  string  that  identifies  a  resource.  A  URL  (Uniform
Resource Locator) is a URI that also says how to locate the resource - it includes the scheme/protocol and address
(e.g. https://example.com/page). A URN (Uniform Resource Name) is a URI that names a resource uniquely without
saying  where  to  find  it  (e.g.  urn:isbn:0451450523).  So  URL  and  URN  are  both  types  of  URI:  URL  tells  you  where,
URN tells you what.

Computer Networks  |  SDE Fresher Question Bank

Page 25

Q131. [Medium]  How does an email travel from sender to recipient?
MODEL ANSWER
Your  mail  client  submits  the  message  to  your  outgoing  mail  server  via  SMTP.  That  server  looks  up  the  recipient
domain's MX record via DNS to find the recipient's mail server, and relays the message to it (again over SMTP). The
recipient's server stores the mail in their mailbox. Finally, the recipient's client retrieves it using IMAP or POP3. So the
path is: sender -> SMTP -> (DNS MX lookup) -> recipient's mail server -> IMAP/POP3 -> recipient. SMTP carries it
across; IMAP/POP3 delivers it to the reader.

Computer Networks  |  SDE Fresher Question Bank

Page 26

8. Network Security

Security questions are increasingly common even for freshers - symmetric vs asymmetric crypto, hashing vs encryption,
common attacks (MITM, DDoS, XSS/CSRF), and authentication vs authorization. Crisp definitions plus one real example
each is the winning format.

Q132. [Medium]  What's the difference between symmetric and asymmetric encryption?
n Asked at Amazon, Microsoft
MODEL ANSWER
Symmetric encryption uses a single shared secret key for both encryption and decryption (AES). It's fast and great
for  bulk  data,  but  both  parties  must  somehow  share  the  key  securely  -  the  key-distribution  problem.  Asymmetric
(public-key)  encryption  uses  a  key  pair:  a  public  key  (shared  openly)  and  a  private  key  (kept  secret);  what  one
encrypts,  only  the  other  can  decrypt  (RSA,  ECC).  It  solves  key  distribution  and  enables  digital  signatures,  but  it's
much slower.

That's why protocols like TLS use both: asymmetric to authenticate and exchange a key securely, then fast symmetric
encryption for the actual data.

Q133. [Medium]  What is a digital signature and how does it work?
MODEL ANSWER
A  digital  signature  proves  who  sent  a  message  and  that  it  wasn't  altered.  The  sender  hashes  the  message  and
encrypts  that  hash  with  their  private  key  -  that  encrypted  hash  is  the  signature,  attached  to  the  message.  The
recipient decrypts the signature with the sender's public key to recover the hash, independently hashes the received
message, and compares.

If they match, it proves authenticity (only the holder of the private key could have signed), integrity (any tampering
changes the hash), and non-repudiation (the sender can't deny it). It's asymmetric crypto used in reverse - sign with
private, verify with public.

Q134. [Medium]  What's the difference between hashing and encryption?
n Commonly asked
MODEL ANSWER
Encryption  is  reversible  (two-way)  -  data  is  scrambled  with  a  key  and  can  be  decrypted  back  to  the  original  by
someone with the right key; it's for confidentiality. Hashing is one-way - it maps data to a fixed-size digest that can't
be reversed to the original; it's for integrity and verification, not secrecy.

You encrypt data you need to read back later (a message, a file); you hash data you only need to verify (passwords -
store  the  hash,  compare  hashes  on  login;  checksums;  digital  signatures).  A  good  cryptographic  hash  is  also
collision-resistant. Storing passwords encrypted (reversible) instead of hashed is a classic security mistake.

Q135. [Medium]  What is a firewall, and what are the main types?
MODEL ANSWER
A  firewall  is  a  security  device/software  that  monitors  and  filters  network  traffic  based  on  rules,  forming  a  barrier
between  a  trusted  internal  network  and  untrusted  external  ones.  Types:  packet-filtering  (inspects  each  packet's
headers - IP/port - stateless, fast, basic); stateful (tracks connection state, so it allows return traffic for established
connections - smarter); and application-layer / next-gen (inspects actual content/payload, can block specific apps or
detect malware). They enforce 'who can talk to what' at the network boundary.

Q136. [Medium]  What is a DDoS attack and how do you mitigate it?
MODEL ANSWER
A  DDoS  (Distributed  Denial  of  Service)  attack  overwhelms  a  target  with  a  flood  of  traffic  from  many  compromised
machines (a botnet), exhausting its bandwidth, connections, or compute so legitimate users can't get through. Forms
include volumetric floods, protocol attacks (SYN floods), and application-layer attacks (flooding expensive endpoints).

Mitigation:  rate  limiting,  a  CDN/scrubbing  service  (Cloudflare,  AWS  Shield)  to  absorb  and  filter  traffic  at  the  edge,
anomaly  detection  to  drop  bad  traffic,  autoscaling  to  absorb  spikes,  and  blocklisting.  The  'distributed'  part  is  what
makes it hard - you can't just block one IP.

Computer Networks  |  SDE Fresher Question Bank

Page 27

Q137. [Medium]  What is a man-in-the-middle (MITM) attack?
n Asked at security-aware teams
MODEL ANSWER
In  a  MITM  attack,  an  attacker  secretly  positions  themselves  between  two  communicating  parties,  intercepting  (and
possibly altering) the traffic while both sides believe they're talking directly. It enables eavesdropping, credential theft,
and tampering. Common vectors: rogue Wi-Fi hotspots, ARP spoofing, and DNS spoofing.

The  defence  is  encryption  with  authentication  -  HTTPS/TLS  prevents  MITM  because  the  attacker  can't  read  the
encrypted traffic and can't present a valid certificate for the real domain (the browser would warn). That's exactly why
certificate validation in TLS matters and why you shouldn't click through cert warnings on public Wi-Fi.

Q138. [Medium]  What is ARP spoofing?
MODEL ANSWER
ARP  spoofing  (ARP  poisoning)  is  a  local-network  attack  where  the  attacker  sends  forged  ARP  replies  to  associate
their MAC address with the IP of another device (often the default gateway). Victims then send traffic meant for the
gateway  to  the  attacker  instead  -  enabling  man-in-the-middle  interception,  session  hijacking,  or  denial  of  service.  It
works because ARP has no authentication (hosts trust any ARP reply). Mitigations: static ARP entries, dynamic ARP
inspection on switches, and encryption (so intercepted traffic is useless).

Q139. [Medium]  What is IP spoofing?
MODEL ANSWER
IP spoofing is forging the source IP address in a packet's header so it appears to come from a different (trusted or
untraceable)  host.  Attackers  use  it  to  hide  their  identity,  bypass  IP-based  access  controls,  or  amplify  attacks  (e.g.
reflection  DDoS,  where  responses  to  spoofed  requests  flood  the  victim).  It's  possible  because  IP  itself  doesn't
authenticate the source. Defences include ingress/egress filtering by ISPs (drop packets with implausible source IPs)
and not relying on source IP alone for trust.

Q140. [Medium]  What is a replay attack?
MODEL ANSWER
A  replay  attack  is  when  an  attacker  captures  a  valid  data  transmission  (like  an  authentication  token  or  a  'transfer
money' request) and re-sends it later to fraudulently repeat the action - without ever needing to decrypt it. The defence
is  to  make  each  message  unique  and  time-bound:  nonces  (one-time  numbers),  timestamps  with  short  validity
windows, and sequence numbers, so a replayed message is recognised as stale or duplicate and rejected. It's why
secure tokens expire and include anti-replay fields.

Q141. [Easy]  What's the difference between authentication and authorization?
n Commonly asked
MODEL ANSWER
Authentication verifies who you are - proving your identity (password, token, biometric). Authorization determines
what you're allowed to do - your permissions once identified. Authentication always comes first; authorization follows.
Mapping to HTTP: 401 Unauthorized is really an authentication failure (prove who you are), while 403 Forbidden is an
authorization  failure  (I  know  you,  but  you  can't  access  this).  Mnemonic:  authentication  =  identity,  authorization  =
permissions.

Q142. [Easy]  What is multi-factor authentication (MFA)?
MODEL ANSWER
MFA requires two or more independent factors to verify identity, drawn from different categories: something you know
(password/PIN), something you have (phone, hardware token, OTP app), and something you are (fingerprint, face).
Requiring factors from different categories means a stolen password alone isn't enough - the attacker would also need
your  physical  device  or  biometric.  It  dramatically  reduces  account-takeover  risk,  which  is  why  it's  now  standard  for
sensitive logins.

Computer Networks  |  SDE Fresher Question Bank

Page 28

Q143. [Medium]  What is IPsec?
MODEL ANSWER
IPsec  is  a  suite  of  protocols  that  secures  communication  at  the  network  layer  by  authenticating  and  encrypting  IP
packets - so it protects all traffic between two endpoints transparently, regardless of application. Its main components
are  AH  (Authentication  Header  -  integrity/authenticity)  and  ESP  (Encapsulating  Security  Payload  -  encryption  +
integrity). It's the backbone of many VPNs, creating secure tunnels over the public internet. Because it operates at
Layer  3,  applications  don't  need  to  be  security-aware  -  contrast  with  TLS,  which  secures  individual  application
connections at a higher layer.

Q144. [Medium]  How should passwords be stored, and what is salting?
n Asked at backend/security rounds
MODEL ANSWER
Never store passwords in plaintext or reversibly encrypted - store a hash, so even a database breach doesn't reveal
the  actual  passwords.  But  plain  hashing  is  vulnerable  to  precomputed  'rainbow  table'  attacks  and  reveals  identical
passwords as identical hashes. A salt - a unique random value added to each password before hashing - fixes this: it
makes every hash unique and defeats rainbow tables.

And  use  a  slow,  purpose-built  password  hash  (bcrypt,  scrypt,  Argon2)  rather  than  a  fast  one  (MD5/SHA-256),
because slowness throttles brute-force attempts. So the correct answer is 'salted bcrypt/Argon2', not 'SHA-256.'

Q145. [Medium]  What is PKI / a certificate chain?
MODEL ANSWER
PKI (Public Key Infrastructure) is the system of certificate authorities, certificates, and trust relationships that lets you
trust a public key belongs to a real identity. Trust flows in a chain: your browser trusts a small set of root CAs (built
into  the  OS/browser);  roots  sign  intermediate  CAs;  intermediates  sign  a  website's  leaf  certificate.  When  a  site
presents its cert, the browser verifies each signature up the chain to a trusted root. If the whole chain validates, the
cert is trusted; break any link and it's rejected. PKI is what makes HTTPS's trust model work at internet scale.

Q146. [Medium]  What's the difference between an IDS and an IPS?
MODEL ANSWER
Both  detect  malicious  network  activity,  but  differ  in  response.  An  IDS  (Intrusion  Detection  System)  is  passive  -  it
monitors  traffic  and  alerts  administrators  to  suspicious  activity,  but  doesn't  stop  it.  An  IPS  (Intrusion  Prevention
System)  is  active  and  inline  -  it  can  block  or  drop  malicious  traffic  in  real  time.  So  IDS  watches  and  warns;  IPS
watches and acts. The trade-off: an IPS can stop attacks immediately but a false positive could block legitimate traffic.

Q147. [Medium]  What is cross-site scripting (XSS)?
MODEL ANSWER
XSS is a web vulnerability where an attacker injects malicious JavaScript into a page that other users view, so the
script  runs  in  their  browsers  with  the  site's  privileges  -  stealing  cookies/session  tokens,  keylogging,  or  defacing.  It
happens when a site renders user-supplied input without sanitising it (e.g. echoing a comment containing a <script>
tag). Defences: escape/encode output, validate and sanitise input, use a Content-Security-Policy, and mark session
cookies HttpOnly so scripts can't read them. The root fix is 'never trust user input; encode it for the context.'

Q148. [Medium]  What is CSRF (Cross-Site Request Forgery)?
MODEL ANSWER
CSRF  tricks  a  logged-in  user's  browser  into  making  an  unwanted  request  to  a  site  where  they're  authenticated  -
exploiting the fact that browsers automatically attach cookies. For example, a malicious page silently submits a form
to your bank's 'transfer' endpoint; since your session cookie rides along, the bank thinks you made the request.

Defences:  anti-CSRF  tokens  (a  secret  per-session  token  the  attacker  can't  guess,  required  on  state-changing
requests),  the  SameSite  cookie  attribute  (don't  send  cookies  on  cross-site  requests),  and  checking  Origin/Referer.
Note XSS vs CSRF: XSS runs the attacker's script on your site; CSRF abuses your existing session from another site.

Computer Networks  |  SDE Fresher Question Bank

Page 29

Q149. [Easy]  What is the principle of 'defense in depth' / zero trust?
MODEL ANSWER
Defense in depth means layering multiple independent security controls so that if one fails, others still protect you -
firewall + encryption + authentication + monitoring + least-privilege, rather than relying on a single wall. Zero trust is
the  modern  philosophy  of  'never  trust,  always  verify'  -  don't  assume  anything  inside  the  network  perimeter  is  safe;
authenticate and authorize every request regardless of where it originates. Both reject the old 'hard shell, soft interior'
model in favour of verifying and protecting at every layer.

Q150. [Medium]  What's the difference between encoding, encryption, and hashing?
n Asked at Amazon, Microsoft - a favourite clarifier
MODEL ANSWER
All transform data, but for different purposes. Encoding (Base64, URL encoding) is for usability/format - it's reversible
with no key and provides no security; anyone can decode it. Encryption is for confidentiality - reversible only with
the correct key, so it protects secrecy. Hashing is for integrity/verification - one-way and not reversible at all.

The common mistake is treating Base64 as 'encrypted' - it isn't, it's just encoding, trivially decoded. Rule of thumb:
encode for safe transport/representation, encrypt for secrecy (needs a key), hash for verification (no key, irreversible).

Q151. [Medium]  What are OAuth and JWT, and how is token-based auth different from session-based
auth?
n Asked at backend roles
MODEL ANSWER
OAuth  2.0  is  an  authorization  framework  that  lets  a  user  grant  a  third-party  app  limited  access  to  their  resources
without sharing their password (the 'Log in with Google' flow issues an access token). A JWT (JSON Web Token) is a
compact, self-contained, digitally-signed token carrying claims (user id, roles, expiry) - the server verifies the signature
instead of looking anything up.

Session-based auth stores state on the server (a session store) and gives the client a session ID; token-based auth
(JWT) is stateless - the token itself carries the identity, so any server can verify it without shared session storage.
Tokens  scale  better  across  distributed  services  and  APIs,  but  you  can't  easily  revoke  them  before  expiry  (the
trade-off), so short lifetimes plus refresh tokens are used.

Computer Networks  |  SDE Fresher Question Bank

Page 30

9. Sockets & Network Programming

The hands-on side, very relevant to backend/systems roles (and your Mini-Redis project). Know the TCP socket
lifecycle, blocking vs non-blocking, how one server serves many clients, and where WebSockets fit.

Q152. [Easy]  What is a socket, from a programming perspective?
MODEL ANSWER
A socket is the programming abstraction (an API + a file-descriptor) for a network communication endpoint - it's how
your  code  sends  and  receives  data  over  the  network.  You  create  one,  bind/connect  it  to  an  (IP,  port),  and  then
read/write bytes through it as if it were a file. The OS handles the underlying TCP/UDP mechanics. A connection is
uniquely identified by the socket pair: (local IP, local port, remote IP, remote port).

Q153. [Hard]  Walk through the TCP socket lifecycle for a server and a client.
n Asked at backend/systems roles
MODEL ANSWER
The server and client follow a fixed sequence of socket calls:

SERVER                          CLIENT
socket()    create socket       socket()   create socket
bind()      attach to ip:port
listen()    mark passive, set backlog
accept()    block for a client  ---  connect()  initiate handshake
  (returns a NEW socket
   for this connection)
recv()/send()  &lt;-------- data --------&gt; send()/recv()
close()                         close()

Key detail: the server's accept() returns a new socket dedicated to that one client, while the original listening socket
keeps  accepting  more  -  which  is  how  one  server  handles  many  clients.  The  client  just  socket()  +  connect()  then
exchanges data.

Q154. [Medium]  What do bind(), listen(), accept(), and connect() each do?
MODEL ANSWER
bind() - associates a socket with a specific local IP and port (so clients know where to reach the server). listen() -
marks  the  socket  as  passive,  ready  to  accept  incoming  connections,  and  sets  the  backlog  queue  size.  accept()  -
(server) blocks until a client connects, then returns a new connected socket for that client. connect() - (client) initiates
the TCP handshake to the server's address. Servers do bind->listen->accept; clients just connect.

Q155. [Medium]  What's the difference between stream sockets and datagram sockets?
MODEL ANSWER
Stream sockets (SOCK_STREAM) use TCP - they provide a reliable, ordered, connection-based byte stream. You
connect  once,  then  read/write  a  continuous  stream  with  no  message  boundaries  (so  you  must  frame  messages
yourself). Datagram sockets (SOCK_DGRAM) use UDP - connectionless, message-oriented (each sendto/recvfrom
is  a  discrete  packet  with  preserved  boundaries),  but  unreliable  and  unordered.  Stream  for  reliability,  datagram  for
speed and message framing.

Q156. [Medium]  What's the difference between blocking and non-blocking sockets?
MODEL ANSWER
A blocking socket call (recv, accept, connect) waits until it can complete - recv() sleeps the thread until data arrives.
Simple to program, but a thread can do only one thing at a time, so handling many connections needs many threads.
A non-blocking socket returns immediately - if there's nothing to read, recv() returns an 'would block' error instead of
waiting - so a single thread can juggle many sockets, typically driven by an event loop (select/poll/epoll). Non-blocking
+ event loop is the model behind high-concurrency servers.

Computer Networks  |  SDE Fresher Question Bank

Page 31

Q157. [Hard]  How does a single server handle thousands of concurrent clients?
n Asked at backend/systems roles
MODEL ANSWER
Several models. Thread/process-per-connection - spawn a thread per client; simple but doesn't scale past a few
thousand  (memory  and  context-switch  overhead).  Thread  pool  -  a  fixed  set  of  workers  pulls  connections  from  a
queue;  bounds  resource  use.  Event-driven  /  I-O  multiplexing  -  one  (or  few)  threads  use  epoll/kqueue  with
non-blocking sockets to watch thousands of connections and process only the ready ones; this is how nginx, Redis,
and Node.js scale.

The high-concurrency answer is the event loop: non-blocking sockets + epoll, optionally with a small thread pool per
core. That's the solution to the C10K problem.

Q158. [Medium]  What is the accept() backlog queue?
MODEL ANSWER
The  backlog  is  the  queue  (set  by  listen(backlog))  that  holds  incoming  connections  which  have  completed  the  TCP
handshake  but  haven't  yet  been  accept()ed  by  the  application.  If  connections  arrive  faster  than  the  server  calls
accept(),  they  wait  in  this  queue;  if  it  fills  up,  new  connection  attempts  are  refused  or  dropped  (the  client  may  see
connection  timeouts).  Under  a  SYN  flood,  the  related  half-open  queue  is  what  gets  exhausted.  Sizing  the  backlog
appropriately matters for servers handling bursty connection loads.

Q159. [Medium]  What is a WebSocket and how does it differ from HTTP?
n Asked at backend/real-time roles
MODEL ANSWER
A WebSocket is a protocol giving a full-duplex, persistent connection between client and server over a single TCP
connection  -  either  side  can  send  messages  anytime.  It  starts  as  an  HTTP  request  with  an  'Upgrade'  header,  then
switches protocols and stays open.

HTTP  is  request-response  and  (classically)  one-directional  per  exchange  -  the  server  can't  push  without  the  client
asking. WebSockets remove that limitation, making them ideal for real-time apps: chat, live notifications, multiplayer
games, collaborative editing, live dashboards. So: HTTP for request-response, WebSocket for ongoing bidirectional
streams.

Q160. [Medium]  Compare polling, long polling, SSE, and WebSockets for real-time updates.
MODEL ANSWER
Short polling - the client repeatedly asks 'any updates?' on a timer; simple but wasteful and laggy. Long polling - the
client's request is held open until the server has data (or it times out), then immediately re-issued; near real-time over
plain HTTP but resource-heavy. SSE (Server-Sent Events) - a persistent one-way server->client stream over HTTP;
great for feeds/notifications, auto-reconnects, but can't send client->server. WebSockets - full-duplex, lowest latency,
best  for  truly  interactive  bidirectional  apps.  Pick  the  lightest  that  meets  the  need:  SSE  for  one-way  pushes,
WebSockets for two-way.

Q161. [Medium]  Why might send() or recv() transfer fewer bytes than you asked for?
MODEL ANSWER
Because TCP is a byte stream, not a message protocol - it has no concept of your message boundaries. A single
send() of 1000 bytes may be split across multiple TCP segments, and a recv() may return only part of the data that's
currently available (a 'partial read'); conversely two sends may arrive coalesced into one recv. So robust socket code
must loop, reading/writing until the full expected amount is handled, and implement its own framing (length prefixes or
delimiters)  to  know  where  one  message  ends  and  the  next  begins.  Assuming  one  send  ==  one  recv  is  a  classic
networking bug.

Computer Networks  |  SDE Fresher Question Bank

Page 32

Q162. [Medium]  Why does a server sometimes fail to restart with 'Address already in use', and what is
SO_REUSEADDR?
MODEL ANSWER
When a server closes, its listening socket's connections may linger in TIME_WAIT for a couple of minutes, so the OS
won't  immediately  let  a  new  process  bind  the  same  port  -  you  get  'Address  already  in  use'  (EADDRINUSE).  The
SO_REUSEADDR socket option tells the OS to allow binding to a port that's in TIME_WAIT, so the server can restart
immediately.  It's  why  server  code  typically  sets  SO_REUSEADDR  before  bind()  -  otherwise  you'd  have  to  wait  out
TIME_WAIT  after  every  restart.  (SO_REUSEPORT  additionally  lets  multiple  processes  share  a  port  for  load
distribution.)

Q163. [Medium]  What are the key differences when programming TCP vs UDP sockets?
MODEL ANSWER
TCP  sockets  are  connection-based:  the  server  does  bind/listen/accept,  the  client  connect()s,  and  then  both  use
send/recv on a connected stream - the OS handles reliability and ordering. UDP sockets are connectionless: there's
no accept/connect handshake; you just bind and use sendto()/recvfrom() with the destination address on each packet,
and  you  get  no  delivery  or  ordering  guarantees.  With  UDP  you  also  deal  with  discrete  datagrams  (message
boundaries preserved) and must handle loss/reordering yourself if you need reliability. So TCP = connected stream,
UDP = fire-and-forget datagrams.

Q164. [Medium]  What is a half-open (or half-closed) connection?
MODEL ANSWER
A half-closed connection is a normal TCP state where one side has sent a FIN (it's done sending) but the other side
can still send data - because TCP connections are full-duplex and each direction closes independently. A half-open
connection is an abnormal state where one side thinks the connection is alive but the other has gone away (crashed,
or a NAT/firewall dropped the mapping) without a proper FIN/RST - so the surviving side wastes resources on a dead
connection. TCP keepalives or application heartbeats are used to detect and clean these up.

Q165. [Medium]  What is I/O multiplexing (select / poll / epoll) in network programming?
MODEL ANSWER
I/O multiplexing lets one thread monitor many sockets at once and react only to those that are ready to read/write - the
foundation of event-driven servers. select and poll check a set of file descriptors but scan all of them on each call
(O(n)), so they don't scale to huge numbers. epoll (Linux) registers the descriptors once and efficiently returns only
the ready ones (O(ready)), scaling to hundreds of thousands of connections. This is what lets a single-threaded event
loop (Redis, nginx, Node) handle massive concurrency without a thread per connection.

Q166. [Hard]  How many simultaneous TCP connections can a server handle - isn't it limited to ~65,535 by
ports?
n Asked at backend/systems roles - the port myth
MODEL ANSWER
The  65,535  limit  is  a  common  misconception.  A  TCP  connection  is  identified  by  the  full  4-tuple  (source  IP,  source
port, destination IP, destination port), not just the server port. A server listens on one port (say 443), and every client
connection shares that server port but differs in the client's IP/port - so the server can have millions of connections to
port 443.

The ~65K limit actually applies to outbound connections from a single client to a single server IP:port, because the
client's ephemeral source ports are limited. So the real limits on a server are file-descriptor limits (ulimit), memory per
connection,  and  CPU  -  not  the  port  count.  This  is  why  event-driven  servers  (epoll)  can  hit  the  C10K/C10M  range.
Correcting this myth is a strong signal of real networking understanding.

Computer Networks  |  SDE Fresher Question Bank

Page 33

10. Scenario, Synthesis & Debugging

The questions that tie everything together - especially 'what happens when you type a URL', which is the single
most-asked networking question because it touches every layer. Plus the practical 'how would you debug this' scenarios
interviewers love.

Q167. [Hard]  What happens when you type google.com into a browser and press Enter?
n Asked at Amazon, Microsoft, Google - THE flagship question
MODEL ANSWER
The end-to-end story touches every layer: (1) the browser checks if the URL is cached/valid; (2) DNS resolution turns
google.com  into  an  IP  (browser  ->  OS  ->  resolver  ->  root/TLD/authoritative,  with  caching  at  each  step);  (3)  the
browser opens a TCP connection to that IP on port 443 via the 3-way handshake; (4) a TLS handshake negotiates
encryption and verifies the certificate.

Then (5) the browser sends an HTTP GET request over the encrypted connection; (6) the request is routed across the
internet  (IP  routing,  possibly  through  a  load  balancer  and  CDN)  to  a  Google  server;  (7)  the  server  responds  with
HTML (status 200); (8) the browser parses the HTML, requests additional resources (CSS/JS/images, often over the
same connection), builds the DOM, and renders the page. The beauty of this answer is it lets you demonstrate DNS,
TCP, TLS, HTTP, routing, and rendering in one narrative.

Q168. [Hard]  Trace a packet's journey end-to-end across the layers (encapsulation in action).
MODEL ANSWER
At the sender, data goes down the stack, each layer adding its header: the application hands data to TCP, which adds
ports + seq numbers (segment); IP adds source/dest IP addresses (packet); the data-link layer adds source/dest MAC
+ a CRC (frame); the physical layer sends it as bits.

Across  the  network,  each  router  strips  to  the  IP  layer,  decrements  TTL,  looks  up  the  destination  by  longest-prefix
match,  re-frames  it  with  new  MAC  addresses  for  the  next  hop,  and  forwards  -  the  IP  addresses  stay  constant
end-to-end while the MAC addresses change every hop. At the destination, the packet goes up the stack, each layer
stripping  its  header  (decapsulation)  until  the  application  receives  the  original  data.  So:  encapsulate  down,  hop  via
routers swapping MACs, decapsulate up.

Q169. [Medium]  Why does a website often load faster the second time you visit?
MODEL ANSWER
Layers of caching kick in. DNS is cached (browser/OS/resolver), so no full resolution is needed. The TCP connection
may be reused (keep-alive) and TLS sessions can resume, skipping handshakes. Static assets (images, CSS, JS) are
served from the browser cache or a nearby CDN edge instead of the origin, and HTTP conditional requests return
304  Not  Modified  for  unchanged  resources.  The  server/database  may  also  have  warmed  caches.  Each  cache
removes a round trip or a download, compounding into a much faster load.

Q170. [Medium]  How does HTTPS keep your data secure end-to-end?
MODEL ANSWER
Via TLS, which provides three guarantees. Confidentiality - after the handshake establishes a shared symmetric key,
all  traffic  is  encrypted,  so  anyone  sniffing  the  path  sees  only  ciphertext.  Integrity  -  message  authentication  codes
detect any tampering in transit. Authentication - the server's certificate (validated against trusted CAs) proves you're
talking to the real site, not an impostor, defeating man-in-the-middle attacks.

Important nuance: HTTPS secures data in transit between your browser and the server - it doesn't protect data at rest
on the server, and the server (and any intermediary that terminates TLS, like a CDN/load balancer) can read it. So it's
point-to-point transport security, not true end-to-end encryption like Signal.

Q171. [Medium]  What contributes to network latency?
MODEL ANSWER
Four components. Propagation delay - time for the signal to physically travel the distance (limited by the speed of
light; the dominant factor over long distances). Transmission delay - time to push all the bits onto the link (packet
size  /  bandwidth).  Queuing  delay  -  time  spent  waiting  in  router  buffers  under  congestion  (highly  variable).
Processing delay - time for routers to examine headers and make forwarding decisions. Total latency is their sum;
reducing  distance  (CDNs)  attacks  propagation,  more  bandwidth  attacks  transmission,  and  avoiding  congestion
attacks queuing.

Computer Networks  |  SDE Fresher Question Bank

Page 34

Q172. [Medium]  What is RTT and the bandwidth-delay product?
MODEL ANSWER
RTT (Round-Trip Time) is the time for a packet to go to the destination and for the reply to come back - what ping
measures. The bandwidth-delay product (bandwidth x RTT) is the amount of data that can be 'in flight' on the link at
once - effectively the capacity of the pipe. It matters because to fully utilise a high-bandwidth, high-latency link (a 'long
fat network'), the TCP window must be at least as large as the BDP; otherwise the sender keeps stalling waiting for
ACKs and never fills the pipe. It's why window scaling exists.

Q173. [Medium]  A user reports 'the website is slow.' How do you debug it?
n Asked at backend/SRE-adjacent roles
MODEL ANSWER
Localise  the  problem  layer  by  layer.  First,  is  it  DNS,  network,  or  the  server?  Use  ping  (reachability  +  RTT)  and
traceroute  (where  latency  spikes  along  the  path).  Check  DNS  resolution  time  (dig/nslookup).  Use  the  browser's
network tab / curl -w to break down the timing: DNS lookup, TCP connect, TLS, time-to-first-byte (TTFB), and content
download - that tells you whether it's the network or the server thinking.

If TTFB is high, the server/database is slow (move to backend profiling). If download is slow, it's bandwidth or large
unoptimised  assets  (consider  a  CDN,  compression).  If  connect/TLS  is  slow,  it's  network/handshake  overhead.  The
method - isolate which phase is slow, then dig into that layer - is what they want to hear.

Q174. [Medium]  A service 'can't connect' to another server. How do you troubleshoot?
MODEL ANSWER
Work up the stack. (1) Is the host reachable? ping the IP (and resolve the name with dig to rule out DNS). (2) Is the
route OK? traceroute to see where it stops. (3) Is the specific port open? telnet host port or nc -zv host port tests
whether  the  service  is  listening  and  reachable  through  firewalls.  (4)  Is  it  a  firewall/security-group  rule  blocking  the
port? (5) Is the service actually running and bound to the right interface on the target? Narrowing 'can't connect' to
DNS vs routing vs firewall vs the service being down is the structured approach.

Q175. [Medium]  What's the difference between ping and traceroute, and what does each tell you?
MODEL ANSWER
ping  tests  whether  a  host  is  reachable  and  measures  round-trip  time  and  packet  loss  -  a  simple  'is  it  up  and  how
far/lossy.' traceroute maps the entire path of routers (hops) to the destination and the latency at each hop, by sending
packets with increasing TTL and reading the ICMP 'Time Exceeded' replies. So ping answers 'can I reach it and how
fast', while traceroute answers 'what path does it take and where is the slowdown or break.' You typically ping first,
then traceroute to locate where a problem is along the route.

Q176. [Hard]  How do DNS, a CDN, and a load balancer work together to serve a large website?
MODEL ANSWER
DNS  is  the  entry  point  and  the  first  routing  decision:  using  GeoDNS/anycast,  it  returns  the  IP  of  the  nearest  CDN
edge  or  data  centre  for  that  user.  The  CDN  edge  serves  cached  static  content  directly  (fast,  close),  and  forwards
dynamic/uncached requests toward the origin. At the origin, a load balancer distributes those requests across many
backend servers (with health checks), often doing TLS termination and L7 routing.

So  the  layers  compose:  DNS  picks  the  closest  entry  point,  the  CDN  absorbs  static  traffic  near  users,  and  the  load
balancer  spreads  the  remaining  dynamic  load  across  healthy  servers.  This  is  the  standard  architecture  for  serving
global scale, and a great thing to sketch in a system-design discussion.

Q177. [Medium]  How does video streaming work, and why does it use adaptive bitrate?
MODEL ANSWER
Modern  streaming  (HLS,  DASH)  chops  the  video  into  small  segments  (a  few  seconds  each)  encoded  at  multiple
quality  levels,  served  over  HTTP  from  CDNs.  The  player  downloads  a  manifest,  then  fetches  segments  -  and
adaptive bitrate means it monitors your available bandwidth and buffer, switching to a lower-quality segment when
the network slows and a higher one when it speeds up. This avoids stalls by trading quality for smoothness.

Interestingly most streaming runs over TCP/HTTP (leveraging CDNs and getting through firewalls), buffering ahead to
tolerate TCP's retransmissions - whereas real-time low-latency use (video calls) prefers UDP, since a late frame is
useless and waiting would add lag.

Computer Networks  |  SDE Fresher Question Bank

Page 35

Q178. [Medium]  A page loads but its API call fails in the browser (yet works in Postman). Why?
MODEL ANSWER
The classic culprit is CORS - the browser enforces the same-origin policy and blocks the cross-origin API call unless
the server returns the right Access-Control-Allow-Origin headers; Postman doesn't enforce CORS, so it works there.
Other browser-only causes: mixed content (an HTTPS page calling an HTTP API is blocked), a missing/expired auth
cookie not being sent (SameSite), or a preflight OPTIONS request being rejected. The tell is 'works in Postman, fails
in browser' = a browser-enforced policy, almost always CORS. Fix it on the server with proper CORS headers.

Q179. [Easy]  How do you check whether a specific port on a host is open?
MODEL ANSWER
Use  telnet  host  port  or,  better,  nc  -zv  host  port  (netcat)  -  a  successful  connection  means  the  port  is  open  and
something  is  listening;  a  refusal/timeout  means  it's  closed  or  filtered.  nmap  host  scans  many  ports  at  once  and
reports their state (open/closed/filtered). For HTTP specifically, curl -v shows the connection attempt. These quickly
distinguish 'service down' from 'firewall blocking' from 'reachable' when debugging connectivity.

Q180. [Medium]  What's the difference between a 502 Bad Gateway and a 504 Gateway Timeout?
MODEL ANSWER
Both come from a gateway/proxy (like a load balancer or reverse proxy) reporting a problem with an upstream server.
502 Bad Gateway - the proxy got an invalid/malformed response (or no usable response) from the upstream - often
the  backend  crashed  or  returned  garbage.  504  Gateway  Timeout  -  the  proxy  didn't  get  a  response  in  time  -  the
upstream is too slow or unresponsive. Debug 502 by checking if the backend is up and healthy; debug 504 by looking
at why the backend is slow (long queries, overload) or whether timeouts are set too low.

Q181. [Medium]  Why does a large download often start slow and then speed up?
MODEL ANSWER
Because of TCP slow start. TCP doesn't know the available bandwidth at the beginning, so it starts conservatively
with  a  small  congestion  window  and  increases  it  exponentially  each  RTT  as  ACKs  confirm  successful  delivery.  So
early on the transfer is throttled by the small window, and it ramps up over the first few round trips until it reaches the
link's capacity (or hits congestion). This is by design - it probes the network's capacity safely rather than blasting at full
rate and causing congestion collapse.

Q182. [Medium]  How does a load balancer route requests and detect failed servers?
MODEL ANSWER
It distributes incoming requests across a pool of backend servers using an algorithm - round-robin, least-connections,
weighted,  or  IP-hash  (for  session  stickiness).  Critically,  it  runs  health  checks:  it  periodically  probes  each  backend
(e.g. an HTTP GET to /health), and if a server fails the check, the LB stops routing traffic to it until it recovers - so a
single  dead  server  doesn't  cause  user-facing  errors.  L7  load  balancers  can  also  route  by  content  (path/host)  and
terminate TLS. The health-check behaviour is the key reliability feature to mention.

Q183. [Medium]  How does a CDN decide which edge server to send a user to?
MODEL ANSWER
Primarily  via  anycast  and  GeoDNS.  With  anycast,  many  edge  servers  share  the  same  IP  address,  and  internet
routing naturally delivers the user to the topologically nearest one. With GeoDNS, the DNS resolver returns a different
edge IP based on the user's approximate location (from their resolver's IP). CDNs also factor in edge load and health.
The goal is to minimise latency by serving each user from the closest healthy edge - which is why a CDN makes a
global site feel fast everywhere.

Q184. [Medium]  What does the OS/kernel do when your program sends data over a socket?
MODEL ANSWER
When you call send(), the data is copied from your user-space buffer into a kernel socket buffer. The kernel's TCP/IP
stack then segments it, adds TCP and IP headers, consults the routing table for the next hop, resolves the next-hop
MAC (ARP), and hands the frame to the network interface driver. The NIC (often via DMA) puts the bits on the wire
and raises an interrupt when done. Incoming packets reverse this: NIC -> interrupt -> kernel reassembles -> delivers
to the right socket buffer -> your recv() copies it to user space. So send() doesn't transmit immediately - it hands data
to the kernel, which does the real work asynchronously.

Computer Networks  |  SDE Fresher Question Bank

Page 36

Q185. [Medium]  Everything else is fine, but one specific website is slow. How do you reason about it?
MODEL ANSWER
Since other sites work, your local network and general connectivity are fine - so the issue is specific to that site's path
or servers. Check: DNS resolution time for that domain (a slow/failing resolver record); traceroute to it to spot a slow
hop or a specific ISP peering problem on that route; whether its CDN/edge for your region is having issues; or whether
the site's own servers are overloaded (high TTFB). It could also be that the site routes you to a distant data centre.
The reasoning - 'others work, so isolate what's unique to this destination's DNS, path, or origin' - is the key.

Q186. [Medium]  How would you investigate intermittent packet loss?
MODEL ANSWER
Run  a  continuous  ping  over  time  to  confirm  and  quantify  the  loss  rate,  and  a  tool  like  mtr  (traceroute  +  ping
combined) which shows per-hop loss continuously - this localises where on the path packets drop. Loss at the final
hop  suggests  the  destination/server;  loss  starting  at  a  middle  hop  (and  persisting)  suggests  that  link/router  is
congested  or  faulty.  Check  for  patterns  (time  of  day  =  congestion;  specific  destinations  =  routing).  Local  causes
include  Wi-Fi  interference,  a  bad  cable,  or  an  overloaded  link.  Intermittent  loss  is  especially  painful  because  TCP
retransmits and throttles, so throughput tanks even at low loss rates.

Q187. [Easy]  How does a VPN change the path your traffic takes?
MODEL ANSWER
A VPN creates an encrypted tunnel from your device to a VPN server; all your traffic goes there first (encrypted, so
your local network and ISP can't read it), and the VPN server then forwards it to the real destination, which sees the
VPN server's IP instead of yours. So your apparent location/IP changes (useful for privacy or geo-access), and the
path is longer (an extra hop to the VPN server), which usually adds some latency. The trade-off is privacy/security and
IP masking for a bit of speed and a rerouted path.

Computer Networks  |  SDE Fresher Question Bank

Page 37

11. Rapid-fire & Miscellaneous

Quick-hit concepts that round out coverage - the one-liner distinctions and supporting terms interviewers fire off to probe
breadth. Aim to answer each in two or three crisp sentences.

Q188. [Easy]  What's the difference between latency and jitter?
MODEL ANSWER
Latency is the delay for a packet to travel from source to destination. Jitter is the variation in that latency over time -
how inconsistent the delays are. Low average latency with high jitter is bad for real-time apps: in a voice call, packets
arriving at uneven intervals cause choppy audio even if the average delay is fine. That's why such apps use a jitter
buffer to smooth out arrivals.

Q189. [Easy]  What is packet loss and what causes it?
MODEL ANSWER
Packet loss is when packets fail to reach their destination. Main causes: network congestion (router buffers overflow
and drop packets - the most common), faulty hardware or cabling, wireless interference/weak signal, and overloaded
or misconfigured devices. TCP recovers via retransmission (at a throughput cost), while UDP apps must tolerate or
handle it themselves. Even small loss rates badly hurt TCP throughput because of the congestion backoff it triggers.

Q190. [Easy]  What is QoS (Quality of Service)?
MODEL ANSWER
QoS is a set of techniques to manage network traffic so that important or latency-sensitive traffic gets priority. It uses
traffic classification, prioritisation (queues), bandwidth reservation, and traffic shaping to guarantee performance for
critical flows - e.g. prioritising VoIP and video conferencing over bulk file downloads, so a big download doesn't make
a call stutter. It matters most on constrained or shared links where you can't just add bandwidth.

Q191. [Medium]  What's the difference between circuit switching and packet switching?
MODEL ANSWER
Circuit  switching  establishes  a  dedicated  end-to-end  path  reserved  for  the  entire  session  (the  classic  telephone
network) - guaranteed bandwidth and constant latency, but wasteful (the circuit sits idle during pauses) and doesn't
scale well. Packet switching (the internet) chops data into packets that are routed independently and share links with
other  traffic  -  far  more  efficient  and  resilient  (packets  reroute  around  failures),  at  the  cost  of  variable  latency  and
possible congestion. The internet chose packet switching for its efficiency and robustness.

Q192. [Medium]  What is multiplexing and demultiplexing at the transport layer?
MODEL ANSWER
Multiplexing is gathering data from multiple application sockets on the sender, tagging each with the right port info,
and  handing  it  all  to  the  network  layer  over  one  connection  to  the  internet.  Demultiplexing  is  the  reverse  at  the
receiver: using the port numbers (and IP/protocol) in each segment to deliver it to the correct application socket. It's
what  lets  one  host  run  many  network  apps  simultaneously  over  a  single  IP  -  the  ports  are  how  the  transport  layer
keeps everyone's data sorted.

Q193. [Easy]  What is store-and-forward switching?
MODEL ANSWER
Store-and-forward is when a switch/router receives the entire frame, stores it, checks it for errors (verifies the CRC),
and only then forwards it. The benefit is error checking - corrupt frames are dropped rather than propagated - at the
cost  of  a  little  latency  (it  must  buffer  the  whole  frame  first).  It  contrasts  with  cut-through  switching,  which  starts
forwarding as soon as it reads the destination address (lower latency, but no error check). Most modern switches use
store-and-forward.

Q194. [Easy]  What's the difference between a gateway and a router?
MODEL ANSWER
A router forwards packets between networks that use the same protocol (IP to IP), operating at Layer 3. A gateway is
a more general term for a node that connects networks, and often implies translation between different protocols or
architectures (e.g. an email gateway, or a device bridging a LAN to a different network type). In everyday usage your
'default gateway' is just a router, but strictly a gateway can do protocol translation that a plain router doesn't.

Computer Networks  |  SDE Fresher Question Bank

Page 38

Q195. [Medium]  What is a broadcast storm?
MODEL ANSWER
A  broadcast  storm  is  when  broadcast  (or  flooded)  traffic  multiplies  uncontrollably  and  saturates  the  network,
consuming  bandwidth  and  CPU  until  it  grinds  to  a  halt.  The  classic  cause  is  a  switching  loop  -  two  switches
connected in a loop endlessly forward broadcast frames to each other with no TTL at Layer 2 to stop them. The fix is
Spanning Tree Protocol, which detects loops and disables redundant links to keep the topology loop-free.

Q196. [Medium]  What is Spanning Tree Protocol (STP)?
MODEL ANSWER
STP is a Layer-2 protocol that prevents loops in networks with redundant switch links. Since Ethernet frames have no
TTL, a loop would cause an infinite broadcast storm. STP builds a loop-free logical tree by electing a root bridge and
selectively blocking redundant paths, leaving only one active path between any two points. If an active link fails, STP
re-activates a blocked one for fault tolerance. So it gives you redundancy (backup links) without the danger of loops.

Q197. [Easy]  What's the difference between a modem and a router?
MODEL ANSWER
A modem (modulator-demodulator) connects your home network to your ISP - it converts between the ISP's signal
(cable, fibre, DSL) and digital data, giving you internet access (typically one public IP). A router creates and manages
your local network - it shares that single internet connection among many devices (via NAT/DHCP), provides Wi-Fi,
and  routes  traffic.  Modem  =  link  to  the  ISP;  router  =  distributes/manages  your  LAN.  Home  'gateway'  devices  often
combine both in one box.

Q198. [Easy]  What's the difference between throughput and goodput?
MODEL ANSWER
Throughput  is  the  total  rate  of  data  successfully  delivered  over  the  link,  including  all  overhead  -  protocol  headers,
retransmissions, acknowledgments. Goodput is the rate of useful application data delivered, excluding that overhead.
Goodput  is  always  less  than  throughput;  the  gap  is  the  cost  of  headers,  retransmissions,  and  control  traffic.  So  if
you're moving a file, goodput is what actually matters to the user, even though the link shows higher raw throughput.

Q199. [Medium]  What is congestion collapse?
MODEL ANSWER
Congestion collapse is a state where increasing offered load actually decreases useful throughput toward zero - the
network is busy but accomplishing nothing. It happens when congestion causes drops, drops cause retransmissions,
and those retransmissions add even more load, spiraling downward. It famously hit the early internet in 1986. TCP's
congestion  control  (slow  start,  AIMD)  was  introduced  precisely  to  prevent  it  -  by  making  senders  back  off  in
response to loss, so the network stabilises instead of collapsing.

Q200. [Easy]  Why is internet bandwidth often asymmetric (faster download than upload)?
MODEL ANSWER
Because typical consumer usage is download-heavy - browsing, streaming, and downloads pull far more data than
users send. ISPs allocate more of the shared spectrum/capacity to the downstream direction to match this pattern,
giving  plans  like  '300  Mbps  down  /  20  Mbps  up.'  It's  a  deliberate  optimisation  for  common  usage;  symmetric  plans
(equal  up/down,  common  on  fibre)  exist  for  users  who  upload  heavily,  like  those  running  servers  or  doing  video
production.

Q201. [Easy]  What are jumbo frames?
MODEL ANSWER
Jumbo  frames  are  Ethernet  frames  with  a  payload  larger  than  the  standard  1500-byte  MTU  -  typically  up  to  ~9000
bytes. Sending more data per frame reduces the per-frame overhead and the number of frames (and interrupts) for
large transfers, improving throughput and lowering CPU usage - valuable in data centres and storage networks. The
catch:  every  device  along  the  path  must  support  the  same  jumbo  MTU,  or  packets  get  fragmented  or  dropped,  so
they're used in controlled environments rather than the open internet.

Computer Networks  |  SDE Fresher Question Bank

Page 39

Q202. [Easy]  What is port forwarding?
MODEL ANSWER
Port  forwarding  is  a  NAT  rule  that  redirects  traffic  arriving  at  a  specific  port  on  your  router's  public  IP  to  a  specific
device and port inside your private network. It lets an external user reach an internal service that would otherwise be
hidden behind NAT - e.g. forwarding public port 25565 to your gaming PC, or exposing a home server. It's how you
make an internal host reachable from the internet, and it must be used carefully because it opens a hole through the
NAT boundary.

Q203. [Medium]  What are network namespaces, and how do containers use them?
MODEL ANSWER
A network namespace is a Linux kernel feature that gives a process group its own isolated network stack - its own
interfaces,  IP  addresses,  routing  table,  and  ports  -  separate  from  the  host  and  other  namespaces.  Containers  use
them so each container behaves like it has its own private network: two containers can both bind 'port 8080' without
conflict because each has its own namespace. Virtual ethernet pairs and bridges then connect these namespaces to
each other and the host. It's the networking half of container isolation (the other half being cgroups for resources).

Q204. [Easy]  What's the difference between north-south and east-west traffic?
MODEL ANSWER
North-south  traffic  flows  between  a  data  centre  and  the  outside  world  -  client  requests  coming  in  and  responses
going out (the vertical direction in a typical diagram). East-west traffic flows between servers/services within the data
centre  -  service-to-service  calls,  database  queries,  replication  (the  horizontal  direction).  The  terms  matter  because
microservices architectures generate huge east-west traffic, which changes how you design data-centre networks and
security (internal service-to-service security, not just perimeter).

Q205. [Easy]  What does a browser do with DNS prefetch and preconnect to speed up loading?
MODEL ANSWER
These are browser optimisations that do network setup work ahead of when it's needed. DNS prefetch resolves the
domain  names  of  likely-needed  resources  early,  so  the  lookup  is  already  done  when  the  resource  is  requested.
Preconnect goes further - it sets up the full TCP connection and TLS handshake to an origin in advance, so the first
real  request  skips  that  setup  latency.  Sites  hint  these  with  link  tags  (rel='dns-prefetch'  /  'preconnect')  for  critical
third-party origins (CDNs, fonts, analytics), shaving round trips off the critical path.

Computer Networks  |  SDE Fresher Question Bank

Page 40


