title: c++與c＃間的溝通與資料傳遞
date: 2018-02-07 10:55:29
tags:
- unity
- android
- c++
- c#
- mono
---

目前的專案server端與client端間的共用邏輯是用C++寫的, 而Unity的主要使用程式碼又是c#, 所以有需要從c#呼叫c++端的方法, 以及從c++取資料, 這裡主要整理一下專案用的方法以及遇到的一些問題。

1. Windows是編成dll, android是編成.so, ios主要是編成.a

2. 溝通方式有分兩種:     

    - PInvoke (DllImport 屬性)
    https://msdn.microsoft.com/zh-tw/library/eyzhw3s8.aspx
    
        ```csharp
        [DllImport(PlatformDllName)]     
        private static extern void TEST_Init();     
        ```
    如此宣告後可以直接呼叫直接呼叫    
    在Unity上面使用DllImport後會鎖死該dll檔, 想要更新的話要關閉unity
    - It Just Works (IJW)  使用Marshal類別
    http://forum.unity3d.com/threads/unloading-native-plugins-in-the-unity-editor.198296/
    做起來挺麻煩, 但是可以避免dll不能unload問題
    前期使用的是第二種方式, 但是後來覺得需要更多時間去維護還是都改用第一種
    ref： 從 Managed 程式碼呼叫原生函式  https://msdn.microsoft.com/zh-tw/library/ms235282.aspx
3. 簡單的呼叫範例   
    c++用的巨集        
    ```c++
    #ifdef _MSC_VER 
    #define PLUGIN_DLL_API __declspec(dllexport) 
    #else
    #define PLUGIN_DLL_API
    #endif
    ```
    c++端的方法    
    ```c++
    PLUGIN_DLL_API void Test_Func(int StartIdx, int Count, int* OutArray)
    {
      ...
    }
    ```
    c#的lib名稱宣告    
    ```csharp
    #if (UNITY_IOS && !UNITY_EDITOR_OSX) || UNITY_XBOX360
    
        // On iOS and Xbox 360 plugins are statically linked into
        // the executable, so we have to use **Internal as the
        // library name.
    
        public const string PlatformDllName = "__Internal";
    #else
        public const string PlatformDllName = "GameCenterPlugin";  // 不用加lib.
    #endif
    ```
    c#端方法宣告    
    ```csharp
    [DllImport(SysPluginBase.PlatformDllName)]   
    private static extern void Test_Func(int StartIdx, int Count, System.IntPtr OutArray);    
    ```
    要注意的有兩點:
    - 如果c++要傳指標給c#, c#需要用`System.IntPtr`來處理。    
    - 兩邊的名稱必須一樣, 不然會有`EntryPointNotFoundException`。    
    
3. 簡單的結構範例     
    c++端    
    ```c++
    class Data
    {
        public:
            int m_Int;          // int
            char m_Str[32];     // 字串
            int m_IntAry[10];   // int陣列
    };
    ```
    c#端    
    ```csharp
    [StructLayout(LayoutKind.Sequential, Pack = 4)]
    [Serializable]
    public class LevelData
    {
        public int m_Int;                 // int
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 32)]
        public string m_Str;              // 字串
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 10)]
        public int[] m_IntAry;            // int陣列
    };
    ```
    ```LayoutKind.Sequential```主要是告知這個結構的記憶體是照順序排下來, 也可以宣告成 Explicit 來自己指定, 不過用 Sequential 是比較簡單的作法, 只要注意順序不要有錯誤就行了
3. iOS要使用CallBack C++Plugin, MonoPInvokeCallback 是一定要加的
https://developer.xamarin.com/guides/ios/advanced_topics/limitations/#Reverse_Callbacks
原文節錄如下：
    
    >When using the ahead-of-time compiler required by the iPhone there are two important limitations at this point:     
    >You must flag all of your callback methods with the MonoPInvokeCallbackAttribute   
    >The methods have to be static methods, there is no support for instance methods.    
    
    除了要在方法上方加上```[AOT.MonoPInvokeCallback(typeof(對應該方法的delegate))]```外, 該方法還需要是static方法.
    PC端跟android不需要

4. 在android上如果結構使用pack = 1 , 在加上該struct有float的話, c#在使用```Marshal.PtrToStructure```就會造成crash, 只有android會有這個問題, 該問題找不到確切造成的原因。

5. 結構中不要使用bool, 因為無法保證他的位元長度, 最好的方法還是用byte之類的代替。


ref: https://www.codeproject.com/Articles/25896/Reading-Unmanaged-Data-Into-Structures
ref: http://www.mono-project.com/docs/advanced/pinvoke/





