title: Android設定寄送夾帶附件的E-mail時附件無法使用
date: 2013-04-19 23:01:26
tags: android
---

### 問題起因 ###

基本上使用常見的方法如下

    Intent i = new Intent(Intent.ACTION_SEND);
    i.setType("image/jpeg");
    i.putExtra(Intent.EXTRA_EMAIL  , new String[]{sendTarget});
    i.putExtra(Intent.EXTRA_SUBJECT, sendSubject);
    i.putExtra(Intent.EXTRA_TEXT   , sendText);
    i.putExtra(Intent.EXTRA_STREAM, Uri.parse("file://"+ filePath));
    try {
         curActivity.startActivity(Intent.createChooser(i, "Please select Email client"));
    } catch (android.content.ActivityNotFoundException ex) {
        Toast.makeText(curActivity, "There are no email clients installed.", Toast.LENGTH_SHORT).show();
    }

問題出於我給的是Internal Storage的路徑，所以基本上當其它的應用程式要取用檔案時有有存取權限問題


### 解決方式 ###
copy一份到External Storage再用copy檔的路徑即可

    File externalPicPath = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
    File dstFile = new File(externalPicPath, "picture.png");
    try{
        FileInputStream in = new FileInputStream(filePath);
        FileOutputStream out = new FileOutputStream(dstFile);
        byte[] buf = new byte[1024];
        int len;
        while ((len = in.read(buf)) > 0) {
            out.write(buf, 0, len);
        }
        in.close();
        out.close();
    }
    catch(IOException e)
    {
        Toast.makeText(curActivity, "I/O Error.", Toast.LENGTH_SHORT).show();
         return;
    }