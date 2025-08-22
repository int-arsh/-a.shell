import { useParams } from 'react-router-dom';
import '../App.css';

const blogs = [
  {
    name: 'truth-and-simplicity',
    title: 'Truth and Simplicity',
    content: `Minimalism is not just a design choice, but a way of life. In this post, we explore how simplicity leads to clarity and truth, both in code and in life.`
  },
  {
    name: 'building-with-react',
    title: 'Building with React',
    content: `React and Bun make it easy to build fast, honest, and minimal personal sites. Here is how I approached building mine.`
  },
  {
    name: 'open-source-journey',
    title: 'Open Source Journey',
    content: `Contributing to open source is about sharing, learning, and growing together. Here are some lessons from my journey.`
  },
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
  }
];

const boldWords = ['blog', 'blogs'];

function wrapWords(text) {
  return text.split(/(\s+)/).map((word, i) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (boldWords.includes(cleanWord)) {
      return word.trim() ? <span className="word" key={i}><strong>{word}</strong></span> : word;
    }
    return word.trim() ? <span className="word" key={i}>{word}</span> : word;
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