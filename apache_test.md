Команда: ab -c 10 -n 10000 https://127.0.0.1/api/comments > report.md

# С балансировкой (без кеширования)

This is ApacheBench, Version 2.3 <$Revision: 1879490 $>  

Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/  

Licensed to The Apache Software Foundation, http://www.apache.org/  

Benchmarking 127.0.0.1 (be patient)


Server Software:        blog
Server Hostname:        127.0.0.1
Server Port:            443
SSL/TLS Protocol:       TLSv1.2,ECDHE-RSA-AES256-GCM-SHA384,2048,256
Server Temp Key:        X25519 253 bits

Document Path:          /api/comments
Document Length:        151 bytes

Concurrency Level:      10
Time taken for tests:   12.873 seconds
Complete requests:      10000
Failed requests:        0
Non-2xx responses:      10000
Total transferred:      4410000 bytes
HTML transferred:       1510000 bytes
Requests per second:    776.83 [#/sec] (mean)
Time per request:       12.873 [ms] (mean)
Time per request:       1.287 [ms] (mean, across all concurrent requests)
Transfer rate:          334.55 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        1    7   3.8      7      35
Processing:     1    5   3.7      5      34
Waiting:        0    5   3.6      4      34
Total:          2   13   5.8     12      47

Percentage of the requests served within a certain time (ms)
  50%     12
  66%     14
  75%     16
  80%     17
  90%     21
  95%     23
  98%     28
  99%     30
 100%     47 (longest request)

# Без балансировки (без кеширования)
