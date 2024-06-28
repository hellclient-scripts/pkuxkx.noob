# 任务系统

pkuxkx.noob的任务系统核心是 任务(模块) 和 任务列表(列表)

任务模块 一般包含 任务ID 和任务参数

可以在助理按钮的任务 按钮中查看列表和说明

实际使用时可以用#quest QUESTID QUESTARG 执行一次，或者#quests QUESTID1 QUESTARG1||QUESTID2 QUESTARG2的形式循环执行

任务列表指 quests,quest2,quest3三个变量，分别用于#start,#start2,#start3指令启动，等同于#quests指令

在quests变量中，每行一个任务，可以写出很复杂的任务列表。

执行顺序是从上向下，执行第一个可以执行的任务。如果执行任务时失败，会执行下一个。

其中可以加入条件。条件在>>之前,由逗号分割多个参数，可以在最前方加!表示not操作。比如
```
!jobred 17,fullmeok>>syq reborn
```
代表在jobid 17的任务不是红色，而且有fullme的情况才做宋远桥，而且带reborn参数执行。

如果条件不符合，或者任务本身在cd,可以执行下一条

比如
```
!jobred 17,fullmeok>>syq reborn
!jobred 16,fullmeok>>touxue
fullmeok>>syq reborn
fullmeok>>touxue
```

就是syq和touxue两个任务，优先做不红的。都不红的话，优先做宋远桥。

注意，任务有内置的cd系统，cd中会直接跳过


## fullmeok

在有效full事件内。可以追加参数，秒数，用于做推车之类长时间任务，或者天珠这种必须有足够的剩余fullme时间的/

## after

在指定时间之后，格式为""HHMM",比如"0800",经常与before一起使用。

## before

在指定时间之后，格式为""HHMM",比如"1500",经常与after一起使用。

## detail

这个参数比较复杂，一般用在plan变量内，用于在指定情况下执行不同操作，比如在不同任务下开关武道。

```
detail jxcf>#zhuliu biguan off
detail mrxj>#zhuliu biguan off
xiuxingdian 100000>#zhuliu biguan off
#zhuliu biguan on
#biguan abandon skills
```

## xiuxingdian

修行点是否超过某个值。一般与detail一起使用

## expmap

经验最大值，超过某个经验不做某个任务。比如接近400m时可以给纪晓芙加个判断

## gu

蛊的数量。一般与fanggu与bugu任务配合，实现自动喂/卖放蛊冲蛊术

## here

afk不在状态。

验证码超时或者手动afk会进入afk状态，可以手动通过#here指令或者here按钮离开afk状态。

用在需要开会开车等短时间无法摸鱼的场景下，临时关闭高打码需求的任务。

## joballok

给到的空格分割的job id都不在cd

```
joballok 10 11 12 13>>MYQUEST
```

预想中只有某地任务都不在cd时再切换区域，实际不太好用。

## jobred

参数为jobid

最后一次jq时，给定的任务id为红色

## menzhong

参数为数值

门忠超过指定数量。原设计为配合做门忠到一定数量

## never

永不，一般用于临时不做某个任务，但不想大概配置，需要做时再去掉

## pot

参数为数值

潜能超过指定数量。一般用于保留一定的潜能，留给双倍。。

## shaqi

杀气是否过高。一般用于和chanhui任务配合，不太常用

## turbo

在 超频状态下。

超频状态指点击超频按钮后选择的时间内。

可用于开双修炼。

开双时点一下超频2小时，只在这个时间内进行修炼