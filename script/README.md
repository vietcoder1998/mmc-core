## Requirement

1. You have ssh into server, if not ssh to server and copy your ~/.ssh/id_public_rsa.pub into ~/.ssh/authenticate.
2. You have a script like "npm run build", if not, it will be fall.
3. Your git have access_key in **bit_bucket** or any git server.

## Setup

1. copy folder in to source code.
2. Setup dev.sh.
3. Add "deploy": "bash dev.sh" into package.json at "script".
4. Add "lazy": "bash script/lazy.sh" into package.json at "script".

## Result

1. do all of before in step **Requirement** and **Setup**, you can run exactly very well

## Running

1. npm run lazy.
2. set **author** if skip, auto is [viettd] , or you can set new auth.
3. chose type of commit **_1.fixbug(default)_**, **_2.feature(default)_**, **_3.hot-fix(default)_** as 1 or 2 or 3.
4. Enter and waiting, if err , please **Ctrl + C** to exit.
5. If Success, you can see in hot.
6. If Error, check your result in debug.log file.
