// A dictionary of all your code snippets.
// Each key corresponds to an option value in index.html.
const codeSnippets = {
    // ----------------- 1) Infix-to-Postfix -----------------
    infixToPostfix: `#include <stdlib.h>
  #include <ctype.h>
  #define SIZE 20
  
  struct stack {
      int top;
      char data[SIZE];
  };
  typedef struct stack STACK;
  
  void push(STACK *s, char item) {
      s->data[++(s->top)] = item;
  }
  
  char pop(STACK *s) {
      return s->data[(s->top)--];
  }
  
  // Function to check precedence
  int preced(char symbol) {
      switch(symbol) {
          case '^': return 5;
          case '*':
          case '/': return 3;
          case '+':
          case '-': return 1;
          default: return 0; // Just in case
      }
  }
  
  // Function to convert infix to postfix
  void infixtopostfix(STACK *s, char infix[SIZE]) {
      int i, j = 0;
      char postfix[SIZE], temp, symbol;
      for(i = 0; infix[i] != '\\0'; i++) {
          symbol = infix[i];
          if(isalnum(symbol)) {
              postfix[j++] = symbol;
          } else {
              switch(symbol) {
                  case '(':
                      push(s, symbol);
                      break;
                  case ')':
                      temp = pop(s);
                      while(temp != '(') {
                          postfix[j++] = temp;
                          temp = pop(s);
                      }
                      break;
                  case '+':
                  case '-':
                  case '*':
                  case '/':
                  case '^':
                      if (s->top == -1 || s->data[s->top] == '(') {
                          push(s, symbol);
                      } else {
                          while(preced(s->data[s->top]) >= preced(symbol) &&
                                s->top != -1 &&
                                s->data[s->top] != '(') {
                              postfix[j++] = pop(s);
                          }
                          push(s, symbol);
                      }
                      break;
                  default:
                      printf("\\nInvalid symbol!!!\\n");
                      exit(0);
              }
          }
      }
      while(s->top != -1) {
          postfix[j++] = pop(s);
      }
      postfix[j] = '\\0';
      printf("\\nThe postfix expression is: %s\\n", postfix);
  }
  
  int main() {
      STACK s;
      s.top = -1;
      char infix[SIZE];
      printf("\\nRead Infix expression: ");
      scanf("%s", infix);
      infixtopostfix(&s, infix);
      return 0;
  }
  `,
  
    // ----------------- 2) Evaluation of Prefix -----------------
    evalPrefix: `#include <stdio.h>
  #include <stdlib.h>
  #include <ctype.h>
  #include <math.h>
  #include <string.h>
  #define SIZE 20
  
  struct stack {
      int top;
      float data[SIZE];
  };
  typedef struct stack STACK;
  
  void push(STACK *s, float item) {
      s->data[++(s->top)] = item;
  }
  
  float pop(STACK *s) {
      return s->data[(s->top)--];
  }
  
  // Perform an operation on two operands
  float operate(float op1, float op2, char symbol) {
      switch(symbol) {
          case '+': return op1 + op2;
          case '-': return op1 - op2;
          case '*': return op1 * op2;
          case '/': return op1 / op2;
          case '^': return pow(op1, op2);
          default:
              printf("Invalid operator\\n");
              exit(1);
      }
  }
  
  // Evaluate prefix expression
  float eval(STACK *s, char prefix[SIZE]) {
      int i;
      char symbol;
      float res, op1, op2;
      for(i = strlen(prefix) - 1; i >= 0; i--) {
          symbol = prefix[i];
          if(isdigit(symbol)) {
              // Convert char digit to float
              push(s, symbol - '0');
          } else {
              op1 = pop(s);
              op2 = pop(s);
              res = operate(op1, op2, symbol);
              push(s, res);
          }
      }
      return pop(s);
  }
  
  int main() {
      char prefix[SIZE];
      STACK s;
      float ans;
      s.top = -1;
      printf("\\nRead prefix expr\\n");
      scanf("%s", prefix);
      ans = eval(&s, prefix);
      printf("\\nThe final answer is %f\\n", ans);
      return 0;
  }
  `,
  
    // ----------------- 3) Message Queueing System -----------------
    msgQueueSystem: `#include <stdio.h>
  #include <stdlib.h>
  #include <string.h>
  #define SIZE 5
  
  struct queue {
      int front, rear;
      char data[SIZE][20];
  };
  typedef struct queue QUEUE;
  
  void send(QUEUE *q, char item[20]) {
      if (q->front == (q->rear + 1) % SIZE)
          printf("\\nQueue full");
      else {
          q->rear = (q->rear + 1) % SIZE;
          strcpy(q->data[q->rear], item);
          if (q->front == -1)
              q->front = 0;
      }
  }
  
  char* receive(QUEUE *q) {
      char *del;
      if (q->front == -1) {
          printf("\\nQueue empty");
          return NULL;
      } else {
          del = q->data[q->front];
          if (q->front == q->rear) {
              q->front = -1;
              q->rear = -1;
          } else {
              q->front = (q->front + 1) % SIZE;
          }
          return del;
      }
  }
  
  void display(QUEUE q) {
      int i;
      if (q.front == -1)
          printf("\\nQueue Empty");
      else {
          printf("\\nQueue content are\\n");
          for (i = q.front; i != q.rear; i = (i + 1) % SIZE)
              printf("%s\\n", q.data[i]);
          printf("%s\\n", q.data[i]);
      }
  }
  
  int main() {
      int ch;
      char *del;
      char item[20];
      QUEUE q;
      q.front = -1;
      q.rear = -1;
      for (;;) {
          printf("\\n1. Send\\n2. Receive\\n3. Display\\n4. Exit");
          printf("\\nRead Choice :");
          scanf("%d", &ch);
          getchar();
          switch (ch) {
              case 1:
                  printf("\\nRead msg to be send :");
                  gets(item); // get string
                  send(&q, item);
                  break;
              case 2:
                  del = receive(&q);
                  if (del != NULL)
                      printf("\\nElement deleted is %s\\n", del);
                  break;
              case 3:
                  display(q);
                  break;
              default:
                  exit(0);
          }
      }
      return 0;
  }
  `,
  
    // ----------------- 4) Multiply Polynomials (Linked List) -----------------
    polyMultLinkedList: `#include <stdio.h>
  #include <stdlib.h>
  #define SIZE 5
  int count;
  
  struct node {
      int co, po;
      struct node *addr;
  };
  typedef struct node *NODE;
  
  NODE insertend(NODE start, int co, int po) {
      NODE temp, cur;
      temp = (NODE)malloc(sizeof(struct node));
      temp->co = co;
      temp->po = po;
      temp->addr = NULL;
      if (start == NULL)
          return temp;
      cur = start;
      while (cur->addr != NULL)
          cur = cur->addr;
      cur->addr = temp;
      return start;
  }
  
  void display(NODE start) {
      NODE temp;
      if (start == NULL)
          printf("\\nPolynomial Empty");
      else {
          temp = start;
          while (temp->addr != NULL) {
              printf("%dx^%d+", temp->co, temp->po);
              temp = temp->addr;
          }
          // print last term
          printf("%dx^%d\\n", temp->co, temp->po);
      }
  }
  
  // If a term with the same power exists, add to it; else insert new term
  NODE addterm(NODE res, int co, int po) {
      NODE cur;
      if (res == NULL)
          return insertend(res, co, po);
  
      cur = res;
      while (cur != NULL) {
          if (cur->po == po) {
              cur->co += co;
              return res;
          }
          cur = cur->addr;
      }
      // If not found, insert at end
      res = insertend(res, co, po);
      return res;
  }
  
  NODE multiply(NODE poly1, NODE poly2) {
      NODE p1, p2, res = NULL;
      for (p1 = poly1; p1 != NULL; p1 = p1->addr) {
          for (p2 = poly2; p2 != NULL; p2 = p2->addr) {
              res = addterm(res, p1->co * p2->co, p1->po + p2->po);
          }
      }
      return res;
  }
  
  int main() {
      NODE poly1 = NULL, poly2 = NULL, poly;
      int co, po;
      int i, n, m;
      printf("\\nRead no of terms of first polynomial:");
      scanf("%d", &n);
      for (i = 1; i <= n; i++) {
          printf("\\nRead CO and PO of %d term : ", i);
          scanf("%d%d", &co, &po);
          poly1 = insertend(poly1, co, po);
      }
      printf("\\nFirst polynomial is\\n");
      display(poly1);
  
      printf("\\nRead no of terms of second polynomial:");
      scanf("%d", &m);
      for (i = 1; i <= m; i++) {
          printf("\\nRead CO and PO of %d term : ", i);
          scanf("%d%d", &co, &po);
          poly2 = insertend(poly2, co, po);
      }
      printf("\\nSecond polynomial is\\n");
      display(poly2);
  
      poly = multiply(poly1, poly2);
      printf("\\nResultant polynomial is\\n");
      display(poly);
  
      return 0;
  }
  `,
  
    // ----------------- 5) Queue of Integers (Circular List) -----------------
    queueCircularList: `#include <stdio.h>
  #include <stdlib.h>
  #define SIZE 5
  int count;
  
  struct node {
      int data;
      struct node *addr;
  };
  typedef struct node *NODE;
  
  NODE insertend(NODE last, int item) {
      NODE temp;
      if (count >= SIZE) {
          printf("\\nQueue full");
          return last;
      }
      count++;
      temp = (NODE)malloc(sizeof(struct node));
      temp->data = item;
      if (last == NULL) {
          temp->addr = temp;
          return temp;
      } else {
          temp->addr = last->addr;
          last->addr = temp;
          return temp;
      }
  }
  
  NODE deletebegin(NODE last) {
      NODE temp;
      if (last == NULL) {
          printf("\\nQueue empty");
          return NULL;
      } else if (last->addr == last) {
          printf("\\nElement deleted is %d\\n", last->data);
          free(last);
          count--;
          return NULL;
      } else {
          temp = last->addr;
          last->addr = temp->addr;
          printf("\\nElement deleted is %d\\n", temp->data);
          free(temp);
          count--;
          return last;
      }
  }
  
  void display(NODE last) {
      NODE temp;
      if (last == NULL)
          printf("\\nQueue is empty");
      else {
          printf("\\nQueue Content are\\n");
          temp = last->addr;
          while (temp != last) {
              printf("%d\\t", temp->data);
              temp = temp->addr;
          }
          printf("%d\\t", temp->data);
      }
  }
  
  int main() {
      NODE last = NULL;
      int item, ch;
      for (;;) {
          printf("\\n1.Insert\\n2.Delete\\n3.Display\\n4.Exit");
          printf("\\nRead Choice :");
          scanf("%d", &ch);
          switch (ch) {
              case 1:
                  printf("\\nRead data to be inserted:");
                  scanf("%d", &item);
                  last = insertend(last, item);
                  break;
              case 2:
                  last = deletebegin(last);
                  break;
              case 3:
                  display(last);
                  break;
              default:
                  exit(0);
          }
      }
      return 0;
  }
  `
  };
  
  // ------------------------------------------------------------
  // Display the selected snippet in the <code> block
  function showCode() {
    const select = document.getElementById("experimentSelect");
    const snippetKey = select.value; // e.g., "infixToPostfix"
    const codeBlock = document.getElementById("codeBlock");
  
    // Retrieve the snippet from codeSnippets
    codeBlock.textContent = codeSnippets[snippetKey] || "// Code not found!";
  
    // Re-run Prism highlighting
    Prism.highlightAll();
  }
  
  // Copy the displayed code to the clipboard
  function copyCode() {
    const codeBlock = document.getElementById("codeBlock");
    const textToCopy = codeBlock.textContent;
  
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert("Code copied to clipboard!");
      })
      .catch(err => {
        alert("Failed to copy code: " + err);
      });
  }
  
  // On page load, show the first snippet by default
  window.onload = showCode;
  