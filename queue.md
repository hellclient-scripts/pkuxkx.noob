# queue 命令队列

队列命令包括

* #do
* #to
* #afterbusy
* #wait

## 抄经

```
#to qf-sms||#do ask sengren about job
```
记住工号

```
#to ts-sjy||#do write jing||#afterbusy||#delay 2000||#to qf-sms||#do ask sengren about done
```
然后report 工号

## 做药

```
#to yzyp||ask ping yizhi about 工作||n||peiyao||#afterbusy||#delay 5000||s||give cheng yao to ping yizhi||#loop
```