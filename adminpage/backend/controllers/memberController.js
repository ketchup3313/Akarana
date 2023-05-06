/**
 * member query page
 */
const db = require('../config/database');

//查询member info
exports.listInfo = (req, res) =>{
    //获取前端参数id, 根据id值顺序传递数据到前端
    let {id} = req.query;

    //查询member列表的sql,传入id值，按照id顺序排列
    // const memberSearchSql = 'SELECT * FROM member WHERE id=? ORDER BY id';
    const memberSearchSql = 'SELECT * FROM member ORDER BY id';
    //查询member总数的sql
    const totalSql = 'SELECT COUNT(*) AS TOTAL FROM member';

    //第一次调用member query，查询总列表
    db.query(memberSearchSql, [id], (err, resList) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }

        //第二次调用member query，查询列表的总数量
        db.query(totalSql, (err, resTotal) =>{
            if (err) {
                return res.send({code: 1, message: err.message});
            }
            //返回给前端数据
            res.send({code: 0, data:{list: resList, total: resTotal[0].TOTAL}})
        })
    }
    )
}

//修改member info
exports.updateMemberInfoByID = (req, res) =>{
    //定义参数 列表中存在的列名
    let {firstName, lastName, phoneNumber, username, password, address, emailAddress, birthday, occupation, id} = req.query;
    let sql = 'UPDATE member SET ';
    let arr = [];
    //同时修改所有info
    if (firstName && lastName && phoneNumber && username && password && address && emailAddress && birthday && occupation) {
        sql = sql + 'firstName=?, lastName=?, phoneNumber=?, username=?, password=?, address=?, emailAddress=?, birthday=?, occupation=? WHERE id=?';
        arr = [firstName, lastName, phoneNumber, username, password, address, emailAddress, birthday, occupation, Number(id)];
    }else if (firstName) {
        //单独修改first name
        sql = sql + 'firstName=? WHERE id=?';
        arr = [firstName, Number(id)];
    }else if (lastName) {
        //单独修改last name
        sql = sql + 'lastName=? WHERE id=?';
        arr = [lastName, Number(id)];
    }else if (phoneNumber) {
        //单独修改phone number
        sql = sql + 'phoneNumber=? WHERE id=?';
        arr = [phoneNumber, Number(id)];
    }else if (username) {
        //单独修改username
        sql = sql + 'username=? WHERE id=?';
        arr = [username, Number(id)];
    }else if (password) {
        //单独修改password
        sql = sql + 'password=? WHERE id=?';
        arr = [password, Number(id)];
    }else if (address) {
        //单独修改address
        sql = sql + 'address=? WHERE id=?';
        arr = [address, Number(id)];
    }else if (emailAddress) {
        //单独修改email address
        sql = sql + 'emailAddress=? WHERE id=?';
        arr = [emailAddress, Number(id)];
    }else if (birthday) {
        //单独修改birthday
        sql = sql + 'birthday=? WHERE id=?';
        arr = [birthday, Number(id)];
    }else if (occupation) {
        //单独修改occupation
        sql = sql + 'occupation=? WHERE id=?';
        arr = [occupation, Number(id)];
    }
    //传入update的方法
    db.query(sql, arr, (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }
        res.send({code: 0, message: 'Update Success!'});
    })
};

//删除member info
exports.deleteMemberInfoByID = (req, res) =>{
    let {id} = req.query;
    let sql = 'DELETE FROM member WHERE id=?';

    db.query(sql, id, (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }
        res.send({code: 0, message:'Delete Member Information Success!'});
    });
};

//查询admin info
exports.listAdminInfo = (req, res) =>{
        //获取前端参数id, 根据id值顺序传递数据到前端
        let {id} = req.query;

        //查询admin列表的sql,传入id值，按照id顺序排列
        const adminSearchSql = 'SELECT * FROM admin';

        //调用admin query，查询总列表
        db.query(adminSearchSql, [id], (err, resList) =>{
            if (err) {
                return res.send({code: 1, message: err.message});
            }
            //返回给前端数据
            res.send({code: 0, data:{list: resList}})
        }
        )
};

