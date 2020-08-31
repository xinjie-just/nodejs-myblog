#!/bin/bash

# #!/bin/bash是指此脚本使用/bin/bash来解释执行。
# 先将 access.log 复制给以时间命名的访问日志，然后将 access.log 清空，等待新的访问日志进来。
cd '/Volumes/F(project)/project/learn-nodejs-myblog/blog-1/logs'
cp access.log $(date +%Y-%m-%d_%H-%M-%S).access.log
echo '' >access.log
