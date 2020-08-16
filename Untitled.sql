-- show databases;

-- use myblog;

-- select * from blogs;

-- select id, title from blogs;

-- insert into blogs (title, content, createtime, author) values ("博客A", "内容A", 1597576854651, "zhangsan");
-- insert into blogs (title, content, createtime, author) values ("博客B", "内容B", 1597577006346, "lisi");
-- insert into blogs (title, content, createtime, author) values ("博客C", "内容C", 1597577006346, "lisi");

-- SET SQL_SAFE_UPDATES = 0;

-- update blogs set title="BB" where author="lisi";
-- update blogs set title="博客B" where author= "lisi";

-- delete from blogs where author = "lisi"
-- update blogs set status=0 where author = "zhangsan";

-- select * from blogs where status=0; 

select * from users;

-- insert into users (username, password, realname) values ("zhangshan", "123", "张三");

insert into users (username, password, realname) values ("lisi", "123", "李四");