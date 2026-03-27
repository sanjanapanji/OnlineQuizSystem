export const quizzes = [
  {
    id: 'python-basics',
    title: 'Python Basics',
    description: 'Test your fundamental knowledge of Python programming.',
    icon: '🐍',
    questions: [
      {
        id: 1,
        question: "What is Python?",
        options: [
          "A snake",
          "A programming language",
          "A car brand",
          "An operating system"
        ],
        answer: 1
      },
      {
        id: 2,
        question: "Which keyword is used to define a function?",
        options: ["func", "define", "def", "function"],
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
