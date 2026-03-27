export const quizzes = [
  {
    id: 'python-basics',
    title: 'Python for Engineers',
    description: 'Test your knowledge on Python memory management, complex data structures, and computational concepts.',
    icon: '🐍',
    questions: [
      {
        id: 1,
        question: 'Which of the following data structures in Python is implemented as a hash table?',
        options: ['List', 'Dictionary', 'Tuple', 'Deque'],
        answer: 1
      },
      {
        id: 2,
        question: 'What is the time complexity of searching for an element in a Python set?',
        options: ['O(1) on average', 'O(n)', 'O(log n)', 'O(n log n)'],
        answer: 0
      },
      {
        id: 3,
        question: 'Which module provides a way to elegantly clone objects, including nested objects, avoiding reference sharing?',
        options: ['os', 'sys', 'copy (deepcopy)', 'threading'],
        answer: 2
      },
      {
        id: 4,
        question: 'What is the Global Interpreter Lock (GIL) in standard CPython?',
        options: ['A security feature that prevents malicious imports.', 'A mechanism that prevents multiple native threads from executing Python bytecodes at once.', 'A garbage collection lock over memory blocks.', 'A networking protocol lock.'],
        answer: 1
      },
      {
        id: 5,
        question: 'How do list comprehensions differ from standard for-loops in terms of memory and execution?',
        options: ['They always use less memory.', 'They execute slightly faster due to being optimized at the C level.', 'They are identical under the hood.', 'List comprehensions cannot contain conditional logic.'],
        answer: 1
      },
      {
        id: 6,
        question: 'What does the `__init__` method represent in Python Object-Oriented Programming?',
        options: ['A module initializer', 'A garbage collector hook', 'The constructor method of a class', 'A destructive destructor'],
        answer: 2
      },
      {
        id: 7,
        question: 'Which of the following is an example of a Python generator?',
        options: ['[x for x in range(10)]', '(x for x in range(10))', '{x: x for x in range(10)}', 'set(range(10))'],
        answer: 1
      },
      {
        id: 8,
        question: 'In computational physics, which Python library is the foundational standard for N-dimensional array processing?',
        options: ['Django', 'Flask', 'NumPy', 'Requests'],
        answer: 2
      },
      {
        id: 9,
        question: 'What is the primary difference between a Tuple and a List in Python?',
        options: ['Lists are slower to search.', 'Tuples are strictly immutable after creation.', 'Lists can only store uniform data types.', 'Tuples take up more memory.'],
        answer: 1
      },
      {
        id: 10,
        question: 'Which keyword allows you to yield execution back to the caller while preserving the local state of a function?',
        options: ['return', 'break', 'continue', 'yield'],
        answer: 3
      }
    ]
  },
  {
    id: 'java-basics',
    title: 'Java Software Engineering',
    description: 'Challenge your understanding of the JVM, multithreading, and advanced Object-Oriented principles.',
    icon: '☕',
    questions: [
      {
        id: 1,
        question: 'In Java, which memory area is responsible for storing object instances and JRE classes?',
        options: ['The Stack (Thread memory)', 'The Heap', 'The Metadata Space (PermGen/Metaspace)', 'The PC Register'],
        answer: 1
      },
      {
        id: 2,
        question: 'What is the primary difference between an Abstract Class and an Interface in Java 8+?',
        options: ['Interfaces cannot have any method implementations, while Abstract classes can.', 'A class can implement multiple interfaces, but can only extend one abstract class.', 'Abstract classes cannot have fields.', 'Interfaces are evaluated significantly faster at runtime.'],
        answer: 1
      },
      {
        id: 3,
        question: 'Which keyword ensures that a variable is read directly from main memory, bypassing thread-local CPU caches?',
        options: ['volatile', 'synchronized', 'transient', 'static'],
        answer: 0
      },
      {
        id: 4,
        question: 'What happens when an exception extends `RuntimeException` instead of simply `Exception`?',
        options: ['It is an unchecked exception and does not strictly require a throw/catch declaration.', 'It forces the JVM to abruptly terminate.', 'It cannot be caught by a catch block.', 'It is exclusively used for memory errors like OutOfMemoryError.'],
        answer: 0
      },
      {
        id: 5,
        question: 'Which Java Collections Framework class implements a balanced Red-Black tree under the hood?',
        options: ['HashMap', 'ArrayList', 'TreeMap', 'LinkedList'],
        answer: 2
      },
      {
        id: 6,
        question: 'What is the main advantage of the `StringBuilder` class over standard `String` concatenation?',
        options: ['It strictly enforces thread safety.', 'It prevents the creation of excessive intermediate immutable String objects in the Heap.', 'It allows for multiple inheritance.', 'It compresses string data to 8-bit ASCII automatically.'],
        answer: 1
      },
      {
        id: 7,
        question: 'Which statement regarding the Garbage Collector (GC) in Java is true?',
        options: ['You can force the GC to run instantly using System.gc().', 'The GC only collects objects that have exactly zero incoming references.', 'The GC collects unreachable objects, taking cyclic references into account.', 'The JVM pauses explicitly for 5 seconds every time the GC runs.'],
        answer: 2
      },
      {
        id: 8,
        question: 'What is the purpose of the `transient` keyword in Java?',
        options: ['To indicate a variable should skip binary serialization.', 'To declare a method that lasts only for one clock cycle.', 'To signal the Garbage Collector to destroy the object immediately.', 'To create variables that can only be altered by a specific thread.'],
        answer: 0
      },
      {
        id: 9,
        question: 'In the context of the SOLID principles, what does the "S" stand for?',
        options: ['Static Typing Principle', 'Synchronous execution Principle', 'Single Responsibility Principle', 'System Integration Principle'],
        answer: 2
      },
      {
        id: 10,
        question: 'Which design pattern is implemented by creating exactly one private instance of a class and exposing it via a public static accessor method?',
        options: ['Factory pattern', 'Observer pattern', 'Singleton pattern', 'Decorator pattern'],
        answer: 2
      }
    ]
  }
];
