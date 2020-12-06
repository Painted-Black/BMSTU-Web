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
Time taken for tests:   10.576 seconds
Complete requests:      10000
Failed requests:        0
Non-2xx responses:      10000
Total transferred:      4410000 bytes
HTML transferred:       1510000 bytes
Requests per second:    945.53 [#/sec] (mean)
Time per request:       10.576 [ms] (mean)
Time per request:       1.058 [ms] (mean, across all concurrent requests)
Transfer rate:          407.21 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        1    5   3.0      5      31
Processing:     1    5   2.9      5      29
Waiting:        0    5   2.9      4      29
Total:          2   10   4.6     10      42

Percentage of the requests served within a certain time (ms)
  50%     10
  66%     12
  75%     13
  80%     14
  90%     16
  95%     19
  98%     23
  99%     25
 100%     42 (longest request)
