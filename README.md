# app1

## 生成密钥与公钥

```
cd config
openssl
genrsa -out private.key 4096
rsa -in private.key -pubout -out public.key
exit
```

执行 `config/convert.key.js` 可以获得 `.env` 的 `PRIVATE_KEY` 和 `PUBLIC_KEY`
