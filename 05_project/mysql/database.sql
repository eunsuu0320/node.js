use dev;

drop table if exists `t_category`;
drop table if exists `t_image`;
drop table if exists `t_product`;
drop table if exists `t_seller`;
drop table if exists `t_user`;

CREATE TABLE `t_category` (
`id` int(11) unsigned NOT NULL auto_increment,
`category1` varchar(100) not null default '',
`category2` varchar(100) not null default '',
`category3` varchar(100) default '',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `t_image` (
`id` int(11) unsigned not null auto_increment,
`product_id` int(11) unsigned not null,
`type` int(1) not null default 1 comment '1-썸네일, 2-제품이미지, 3-제품설명이미지',
`path` varchar(150) not null default '',
primary key (`id`),
key `product_id` (`product_id`),
constraint `t_image_ibfk_1` foreign key (`product_id`) references `t_product` (`id`)
) engine=InnoDB DEFAULT CHARSET=utf8;

create table `t_product` (
`id` int(11) unsigned not null auto_increment,
`product_name` varchar(200) not null default '',
`product_price` int(11) not null default 0,
`delivery_price` int(11) not null default 0,
`add_delivery_price` int(11) not null default 0,
`tags` varchar(100) default null,
`outbound_days` int(2) not null default 5,
`seller_id` int(11) unsigned not null default 0,
`category_id` int(11) unsigned not null default 0,
`active_yn` enum('Y','N') NOT NULL DEFAULT 'Y',
`created_date` datetime not null default current_timestamp(),
primary key (`id`),
key `seller_id` (`seller_id`),
key `category_id` (`category_id`),
constraint `t_product_ibfk_1` foreign key (`seller_id`) references `t_seller` (`id`),
constraint `t_product_ibfk_2` foreign key (`category_id`) references `t_category` (`id`)
) engine=InnoDB default charset=utf8;

create table `t_seller` (
`id` int(11) unsigned not null auto_increment,
`name` varchar(100) not null default '',
`email` varchar(100) not null default '',
`phone` varchar(20) not null default '',
primary key (`id`)
) engine=InnoDB default charset=utf8;

create table `t_user` (
`email` varchar(50) not null default '',
`type` int(1) not null default 1 comment '1-buyer, 2-seller',
`nickname` varchar(50) default null,
primary key (`email`)
) engine=InnoDB default charset=utf8;

-- 상품(product), 카테고리(category), 이미지(image)
select *
from  t_product;

insert into t_seller (name, email, phone)
values ('seller01', 'seller01@email.com', '010-0000-0000');

select *
from t_seller;
select *
from  t_category;

insert into t_category (category1, category2, category3)
values ('컴퓨터', '주요부품', '메인보드');
insert into t_category (category1, category2, category3)
values ('컴퓨터', '주변기기', '마우스');
insert into t_category (category1, category2, category3)
values ('컴퓨터', '주변기기', '키보드');

insert into t_product (product_name, product_price, delivery_price, seller_id, category_id)
values ('lg 마우스', 15000, 3000, 1, 2);
insert into t_product (product_name, product_price, delivery_price, seller_id, category_id)
values ('로지텍 마우스', 18000, 3000, 1, 2);

select *
from  t_image;

insert into t_image (product_id, type, path)
values (2, 1, 'upload/2/thumnail.jpg');
insert into t_image (product_id, type, path)
values (3, 1, 'upload/3/thumnail.jpg');

-- 상품목록
select concat(c.category1, '/', c.category2, '/', c.category3) as category,
       p.id,
       p.product_name,
       p.delivery_price,
       i.*
from   t_product p join t_category c 
         on p.category_id = c.id
         join t_image i
         on p.id = i.product_id
         and i.type = 1
         where p.product_name = 'lg 마우스';