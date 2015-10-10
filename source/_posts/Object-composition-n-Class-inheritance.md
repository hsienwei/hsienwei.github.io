title: Object composition(物件複合) & Class inheritance(類別繼承)
date: 2009-05-05 01:05:16
tags:
---

首先，類別繼承不同於介面繼承(Interface Inheritance)。  
類別繼承重於共享程式碼與內部佈局機制，介面繼承重於可替換性。

假設現在有A,B兩個class  
class A中有method work()  
現在要讓B使用A的work()  
有以下兩種方法：

* B extends A ,呼叫繼承來的work()方法
* 給B一個欄位為class A，並在class B 中給予一個方法去呼叫該欄位的work()

方法1為類別繼承，方法2為物件複合，在物件導向中這兩種方法是最常見的再利用(reuse)技術。  
在方法2中，使用了稱為delegation(委託)的技術，簡單來講就是把自己該做的事交給別人去做，這樣的方法讓物件複合擁有與繼承一樣強而有力。

比較：  
物件複合可在執行期動態指涉(Reference)其他物件 [1]P.19  
類別繼承破壞封裝性  

在一些書中提到了能用物件複合就不要用類別繼承的觀念  
多用物件複合技術，少用類別繼承。(Favor object composition over class inheritance.)[1]原P.20中p.23  
條款14：優先考慮複合(Composition)，然後才是繼承(inheritance) [2]中P.71  

但這只是一個原則，繼承的功能強大，但由於他破壞了封裝性，所以只有當子類別確實是父類別的subtype時才適合使用繼承。如果，父類別與子類別處於不同package或副類別本身並不設計為繼承用(抽象類別為繼承用)，還是建議使用複合。[2]中P.76  
使用delegation過頭可能適得其反，在[3]的第三章提到一種程式碼的壞味道：中間轉手人(Middle Man)，就是由於使用delegation過頭而產生。

最後，在重構(Refactoring)技術方面有兩個相關。  
* Replace Inheritance with Delegation：有時我們將一個B類別繼承A類別想要使用它的操作，但是有時候會發現我繼承A類別後也繼承了一對不需要的東西，或發現繼承後根本不適用時使用。[3]中p.352  
* Replace Delegation with Inheritance：當你發現你使用了你委託對象的所有函式，則可以考慮繼承他(仍有限制)。[3]中p.355

--------
參考資料  
[1]GoF, Design Patterns  
[2]J. Bloch, Effective Java Programming Language Guide  
[3]M. Fowler, Refactoring: Improving The Design of Existing Code  
[4]J. Kerievsky, Refactoring to Patterns