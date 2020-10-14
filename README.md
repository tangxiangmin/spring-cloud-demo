

SpringCloud学习
==

相关整理
* [SpringCloud之项目搭建与服务注册](https://www.shymean.com/article/SpringCloud之项目搭建与服务注册)

## 逻辑分层
* Bean，JavaBean可以理解为某段JSON的Java类，主要包括字段定义、
* DAO层主要是做数据持久层的工作，数据库设计的表与DAO层之间一一对应，DAO类需要实现增删查改等库的通用方法
* Service层主要负责业务模块的逻辑设计，需要操作已定义的单个或多个DAO类来封装业务逻辑，比如生成订单，需要在Service提供的接口中检查库存、检查用户、插入订单记录等逻辑
* Controller层负责业务模块流程，对外主要表现为暴露页面URL或HTTP接口，其中调用Service层来处理特定URL的业务逻辑，然后返回JSON数据或View视图

## Controller层

Controller层负责业务模块流程，对外主要表现为暴露页面URL或HTTP接口，其中调用Service层来处理特定URL的业务逻辑，然后返回JSON数据或View视图

## 几种类型的对象
阿里巴巴Java开发手册中的DO、DTO、BO、AO、VO、POJO定义，

分层领域模型规约：
* DO（ Data Object）：与数据库表结构一一对应，通过DAO层向上传输数据源对象。
* DTO（ Data Transfer Object）：数据传输对象，Service或Manager向外传输的对象。
* BO（ Business Object）：业务对象。 由Service层输出的封装业务逻辑的对象。
* AO（ Application Object）：应用对象。 在Web层与Service层之间抽象的复用对象模型，极为贴近展示层，复用度不高。
* VO（ View Object）：显示层对象，通常是Web向模板渲染引擎层传输的对象。
* POJO（ Plain Ordinary Java Object）：在本手册中， POJO专指只有setter/getter/toString的简单类，包括DO/DTO/BO/VO等。
* Query：数据查询对象，各层接收上层的查询请求。 注意超过2个参数的查询封装，禁止使用Map类来传输。


领域模型命名规约：
* 数据对象：xxxDO，xxx即为数据表名。
* 数据传输对象：xxxDTO，xxx为业务领域相关的名称。
* 展示对象：xxxVO，xxx一般为网页名称。
* POJO是DO/DTO/BO/VO的统称，禁止命名成xxxPOJO。

## mybatis

开启下划线转驼峰需要单独在配置文件中进行声明
```yml
mybatis:
  mapper-locations: classpath:dao/*.xml  #配置映射文件
  type-aliases-package: com.example.test.bean #配置实体类
  configuration:
    map-underscore-to-camel-case: true # 下划线转驼峰
```

## lombok

参考[Java开发中用到的，lombok是什么？](https://www.zhihu.com/question/42348457)

lombok是一个工具库，通过注解的方式消除Java代码的冗长，尤其是POJO对象，一种比较方便的用处是快速格式化请求体的json参数

首先定义dto对象
```java
import lombok.Data;

// 使用@data注解，无需再实现set、get等方法
@Data
public class MessageDto implements Serializable {
    private int pid;
    private int userId;
    private String content;
}
```

然后在控制器中通过`@AllArgsConstructor`注解，直接将RequestBody通过dto对象接收并初始化
```java

import lombok.AllArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/message_board/v1")
@AllArgsConstructor
public class MessageBoardController {
    @Autowired
    MessageService messageService;

    @PostMapping("/submit")
    public ResponseBean<Boolean> submitMessage(@RequestBody MessageDto dto){
        MessageBean bean = new MessageBean();
        BeanUtils.copyProperties(dto, bean);
        return new ResponseBean<>(messageService.insert(bean) > 0);
    }
}

```