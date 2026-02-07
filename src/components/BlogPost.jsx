import { useParams } from 'react-router-dom';
import '../App.css';

const blogs = [
  {
    name: 'what-really-happens-when-a-number-is-bigger-than-its-data-type',
    title: 'What Really Happens When a Number Is Bigger Than Its Data Type?',
    content: `Ever wondered what happens when you try to fit more water in a glass than it can hold? It spills.
In computers, though, numbers don’t spill — they wrap around. This silent phenomenon is called overflow.

Why does overflow happen?

A data type in C++ (like int, long long, etc.) isn’t infinite.
It’s just a fixed set of bits:

A 32-bit int → can represent 2³² = 4,294,967,296 different values.

Typically: from −2,147,483,648 to +2,147,483,647.

Now imagine adding 1 to 2,147,483,647.
The binary counter has no extra bit to store the result, so it “wraps around” to −2,147,483,648.
You thought you got bigger, but you actually teleported to the negative side.

Why 32 bits?

Because computers are built on hardware constraints. The CPU has registers of fixed width (32-bit or 64-bit). That’s the “size of the cup.”

32-bit systems → operations are naturally 32 bits wide.

64-bit systems → larger registers, but still, each type (int, long long) has a defined width.

The danger of overflow

The scary part?
Overflow doesn’t warn you. Your code runs, but the results are wrong.

Your bank balance could suddenly go negative.

Your algorithm could misbehave without any error message.

In security, attackers even exploit overflow to hack systems.`
  },


  {
    name: 'why 0.1 + 0.2 ≠ 0.3',
    title: 'Why 0.1 + 0.2 ≠ 0.3 (and What It Teaches Us About Floating-Point Numbers)',
    content: `If you’ve ever tried this in Python or JavaScript:

0.1 + 0.2 == 0.3
# False

…you’ve already met the weird world of floating-point arithmetic.

So why does this happen?

Because computers store numbers in binary fractions, not decimals. Just like 1/3 can’t be written exactly in decimal (it becomes 0.3333… forever), the decimal 0.1 can’t be written exactly in binary. It becomes an endless repeating fraction.

When the computer cuts it off to fit in its limited bits, a tiny rounding error sneaks in. Add those errors up (0.1 + 0.2), and you don’t get exactly 0.3, but something like 0.30000000000000004.

Why it matters

In finance, these small errors can turn into big discrepancies.

In machine learning, accumulated rounding errors can nudge results.

In scientific computing, wrong subtraction of close numbers can wipe out precision (a problem called catastrophic cancellation).

How do we deal with it?

Use rounding when printing results (e.g., round(x, 2) in Python).

Avoid subtracting nearly equal numbers when possible — restructure formulas.

Trust the IEEE-754 standard, which ensures consistent results across machines.

The big lesson

Floating-point isn’t “broken.” It’s just an approximation system — like using a calculator that can only show 10 digits. The trick is to know its limits and code accordingly.`
  },


  {
    name: 'Why Every Developer Should Use Linux for Development',
    title: 'Why Every Developer Should Use Linux for Development',
    content: `When we think about productivity in software development, the first instinct is often to look for faster laptops, better IDEs, or new productivity tools. But sometimes the biggest boost comes from something more fundamental: the operating system you use every day.

    For developers, Linux stands out as a system built for speed, control, and freedom. Here’s why:

    1. Speed: UI vs Shell

    Most of us are used to clicking buttons in graphical interfaces (GUIs). It feels easy, but under the hood, every click travels through layers of the operating system, window manager, and UI libraries before the task actually runs.
    On the other hand, when you type a shell command, you’re talking almost directly to the OS kernel.
    That’s why:

    Copying files with cp is faster than dragging them with a mouse.

    Managing Git in terminal is quicker than waiting for a GUI Git client to refresh.

    Running a server with one command is leaner than using a bloated control panel.

    With Linux, the shell isn’t an afterthought. It’s the primary interface. That makes a huge difference in performance and developer flow.

    2. Freedom to Build Your Environment

    Linux doesn’t force you into one way of working. You get to:

    Choose your editor: Vim, Emacs, VS Code, Nano – all first-class citizens.

    Automate everything: Write shell scripts to chain commands exactly how you want them.

    Customize the OS itself: Change window managers, modify startup processes, strip out anything unnecessary.

    You own your machine, not the other way around.

    3. Better for Programming & Servers

    Most production servers run Linux. Developing on Linux means your dev environment matches production, so “it works on my machine” problems disappear.

    Package managers like apt, dnf, or pacman let you install libraries and dev tools in seconds.

    Tools like Docker, Kubernetes, and Git are native to Linux, not ports or afterthoughts.

    4. Learning Curve = Growth Curve

    At first, Linux feels “hard” because it doesn’t hide the machine from you. But that’s exactly why it’s worth learning. Every command you type deepens your understanding of:

    How filesystems work.

    How processes communicate.

    How networks and permissions are structured.

    This knowledge compounds. You don’t just become a better Linux user, you become a better programmer.`
  },

  {
    name: 'why-fastapi-exists',
    title: 'Why FastAPI Exists?',
    content: `FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints.

    It was created because of the lack of open-source, high-performance, easy-to-use APIs for Python, which at the time of its release (in 2018) were either lacking in performance or had a complex API or both.

    
    Read more: https://takovibe.com/blog/fastapi-vs-flask-async-python-asgi-pydantic/
    Written by: Me`
  }
];

const boldWords = ['blog', 'blogs'];
const urlRegex = /^https?:\/\/[^\s]+$/;

function wrapWords(text) {
  return text.split(/(\s+)/).map((word, i) => {
    const trimmed = word.trim();
    const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();

    // Make URLs clickable
    if (trimmed && urlRegex.test(trimmed)) {
      return (
        <a
          key={i}
          href={trimmed}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-link"
        >
          {trimmed}
        </a>
      );
    }

    // Highlight bold words
    if (boldWords.includes(cleanWord)) {
      return trimmed ? <span className="word" key={i}><strong>{word}</strong></span> : word;
    }
    
    return trimmed ? <span className="word" key={i}>{word}</span> : word;
  });
}

function BlogPost() {
  const { blogName } = useParams();
  const blog = blogs.find(b => b.name === blogName);

  if (!blog) {
    return <div className="blog-post"><h2>Blog not found</h2></div>;
  }

  return (
    <article className="blog-post">
      <h2>{wrapWords(blog.title)}</h2>
      <div className="blog-content">{wrapWords(blog.content)}</div>
    </article>
  );
}

export default BlogPost; 