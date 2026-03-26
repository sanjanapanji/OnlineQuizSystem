export const quizzes = [
  {
    id: 'python-basics',
    title: 'Python Basics',
    description: 'Test your fundamental knowledge of Python programming.',
    icon: '🐍',
    questions: [
      {
        id: 1,
        question: 'What is the correct file extension for Python files?',
        options: ['.py', '.python', '.pt', '.pyt'],
        answer: 0
      },
      {
        id: 2,
        question: 'Which keyword is used to create a function in Python?',
        options: ['function', 'def', 'create', 'func'],
        answer: 1
      },
      {
        id: 3,
        question: 'How do you insert comments in Python code?',
        options: ['// This is a comment', '/* This is a comment */', '# This is a comment', '-- This is a comment'],
        answer: 2
      },
      {
        id: 4,
        question: 'Which method can be used to return a string in upper case letters?',
        options: ['upper()', 'toUpperCase()', 'uppercase()', 'upperCase()'],
        answer: 0
      },
      {
        id: 5,
        question: 'What is the correct syntax to output "Hello World" in Python?',
        options: ['echo("Hello World");', 'p("Hello World")', 'print("Hello World")', 'console.log("Hello World")'],
        answer: 2
      },
      {
        id: 6,
        question: 'Which collection is ordered, changeable, and allows duplicate members?',
        options: ['SET', 'TUPLE', 'DICTIONARY', 'LIST'],
        answer: 3
      },
      {
        id: 7,
        question: 'Which of the following is NOT a core data type in Python?',
        options: ['Lists', 'Class', 'Dictionary', 'Tuples'],
        answer: 1
      },
      {
        id: 8,
        question: 'What is the output of print(2 ** 3)?',
        options: ['6', '8', '9', 'None'],
        answer: 1
      },
      {
        id: 9,
        question: 'Which keyword is used for exception handling?',
        options: ['try', 'except', 'finally', 'All of the above'],
        answer: 3
      },
      {
        id: 10,
        question: 'What does the len() function do?',
        options: ['Returns the type of an object', 'Calculates the math length of an object', 'Returns the number of items in an object', 'It is not a valid Python function'],
        answer: 2
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
