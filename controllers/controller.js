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

  static logout(req, res) {}

  // Menu
  static async menuList(req, res) {
    console.log(req.session);
    try {
      let menus = await Menu.findAll({
        include: Category,
      });

      res.render("menus", {
        menus,
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
    } catch (error) {
      res.send(error);
    }
  }

  static async postMenu(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static async getEditMenu(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static async postEditMenu(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteMenu(req, res) {
    try {
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
    } catch (error) {
      res.send(error);
    }
  }

  static async postOrder(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
