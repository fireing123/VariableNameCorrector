# Variable Name Corrector / 변수명 교정기

VSCode에서 클래스, 함수, 변수, 상수 이름을 언어별 규칙에 맞게 자동 교정해주는 확장입니다.

VSCode extension to automatically correct class, function, variable, and constant names according to language-specific naming conventions.

---

## 주요 기능 / Features

1. **심볼 이름 교정 (`fixName`) / Symbol Name Correction**
   - 현재 선택한 변수/함수/클래스 이름을 감지하고 언어별 스타일로 변환
     Detects the selected variable/function/class name and converts it to language-specific style.
   - 교정 대상 심볼 / Supported symbols:
     - 클래스 / Class
     - 함수 / Function 
     - 변수 / Variable 
   - 교정 불가 / Not supported:
     - 알 수 없는 심볼(kind undefined) → 경고 메시지 표시 / undefined symbol kind → warning message

2. **상수 이름 교정 (`fixLiteralName`) / Constant Name Correction**
   - 선택한 상수 이름을 언어별 상수 규칙에 맞춰 변환
     Converts selected constant name to language-specific constant style (e.g., SCREAMING_SNAKE_CASE).

## 사용법 / Usage

1. 교정하려는 변수/함수/클래스/상수에 커서를 놓습니다.  
   Place your cursor on the variable/function/class/constant to correct.

2. 우클릭(컨텍스트 메뉴)에서 원하는 작업을 선택 
   You can either right-click (context menu) and select the action

   - **우클릭 메뉴 / Context Menu**
     - `변수 이름 정상화 (Fix Name)` → 클래스, 함수, 변수 교정 / Correct class, function, variable names
     - `상수 이름 정상화 (Fix Literal Name)` → 상수 이름 교정 / Correct constant names

---

## 예시 / Example

```ts
// Before
class myclass {}
function do_something() {}
let some_var = 10;


// After (JS 기준 / JS example)
class MyClass {}
function doSomething() {}
let someVar = 10;

//final Before
const piValue = 3.14;
//After
const PI_VALUE = 3.14;

```


---

## 주의 사항 / Notes

**임포트된 객체나 클래스는 정상적으로 교정되지 않을 수 있습니다.**  
Imported objects or classes may not be corrected properly.  
