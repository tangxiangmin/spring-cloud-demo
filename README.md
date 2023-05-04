

SpringCloud学习
==

相关整理
* [SpringCloud之项目搭建与服务注册](https://www.shymean.com/article/SpringCloud之项目搭建与服务注册)
* [SpringBoot + Spring Security 基本使用及个性化登录配置](https://blog.csdn.net/u013435893/article/details/79596628)

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

参考
* [Spring boot 中@RequestBody 获取JSON对象无效为空的问题](http://www.yangquanyao.com/2019/08/29/spring-boot-%E4%B8%ADrequestbody-%E8%8E%B7%E5%8F%96json%E5%AF%B9%E8%B1%A1%E6%97%A0%E6%95%88%E4%B8%BA%E7%A9%BA%E7%9A%84%E9%97%AE%E9%A2%98/)
* [Java开发中用到的，lombok是什么？](https://www.zhihu.com/question/42348457)

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

## Spring Security

首先添加依赖
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```
然后重启项目，访问一个url，默认情况下会跳转到 http://localhost:8080/login 页面，然后使用账号密码登录
* 账号，默认`user`
* 密码，在项目启动时的控制面板中可以找到`Using generated security password: xxxx`

登录成功之后就可以正常访问原本的url了，打开浏览器Application面板可以看见多了一个名字为`JSESSIONID`的cookie，删掉该值后需要重新登录

业务中一般需要接入自己的账号系统，需要继承`WebSecurityConfigurerAdapter`和`UserDetailsService`
```java
@Configuration
public class BrowerSecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin()                    //  定义当需要用户登录时候，转到的登录页面。
                .and()
                .authorizeRequests()        // 定义哪些URL需要被保护、哪些不需要被保护
                .anyRequest()               // 任何请求,登录后可以访问
                .authenticated();
    }
}
```

```java
@Component
public class MyUserDetailsService implements UserDetailsService {
    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO 根据用户名，查找到对应的密码，与权限

        System.out.println("loadUserByUsername");
        // 封装用户信息，并返回。参数分别是：用户名，密码，用户权限
        String password = passwordEncoder.encode("123456");
        User user = new User(username, password,
                AuthorityUtils.commaSeparatedStringToAuthorityList("admin"));
        return user;
    }
}
```
然后访问页面重新输入账号`admin`和密码`123456`就可以重新登录了。

上面是通过表单提交进行登录然后页面跳转的，在前后端分离的场景下，可能需要提供向前端提供AJAX接口，这种需求场景下，只需要在`BrowerSecurityConfig`
配置中添加自定义的`SimpleUrlAuthenticationSuccessHandler`和`AuthenticationFailureHandler`
```java
http.formLogin()                    //  定义当需要用户登录时候，转到的登录页面。
    .successHandler(authenticationSucessHandler) // 处理登录成功
    .failureHandler(authenticationFailureHandler) // 处理登录失败
    .and()
    .authorizeRequests()        // 定义哪些URL需要被保护、哪些不需要被保护
    .anyRequest()               // 任何请求,登录后可以访问
    .authenticated();
```
然后在对应的handler中处理鉴权和响应