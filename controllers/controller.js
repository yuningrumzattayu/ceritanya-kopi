const {
  User,
  MembershipCard,
  Category,
  Menu,
  Order,
  OrderDetail,
} = require("../models");
const bcrypt = require("bcryptjs");
const { formatRupiah } = require("../helpers/helper");
const { Op } = require('sequelize');

class Controller {
  // login register
  static async landingpage(req, res) {
    try {
      res.render("landing");
    } catch (error) {
      res.send(error);
    }
  }

  static async registerForm(req, res) {
    try {
      res.render("register", {
        errors: null,
      });
    } catch (error) {
      res.send(error);
    }
  }
  static async postRegister(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await User.create({
        name,
        email,
        password,
        role: "Customer",
      });

      await MembershipCard.create({
        UserId: user.id,
        cardNumber: "CC-" + String(user.id).padStart(4, "0"),
        level: "Bronze",
        points: 0,
      });

      res.redirect("/login");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((el) => el.message);
        res.render("register", {
          errors,
        });
      } else {
        res.send(error);
      }
    }
  }

  static loginForm(req, res) {
    res.render("login", {
      errors: null,
    });
  }

  static async postLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.render("login", {
          errors: ["Invalid Email / Password"],
        });
      }
      const isValid = bcrypt.compareSync(password, user.password);

      if (!isValid) {
        return res.render("login", {
          errors: ["Invalid Email / Password"],
        });
      }

      req.session.userId = user.id;
      req.session.role = user.role;
      req.session.name = user.name;

      res.redirect("/menus");
    } catch (error) {
      res.send(error);
    }
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.send(err);
      }

      res.redirect("/login");
    });
  }

  // Menu
  static async menuList(req, res) {
    try {
      const {search} = req.query

      let option = {
        include: Category
      }
      if(search){
        option.where = {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${search}%`
              }
            },
            {
              "$Category.name$": {
                [Op.iLike]: `%${search}%`
              }
            }
          ]
        }
      }
      let menus = await Menu.findAll(option);

      res.render("menus", {
        menus,
        search,
        formatRupiah,
        role: req.session.role,
        name: req.session.name,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async getMenu(req, res) {
    try {
      const categories = await Category.findAll();

      res.render("addMenu", {
        categories,
        errors: null,
        role: req.session.role,
        name: req.session.name,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async postMenu(req, res) {
    try {
      const { name, description, price, stock, imageUrl, CategoryId } =
        req.body;

      await Menu.create({
        name,
        description,
        price,
        stock,
        imageUrl,
        CategoryId,
      });

      res.redirect("/menus");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((el) => el.message);

        const categories = await Category.findAll();

        res.render("addMenu", {
          categories,
          errors,
          role: req.session.role,
          name: req.session.name,
        });
      } else {
        res.send(error);
      }
    }
  }

  static async getEditMenu(req, res) {
    try {
      const { id } = req.params;
      const menu = await Menu.findByPk(id);
      const categories = await Category.findAll();

      res.render("editMenu", {
        menu,
        categories,
        errors: null,
        role: req.session.role,
        name: req.session.name,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async postEditMenu(req, res) {
    const { id } = req.params;
    try {
      const menu = await Menu.findByPk(id);
      await menu.update(req.body);
      res.redirect("/menus");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const menu = await Menu.findByPk(id);
        const categories = await Category.findAll();

        const errors = error.errors.map((el) => el.message);

        res.render("editMenu", {
          menu,
          categories,
          errors,
          role: req.session.role,
          name: req.session.name,
        });
      } else {
        res.send(error);
      }
    }
  }

  static async deleteMenu(req, res) {
    try {
      const { id } = req.params;
      const menu = await Menu.findByPk(id);
      await menu.destroy();

      res.redirect("/menus");
    } catch (error) {
      res.send(error);
    }
  }

  // Order
  static async orderHistory(req, res) {
    try {

    } catch (error) {
      res.send(error);
    }
  }

  static async getOrder(req, res) {
    try {
      const { menuId } = req.params;
      const menu = await Menu.findByPk(menuId, {
        include: Category,
      });

      res.render("addOrder", {
        menu,
        errors: null,
        role: req.session.role,
        name: req.session.name,
        formatRupiah,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async postOrder(req, res) {
    try {
      const { menuId } = req.params;
      const { quantity } = req.body;

      const menu = await Menu.findByPk(menuId);
      let order = await Order.findOne({
        where: {
          UserId: req.session.userId,
          status: "Pending",
        },
      });

      if (!order) {
        order = await Order.create({
          date: new Date(),
          status: "Pending",
          totalPrice: 0,
          UserId: req.session.userId,
        });
      }

      const subtotal = menu.price * quantity;

      await OrderDetail.create({
        OrderId: order.id,
        MenuId: menu.id,
        quantity,
        subtotal,
      });

      const totalPrice = await OrderDetail.sum("subtotal", {
        where: {
          OrderId: order.id,
        },
      });

      await order.update({
        totalPrice,
      });

      await menu.update({
        stock: menu.stock - Number(quantity),
      });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