//修改admin info
exports.editAdminInfo = (req, res) =>{
    let {id, admin, password} = req.query;
    let sql = 'UPDATE admin SET ';
    let arr = []; 

    //同时修改admin和password
    if (admin && password) {
        sql = sql + 'admin=?, password=? WHERE id=?'
        arr = [admin, password, Number(id)]
    }else if (admin) {
        sql = sql + 'admin=? WHERE id=?';
        arr = [admin, Number(id)];
    }else if (password) {
        sql = sql + 'password WHERE id=?';
        arr = [password, Number(id)];
    }

    //执行sql语句
    db.query(sql, arr, (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }
        res.send({code: 0, message: 'Update Success!'});
    })
};

//查询rally info
exports.listRally = (req, res) =>{
    //获取前端参数id, 根据id值顺序传递数据到前端
    let {id} = req.query;

    //sql语句查询所有rally
    const rallySelectSql = 'SELECT * FROM rally';
    db.query(rallySelectSql, [id], (err, resRally) =>{
        if (err) {
            return res.send({code: 1, message: err.message})
        }
        //返回查询结果
        res.send({code: 0, data:{list: resRally}});
    })
}
//修改rally info
exports.updateRallyInfoByID = (req, res) =>{
    //定义rally中需要修改的参数
    let {id, mainTitle, subTitle, content, time, address} = req.query;
    let sql = 'UPDATE rally SET ';
    let arr = [];

    if (mainTitle && subTitle && content && time && address) {
        sql = sql + 'mainTitle=?, subTitle=?, content=?, time=?, address=? WHERE id=?';
        arr = [mainTitle, subTitle, content, time, address, Number(id)];
    } else if (mainTitle) {
        sql = sql + 'mainTitle=? WHERE id=?';
        arr = [mainTitle, Number(id)];
    } else if (subTitle) {
        sql = sql + 'subTitle=? WHERE id=?';
        arr = [subTitle, Number(id)];
    } else if (content) {
        sql = sql + 'content=? WHERE id=?';
        arr = [content, Number(id)];
    } else if (time) {
        sql = sql + 'time=? WHERE id=?';
        arr = [time, Number(id)];
    } else if (address) {
        sql = sql + 'address=? WHERE id=?';
        arr = [address, Number(id)];
    }

    //执行sql语句
    db.query(sql, arr, (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }
        res.send({code: 0, message: 'Update Success!'});
    })
}

//删除rally info
exports.deleteRallyInfoByID = (req, res) =>{
    let {id} = req.query;
    let sql = 'DELETE FROM rally WHERE id=?';

    db.query(sql, id, (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }
        res.send({code: 0, message:'Delete rally success!'});
    });
}

//设置rally status 为close
exports.closeRallyStatusByID =(req, res) =>{
    //获取参数id和status, 根据id值重新设置数据
    let {id, status} = req.query;

    //sql语句，将rally表中每个对应id值的status列名的open设置为close
    const setupStatusSql = 'UPDATE rally SET status = "close" WHERE id =?';
    //执行语句，传入sql语句和参数
    db.query(setupStatusSql, [id, status], (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message})
        }
        //返回查询结果
        res.send({code: 0, message: 'Rally closed!'});
    })
}

//设置rally status 为close
exports.openRallyStatusByID =(req, res) =>{
    //获取参数id和status, 根据id值重新设置数据
    let {id, status} = req.query;

    //sql语句，将rally表中每个对应id值的status列名的open设置为close
    const setupStatusSql = 'UPDATE rally SET status = "open" WHERE id =?';
    //执行语句，传入sql语句和参数
    db.query(setupStatusSql, [id, status], (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message})
        }
        //返回查询结果
        res.send({code: 0, message: 'Rally opened!'});
    })
}