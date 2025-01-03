// A dictionary of all 10 code snippets.
// The keys (code1..code10) match the <option> values in index.html.
const codeSnippets = {
    // ----------------------------- CODE 1 -----------------------------
    code1: `#include <stdio.h>
  #include <stdlib.h>
  #include <ctype.h>
  #include <string.h>
  
  #define MAX 100
  
  char stack[MAX];
  int top = -1;
  
  // Push element onto the stack
  void push(char c) {
      if (top == MAX - 1) {
          printf("Stack Overflow\\n");
          return;
      }
      stack[++top] = c;
  }
  
  // Pop element from the stack
  char pop() {
      if (top == -1) {
          printf("Stack Underflow\\n");
          return -1;
      }
      return stack[top--];
  }
  
  // Peek the top element of the stack
  char peek() {
      return stack[top];
  }
  
  // Check if a character is an operator
  int isOperator(char c) {
      return (c == '+' || c == '-' || c == '*' || c == '/');
  }
  
  // Get precedence of an operator
  int precedence(char c) {
      if (c == '+' || c == '-') {
          return 1;
      } else if (c == '*' || c == '/') {
          return 2;
      }
      return 0;
  }
  
  // Convert infix expression to postfix
  void infixToPostfix(char* infix, char* postfix) {
      int i = 0, j = 0;
      char token;
  
      while ((token = infix[i++]) != '\\0') {
          if (isalnum(token)) {
              postfix[j++] = token;
          } else if (token == '(') {
              push(token);
          } else if (token == ')') {
              while (top != -1 && peek() != '(') {
                  postfix[j++] = pop();
              }
              pop(); // Remove '('
          } else if (isOperator(token)) {
              while (top != -1 && precedence(peek()) >= precedence(token)) {
                  postfix[j++] = pop();
              }
              push(token);
          }
      }
  
      // Pop remaining elements
      while (top != -1) {
          postfix[j++] = pop();
      }
      postfix[j] = '\\0';
  }
  
  int main() {
      char infix[MAX], postfix[MAX];
      printf("Enter an infix expression: ");
      scanf("%s", infix);
      infixToPostfix(infix, postfix);
      printf("Postfix expression: %s\\n", postfix);
      return 0;
  }
  `,
  
    // ----------------------------- CODE 2 -----------------------------
    code2: `#include <stdio.h>
  #include <stdlib.h>
  #include <ctype.h>
  #include <math.h>
  #include <string.h>
  
  #define MAX 100
  
  int stack[MAX];
  int top = -1;
  
  void push(int value) {
      if (top == MAX - 1) {
          printf("Stack Overflow\\n");
          return;
      }
      stack[++top] = value;
  }
  
  int pop() {
      if (top == -1) {
          printf("Stack Underflow\\n");
          return -1;
      }
      return stack[top--];
  }
  
  int isOperator(char c) {
      return (c == '+' || c == '-' || c == '*' || c == '/' || c == '^');
  }
  
  // Evaluate the prefix expression
  int evaluatePrefix(char* prefix) {
      int i, operand1, operand2;
      for (i = strlen(prefix) - 1; i >= 0; i--) {
          char token = prefix[i];
          if (isdigit(token)) {
              push(token - '0');
          } else if (isOperator(token)) {
              operand1 = pop();
              operand2 = pop();
              switch (token) {
                  case '+': push(operand1 + operand2); break;
                  case '-': push(operand1 - operand2); break;
                  case '*': push(operand1 * operand2); break;
                  case '/': push(operand1 / operand2); break;
                  case '^': push((int)pow(operand1, operand2)); break;
                  default: printf("Invalid operator: %c\\n", token);
              }
          }
      }
      return pop();
  }
  
  int main() {
      char prefix[MAX];
      printf("Enter a prefix expression: ");
      scanf("%s", prefix);
      int result = evaluatePrefix(prefix);
      printf("The result of the prefix expression is: %d\\n", result);
      return 0;
  }
  `,
  
    // ----------------------------- CODE 3 -----------------------------
    code3: `#include <stdio.h>
  #include <stdlib.h>
  #include <string.h>
  
  #define MAX 100
  
  typedef struct {
      char messages[MAX][100];
      int front;
      int rear;
  } MessageQueue;
  
  void initializeQueue(MessageQueue* queue) {
      queue->front = -1;
      queue->rear = -1;
  }
  
  int isEmpty(MessageQueue* queue) {
      return (queue->front == -1);
  }
  
  int isFull(MessageQueue* queue) {
      return ((queue->rear + 1) % MAX == queue->front);
  }
  
  void enqueue(MessageQueue* queue, char* message) {
      if (isFull(queue)) {
          printf("Queue is full. Cannot enqueue message.\\n");
          return;
      }
      if (isEmpty(queue)) {
          queue->front = 0;
      }
      queue->rear = (queue->rear + 1) % MAX;
      strcpy(queue->messages[queue->rear], message);
      printf("Message enqueued: %s\\n", message);
  }
  
  void dequeue(MessageQueue* queue) {
      if (isEmpty(queue)) {
          printf("Queue is empty. Cannot dequeue message.\\n");
          return;
      }
      printf("Message dequeued: %s\\n", queue->messages[queue->front]);
      if (queue->front == queue->rear) {
          queue->front = -1;
          queue->rear = -1;
      } else {
          queue->front = (queue->front + 1) % MAX;
      }
  }
  
  void displayQueue(MessageQueue* queue) {
      if (isEmpty(queue)) {
          printf("Queue is empty.\\n");
          return;
      }
      printf("Messages in the queue:\\n");
      int i = queue->front;
      while (1) {
          printf("%s\\n", queue->messages[i]);
          if (i == queue->rear) break;
          i = (i + 1) % MAX;
      }
  }
  
  int main() {
      MessageQueue queue;
      initializeQueue(&queue);
  
      int choice;
      char message[100];
  
      do {
          printf("\\nMessage Queue System:\\n");
          printf("1. Enqueue Message\\n");
          printf("2. Dequeue Message\\n");
          printf("3. Display Queue\\n");
          printf("4. Exit\\n");
          printf("Enter your choice: ");
          scanf("%d", &choice);
          getchar();
  
          switch (choice) {
              case 1:
                  printf("Enter the message to enqueue: ");
                  fgets(message, sizeof(message), stdin);
                  message[strcspn(message, "\\n")] = '\\0'; 
                  enqueue(&queue, message);
                  break;
              case 2:
                  dequeue(&queue);
                  break;
              case 3:
                  displayQueue(&queue);
                  break;
              case 4:
                  printf("Exiting...\\n");
                  break;
              default:
                  printf("Invalid choice. Try again.\\n");
          }
      } while (choice != 4);
  
      return 0;
  }
  `,
  
    // ----------------------------- CODE 4 -----------------------------
    code4: `#include <stdio.h>
  #include <stdlib.h>
  
  typedef struct Node {
      int coeff;
      int power;
      struct Node* next;
  } Node;
  
  Node* createNode(int coeff, int power) {
      Node* newNode = (Node*)malloc(sizeof(Node));
      newNode->coeff = coeff;
      newNode->power = power;
      newNode->next = NULL;
      return newNode;
  }
  
  void insertTerm(Node** poly, int coeff, int power) {
      Node* newNode = createNode(coeff, power);
      if (*poly == NULL) {
          *poly = newNode;
          return;
      }
      Node* temp = *poly;
      while (temp->next != NULL) {
          temp = temp->next;
      }
      temp->next = newNode;
  }
  
  void displayPolynomial(Node* poly) {
      if (poly == NULL) {
          printf("0\\n");
          return;
      }
      while (poly != NULL) {
          printf("%dx^%d", poly->coeff, poly->power);
          if (poly->next != NULL) {
              printf(" + ");
          }
          poly = poly->next;
      }
      printf("\\n");
  }
  
  Node* multiplyPolynomials(Node* poly1, Node* poly2) {
      if (poly1 == NULL || poly2 == NULL) {
          return NULL;
      }
      Node* result = NULL;
      for (Node* ptr1 = poly1; ptr1 != NULL; ptr1 = ptr1->next) {
          for (Node* ptr2 = poly2; ptr2 != NULL; ptr2 = ptr2->next) {
              int coeff = ptr1->coeff * ptr2->coeff;
              int power = ptr1->power + ptr2->power;
              Node* temp = result;
              Node* prev = NULL;
              while (temp != NULL && temp->power > power) {
                  prev = temp;
                  temp = temp->next;
              }
              if (temp != NULL && temp->power == power) {
                  temp->coeff += coeff; 
              } else {
                  Node* newNode = createNode(coeff, power);
                  if (prev == NULL) {
                      newNode->next = result;
                      result = newNode;
                  } else {
                      newNode->next = prev->next;
                      prev->next = newNode;
                  }
              }
          }
      }
      return result;
  }
  
  int main() {
      Node* poly1 = NULL;
      Node* poly2 = NULL;
  
      printf("Enter the first polynomial (hardcoded):\\n");
      insertTerm(&poly1, 3, 2);
      insertTerm(&poly1, 5, 1);
      insertTerm(&poly1, 6, 0);
  
      printf("Enter the second polynomial (hardcoded):\\n");
      insertTerm(&poly2, 4, 1);
      insertTerm(&poly2, 2, 0);
  
      printf("\\nFirst Polynomial: ");
      displayPolynomial(poly1);
  
      printf("Second Polynomial: ");
      displayPolynomial(poly2);
  
      Node* result = multiplyPolynomials(poly1, poly2);
      printf("\\nResultant Polynomial after Multiplication: ");
      displayPolynomial(result);
  
      return 0;
  }
  `,
  
    // ----------------------------- CODE 5 -----------------------------
    code5: `#include <stdio.h>
  #include <stdlib.h>
  
  // Node structure
  typedef struct Node {
      int data;
      struct Node* next;
  } Node;
  
  // Queue structure
  typedef struct {
      Node* rear;
  } CircularQueue;
  
  void initializeQueue(CircularQueue* queue) {
      queue->rear = NULL;
  }
  
  int isEmpty(CircularQueue* queue) {
      return (queue->rear == NULL);
  }
  
  void enqueue(CircularQueue* queue, int value) {
      Node* newNode = (Node*)malloc(sizeof(Node));
      newNode->data = value;
      if (isEmpty(queue)) {
          newNode->next = newNode;
          queue->rear = newNode;
      } else {
          newNode->next = queue->rear->next;
          queue->rear->next = newNode;
          queue->rear = newNode;
      }
      printf("Enqueued: %d\\n", value);
  }
  
  void dequeue(CircularQueue* queue) {
      if (isEmpty(queue)) {
          printf("Queue is empty. Cannot dequeue.\\n");
          return;
      }
      Node* front = queue->rear->next;
      printf("Dequeued: %d\\n", front->data);
      if (front == queue->rear) {
          queue->rear = NULL;
      } else {
          queue->rear->next = front->next;
      }
      free(front);
  }
  
  void displayQueue(CircularQueue* queue) {
      if (isEmpty(queue)) {
          printf("Queue is empty.\\n");
          return;
      }
      Node* temp = queue->rear->next;
      printf("Queue elements: ");
      do {
          printf("%d ", temp->data);
          temp = temp->next;
      } while (temp != queue->rear->next);
      printf("\\n");
  }
  
  int main() {
      CircularQueue queue;
      initializeQueue(&queue);
  
      int choice, value;
      do {
          printf("\\nCircular Queue Operations:\\n");
          printf("1. Enqueue\\n");
          printf("2. Dequeue\\n");
          printf("3. Display Queue\\n");
          printf("4. Exit\\n");
          printf("Enter your choice: ");
          scanf("%d", &choice);
  
          switch (choice) {
              case 1:
                  printf("Enter value to enqueue: ");
                  scanf("%d", &value);
                  enqueue(&queue, value);
                  break;
              case 2:
                  dequeue(&queue);
                  break;
              case 3:
                  displayQueue(&queue);
                  break;
              case 4:
                  printf("Exiting...\\n");
                  break;
              default:
                  printf("Invalid choice. Try again.\\n");
          }
      } while (choice != 4);
  
      return 0;
  }
  `,
  
    // ----------------------------- CODE 6 -----------------------------
    code6: `#include <stdio.h>
  #include <stdlib.h>
  
  #define TABLE_SIZE 10
  #define EMPTY -1
  
  int hashTable[TABLE_SIZE];
  
  int h1(int key) {
      return key % TABLE_SIZE;
  }
  
  int h2(int key) {
      return 1 + (key % (TABLE_SIZE - 1));
  }
  
  void insert(int key) {
      int index = h1(key);
      int step = h2(key);
      for (int i = 0; i < TABLE_SIZE; i++) {
          int newIndex = (index + i * step) % TABLE_SIZE;
          if (hashTable[newIndex] == EMPTY) {
              hashTable[newIndex] = key;
              printf("Inserted %d at index %d\\n", key, newIndex);
              return;
          }
      }
      printf("Hash table is full. Could not insert %d\\n", key);
  }
  
  int search(int key) {
      int index = h1(key);
      int step = h2(key);
      for (int i = 0; i < TABLE_SIZE; i++) {
          int newIndex = (index + i * step) % TABLE_SIZE;
          if (hashTable[newIndex] == EMPTY) {
              return -1;
          }
          if (hashTable[newIndex] == key) {
              return newIndex;
          }
      }
      return -1;
  }
  
  void display() {
      printf("Hash Table:\\n");
      for (int i = 0; i < TABLE_SIZE; i++) {
          if (hashTable[i] == EMPTY) {
              printf("[%d]: EMPTY\\n", i);
          } else {
              printf("[%d]: %d\\n", i, hashTable[i]);
          }
      }
  }
  
  int main() {
      for (int i = 0; i < TABLE_SIZE; i++) {
          hashTable[i] = EMPTY;
      }
      int choice, key;
      do {
          printf("\\nDouble Hashing Menu:\\n");
          printf("1. Insert\\n");
          printf("2. Search\\n");
          printf("3. Display\\n");
          printf("4. Exit\\n");
          printf("Enter your choice: ");
          scanf("%d", &choice);
  
          switch (choice) {
              case 1:
                  printf("Enter key to insert: ");
                  scanf("%d", &key);
                  insert(key);
                  break;
              case 2:
                  printf("Enter key to search: ");
                  scanf("%d", &key);
                  {
                      int result = search(key);
                      if (result != -1) {
                          printf("Key %d found at index %d\\n", key, result);
                      } else {
                          printf("Key %d not found\\n", key);
                      }
                  }
                  break;
              case 3:
                  display();
                  break;
              case 4:
                  printf("Exiting...\\n");
                  break;
              default:
                  printf("Invalid choice. Try again.\\n");
          }
      } while (choice != 4);
  
      return 0;
  }
  `,
  
    // ----------------------------- CODE 7 -----------------------------
    code7: `#include <stdio.h>
  #include <stdlib.h>
  
  #define MAX_SIZE 100
  
  typedef struct {
      int data[MAX_SIZE];
      int size;
  } MinHeap;
  
  void initializeHeap(MinHeap* heap) {
      heap->size = 0;
  }
  
  void insert(MinHeap* heap, int value) {
      if (heap->size == MAX_SIZE) {
          printf("Heap is full. Cannot insert %d.\\n", value);
          return;
      }
      int i = heap->size++;
      heap->data[i] = value;
      while (i > 0 && heap->data[i] < heap->data[(i - 1) / 2]) {
          int temp = heap->data[i];
          heap->data[i] = heap->data[(i - 1) / 2];
          heap->data[(i - 1) / 2] = temp;
          i = (i - 1) / 2;
      }
      printf("Inserted %d into the heap.\\n", value);
  }
  
  int extractMin(MinHeap* heap) {
      if (heap->size == 0) {
          printf("Heap is empty. Cannot extract.\\n");
          return -1;
      }
      int minValue = heap->data[0];
      heap->data[0] = heap->data[--heap->size];
      int i = 0;
      while (1) {
          int left = 2 * i + 1;
          int right = 2 * i + 2;
          int smallest = i;
          if (left < heap->size && heap->data[left] < heap->data[smallest]) {
              smallest = left;
          }
          if (right < heap->size && heap->data[right] < heap->data[smallest]) {
              smallest = right;
          }
          if (smallest == i) {
              break;
          }
          int temp = heap->data[i];
          heap->data[i] = heap->data[smallest];
          heap->data[smallest] = temp;
          i = smallest;
      }
      return minValue;
  }
  
  void displayHeap(MinHeap* heap) {
      if (heap->size == 0) {
          printf("Heap is empty.\\n");
          return;
      }
      printf("Heap elements: ");
      for (int i = 0; i < heap->size; i++) {
          printf("%d ", heap->data[i]);
      }
      printf("\\n");
  }
  
  int main() {
      MinHeap heap;
      initializeHeap(&heap);
      int choice, value;
      do {
          printf("\\nPriority Queue using Binary Heap:\\n");
          printf("1. Insert\\n2. Extract Min\\n3. Display\\n4. Exit\\n");
          printf("Enter your choice: ");
          scanf("%d", &choice);
  
          switch (choice) {
              case 1:
                  printf("Enter value to insert: ");
                  scanf("%d", &value);
                  insert(&heap, value);
                  break;
              case 2:
                  value = extractMin(&heap);
                  if (value != -1) {
                      printf("Extracted min: %d\\n", value);
                  }
                  break;
              case 3:
                  displayHeap(&heap);
                  break;
              case 4:
                  printf("Exiting...\\n");
                  break;
              default:
                  printf("Invalid choice. Try again.\\n");
          }
      } while (choice != 4);
  
      return 0;
  }
  `,
  
    // ----------------------------- CODE 8 -----------------------------
    code8: `#include <stdio.h>
  #include <stdlib.h>
  #include <ctype.h>
  
  typedef struct Node {
      char data;
      struct Node* left;
      struct Node* right;
  } Node;
  
  typedef struct Stack {
      Node* array[100];
      int top;
  } Stack;
  
  void initializeStack(Stack* stack) {
      stack->top = -1;
  }
  
  int isEmpty(Stack* stack) {
      return stack->top == -1;
  }
  
  void push(Stack* stack, Node* node) {
      stack->array[++stack->top] = node;
  }
  
  Node* pop(Stack* stack) {
      if (isEmpty(stack)) {
          printf("Stack underflow!\\n");
          return NULL;
      }
      return stack->array[stack->top--];
  }
  
  Node* peek(Stack* stack) {
      return stack->array[stack->top];
  }
  
  Node* createNode(char data) {
      Node* newNode = (Node*)malloc(sizeof(Node));
      newNode->data = data;
      newNode->left = newNode->right = NULL;
      return newNode;
  }
  
  int precedence(char op) {
      if (op == '+' || op == '-') return 1;
      if (op == '*' || op == '/') return 2;
      return 0;
  }
  
  int isOperator(char ch) {
      return ch == '+' || ch == '-' || ch == '*' || ch == '/';
  }
  
  void infixToPostfix(char* infix, char* postfix) {
      Stack operatorStack;
      initializeStack(&operatorStack);
      int i = 0, k = 0;
      while (infix[i] != '\\0') {
          if (isalnum(infix[i])) {
              postfix[k++] = infix[i];
          } else if (infix[i] == '(') {
              push(&operatorStack, createNode(infix[i]));
          } else if (infix[i] == ')') {
              while (!isEmpty(&operatorStack) && peek(&operatorStack)->data != '(') {
                  postfix[k++] = pop(&operatorStack)->data;
              }
              pop(&operatorStack);
          } else if (isOperator(infix[i])) {
              while (!isEmpty(&operatorStack) &&
                     precedence(peek(&operatorStack)->data) >= precedence(infix[i])) {
                  postfix[k++] = pop(&operatorStack)->data;
              }
              push(&operatorStack, createNode(infix[i]));
          }
          i++;
      }
      while (!isEmpty(&operatorStack)) {
          postfix[k++] = pop(&operatorStack)->data;
      }
      postfix[k] = '\\0';
  }
  
  Node* buildExpressionTree(char* postfix) {
      Stack treeStack;
      initializeStack(&treeStack);
      int i = 0;
      while (postfix[i] != '\\0') {
          Node* newNode = createNode(postfix[i]);
          if (isOperator(postfix[i])) {
              newNode->right = pop(&treeStack);
              newNode->left = pop(&treeStack);
          }
          push(&treeStack, newNode);
          i++;
      }
      return pop(&treeStack);
  }
  
  void inorderTraversal(Node* root) {
      if (root == NULL) return;
      if (isOperator(root->data)) printf("(");
      inorderTraversal(root->left);
      printf("%c", root->data);
      inorderTraversal(root->right);
      if (isOperator(root->data)) printf(")");
  }
  
  int main() {
      char infix[100], postfix[100];
      printf("Enter an infix expression: ");
      scanf("%s", infix);
      infixToPostfix(infix, postfix);
      printf("Postfix expression: %s\\n", postfix);
  
      Node* root = buildExpressionTree(postfix);
      printf("Inorder traversal of the expression tree: ");
      inorderTraversal(root);
      printf("\\n");
      return 0;
  }
  `,
  
    // ----------------------------- CODE 9 -----------------------------
    code9: `#include <stdio.h>
  #include <stdlib.h>
  
  typedef struct Node {
      int data;
      struct Node* left;
      struct Node* right;
  } Node;
  
  Node* createNode(int data) {
      Node* newNode = (Node*)malloc(sizeof(Node));
      newNode->data = data;
      newNode->left = NULL;
      newNode->right = NULL;
      return newNode;
  }
  
  Node* createTree() {
      int data;
      printf("Enter data (-1 for no node): ");
      scanf("%d", &data);
      if (data == -1) {
          return NULL;
      }
      Node* root = createNode(data);
      printf("Enter left child of %d:\\n", data);
      root->left = createTree();
      printf("Enter right child of %d:\\n", data);
      root->right = createTree();
      return root;
  }
  
  void inorderTraversal(Node* root) {
      if (root == NULL) {
          return;
      }
      inorderTraversal(root->left);
      printf("%d ", root->data);
      inorderTraversal(root->right);
  }
  
  int countNodes(Node* root) {
      if (root == NULL) {
          return 0;
      }
      return 1 + countNodes(root->left) + countNodes(root->right);
  }
  
  int countLeafNodes(Node* root) {
      if (root == NULL) {
          return 0;
      }
      if (root->left == NULL && root->right == NULL) {
          return 1;
      }
      return countLeafNodes(root->left) + countLeafNodes(root->right);
  }
  
  int main() {
      Node* root = NULL;
      printf("Create a binary tree:\\n");
      root = createTree();
      printf("\\nInorder traversal of the binary tree: ");
      inorderTraversal(root);
      printf("\\n");
  
      int totalNodes = countNodes(root);
      printf("Total number of nodes in the tree: %d\\n", totalNodes);
  
      int leafNodes = countLeafNodes(root);
      printf("Number of leaf nodes in the tree: %d\\n", leafNodes);
  
      return 0;
  }
  `,
  
    // ----------------------------- CODE 10 -----------------------------
    code10: `#include <stdio.h>
  #include <stdlib.h>
  
  typedef struct Node {
      int data;
      struct Node* left;
      struct Node* right;
  } Node;
  
  Node* createNode(int data) {
      Node* newNode = (Node*)malloc(sizeof(Node));
      newNode->data = data;
      newNode->left = NULL;
      newNode->right = NULL;
      return newNode;
  }
  
  Node* insertNode(Node* root, int data) {
      if (root == NULL) {
          return createNode(data);
      }
      if (data < root->data) {
          root->left = insertNode(root->left, data);
      } else if (data > root->data) {
          root->right = insertNode(root->right, data);
      }
      return root;
  }
  
  Node* findMin(Node* root) {
      while (root && root->left != NULL) {
          root = root->left;
      }
      return root;
  }
  
  Node* deleteNode(Node* root, int data) {
      if (root == NULL) {
          return root;
      }
      if (data < root->data) {
          root->left = deleteNode(root->left, data);
      } else if (data > root->data) {
          root->right = deleteNode(root->right, data);
      } else {
          if (root->left == NULL) {
              Node* temp = root->right;
              free(root);
              return temp;
          } else if (root->right == NULL) {
              Node* temp = root->left;
              free(root);
              return temp;
          }
          Node* temp = findMin(root->right);
          root->data = temp->data;
          root->right = deleteNode(root->right, temp->data);
      }
      return root;
  }
  
  void inorderTraversal(Node* root) {
      if (root == NULL) {
          return;
      }
      inorderTraversal(root->left);
      printf("%d ", root->data);
      inorderTraversal(root->right);
  }
  
  int main() {
      Node* root = NULL;
      int choice, data;
  
      do {
          printf("\\nBinary Search Tree Operations:\\n");
          printf("1. Insert a node\\n");
          printf("2. Delete a node\\n");
          printf("3. Display the tree (Inorder Traversal)\\n");
          printf("4. Exit\\n");
          printf("Enter your choice: ");
          scanf("%d", &choice);
  
          switch (choice) {
              case 1:
                  printf("Enter data to insert: ");
                  scanf("%d", &data);
                  root = insertNode(root, data);
                  printf("Node inserted.\\n");
                  break;
              case 2:
                  printf("Enter data to delete: ");
                  scanf("%d", &data);
                  root = deleteNode(root, data);
                  printf("Node deleted (if existed).\\n");
                  break;
              case 3:
                  printf("Inorder Traversal of the tree: ");
                  inorderTraversal(root);
                  printf("\\n");
                  break;
              case 4:
                  printf("Exiting...\\n");
                  break;
              default:
                  printf("Invalid choice. Try again.\\n");
          }
      } while (choice != 4);
  
      return 0;
  }
  `};
  
  // -----------------------------------------
  // Show the selected snippet in the <code> block
  function showCode() {
    const select = document.getElementById("programSelect");
    const snippetKey = select.value; // e.g., "code1"
    const codeBlock = document.getElementById("codeBlock");
  
    // Place the corresponding code snippet in the code block
    codeBlock.textContent = codeSnippets[snippetKey] || "// Code not found!";
  
    // Re-run Prism syntax highlighting
    Prism.highlightAll();
  }
  
  // -----------------------------------------
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
  
  // -----------------------------------------
  // On page load, show the first snippet by default
  window.onload = showCode;
  
