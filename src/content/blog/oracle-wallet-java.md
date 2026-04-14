---
title: "How to use Oracle wallet inside a Java program"
pubDatetime: "2020-07-02"
tags: ["Software Development", "Software Maintenance"]
---

![](/images/oracle-wallet-java-unsplash.jpg)

Before we get into what it takes for a Java program to make database connection using Oracle wallet, let's first see how we make a connection without a wallet.

We'll use the following variables as an example for demonstration.

```shell
PATH_TO_TNS_ADMIN = C:\OracleClient\TNS_ADMIN
PATH_TO_ORACLE_WALLET = C:\OracleClient\mywallet
MYDB.WORLD = (DESCRIPTION=(ADDRESS=(COMMUNITY=abc.world)(PROTOCOL=tcp)(HOST=10.10.10.10)(PORT=1333)) (CONNECT_DATA=(SERVICE_NAME=xyz)(SERVER = DEDICATED)))
WALLET_ENTRY_FOR_THE_DB = MyWalletEntry.WORLD # (This will point to the above database)
```

## Java program without using Oracle wallet
Regardless of whether you use core Java or any Java framework (Spring Data JPA, Hibernate etc.), you need the database **username**, the database **password**, name of the **jdbc driver class name**, **jdbcUrl** and **ojdbc jar** on your classpath.

Your jdbcUrl would be this

```shell
jdbc:oracle:thin:@//10.10.10.10:1333/MYDB.WORLD
```

And you'll specify the username, password and the driver class name along with this to make the connection.

## Java program using Oracle Wallet
Once you have your credential added to Oracle wallet (usually done by DBAs), you need to use this credential in your jdbcUrl parameter. But that's not enough. You need to do a little more in your application so that your application can identify that the entry is from wallet, open the wallet, extract the username and password and then make the connection.

- You'll need **ojdbc6.jar** or above on your classpath. *Wallets don't work with ojdbc5.jar*.
- You'll need 3 more jars — **oraclepki.jar**, **osdt_core.jar** and **osdt_cert.jar** on your classpath.
- Define the following 2 environment variables (You can also pass these as JVM_OPTS)

```shell
oracle.net.tns_admin=C:\OracleClient\TNS_ADMIN
oracle.net.wallet_location=(SOURCE(METHOD=FILE(METHOD_DATA=(DIRECTORY=C:\OracleClient\mywallet))))
```


- Modify the jdbcUrl parameter to instruct the driver that this is a wallet entry

```shell
jdbc:oracle:thin:/@MyWalletEntry.WORLD
```

> Notice the placement of the characters **'/'** and **'@'** between the two syntax.

- **Remove** any specified username and password attributes to your jdbc connection (These would be provided by the wallet while making the connection).
- Ensure the driver class name is **oracle.jdbc.OracleDriver**

That's it. Your Java program is now free from maintaining database password.
