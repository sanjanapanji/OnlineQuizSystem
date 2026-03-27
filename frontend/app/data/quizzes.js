export const quizzes = [
  {
    id: 'python-basics',
    title: 'Python Basics',
    description: 'Test your fundamental knowledge of Python programming.',
    icon: '🐍',
    questions: [
      {
        id: 1,
        question: 'Which of the following is the correct way to handle memory management in Python manually?',
        options: ['malloc()', 'free()', 'Python handles it automatically via Reference Counting', 'None of the above'],
        answer: 2
      },
      {
        id: 2,
        question: 'In Python, what is the output of "10 // 3"?',
        options: ['3.33', '3', '4', 'TypeError'],
        answer: 1
      },
      {
        id: 3,
        question: 'Which library is most commonly used for high-performance numerical computing in engineering with Python?',
        options: ['Requests', 'Django', 'NumPy', 'Flask'],
        answer: 2
      },
      {
        id: 4,
        question: 'What does the G.I.L (Global Interpreter Lock) in Python primarily prevent?',
        options: ['Infinite loops', 'Multiple native threads from executing Python bytecodes at once', 'Memory leaks', 'Syntax errors'],
        answer: 1
      },
      {
        id: 5,
        question: 'Which of these is a Python decorator?',
        options: ['@staticmethod', '#define', 'import', 'yield'],
        answer: 0
      },
      {
        id: 6,
        question: 'What is the purpose of the "self" keyword in Python class methods?',
        options: ['To refer to the global scope', 'To refer to the class itself', 'To refer to the instance of the object', 'To make the method private'],
        answer: 2
      },
      {
        id: 7,
        question: 'Which data structure is used for a "Last-In, First-Out" (LIFO) approach in Python?',
        options: ['Queue', 'Stack (using list.append/pop)', 'Dictionary', 'Set'],
        answer: 1
      },
      {
        id: 8,
        question: 'What is the correct syntax for a list comprehension that squares even numbers in a range?',
        options: ['[x*x for x in range(10) if x%2==0]', '{x*x for x in range(10)}', '[if x%2==0 x*x]', 'None of the above'],
        answer: 0
      },
      {
        id: 9,
        question: 'What will "type([]) is list" return?',
        options: ['True', 'False', '<class "list">', 'Error'],
        answer: 0
      },
      {
        id: 10,
        question: 'What is the output of: print("Engineering"[-3:])?',
        options: ['Eng', 'ing', 'ring', 'eer'],
        answer: 1
      }
    ]
  },
  {
    id: 'java-basics',
    title: 'Java Fundamentals',
    description: 'Challenge your understanding of core Java concepts.',
    icon: '☕',
    questions: [
      {
        id: 1,
        question: 'What is the size of an int variable in Java?',
        options: ['8 bits', '16 bits', '32 bits', '64 bits'],
        answer: 2
      },
      {
        id: 2,
        question: 'Which of the following creates a new object?',
        options: ['alloc', 'create', 'new', 'make'],
        answer: 2
      },
      {
        id: 3,
        question: 'What is the entry point of a Java program?',
        options: ['start()', 'init()', 'main()', 'run()'],
        answer: 2
      },
      {
        id: 4,
        question: 'Which keyword is used by a class to use an interface?',
        options: ['import', 'implements', 'extends', 'uses'],
        answer: 1
      },
      {
        id: 5,
        question: 'Which of these is a non-access modifier?',
        options: ['public', 'private', 'final', 'protected'],
        answer: 2
      },
      {
        id: 6,
        question: 'What is the default value of a boolean variable?',
        options: ['true', 'false', '0', 'null'],
        answer: 1
      },
      {
        id: 7,
        question: 'Which of the following is NOT a Java concept?',
        options: ['Polymorphism', 'Inheritance', 'Compilation', 'Pointers'],
        answer: 3
      },
      {
        id: 8,
        question: 'Which package contains the Random class?',
        options: ['java.util', 'java.lang', 'java.awt', 'java.io'],
        answer: 0
      },
      {
        id: 9,
        question: 'What does JVM stand for?',
        options: ['Java Virtual Method', 'Java Volume Maker', 'Java Virtual Machine', 'Java Visual Machine'],
        answer: 2
      },
      {
        id: 10,
        question: 'In Java, an array index always begins with:',
        options: ['-1', '0', '1', 'length-1'],
        answer: 1
      }
    ]
  }
];
