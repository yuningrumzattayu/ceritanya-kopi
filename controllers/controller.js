const {
  User,
  MembershipCard,
  Category,
  Menu,
  Order,
  OrderDetail,
} = require("../models");

class Controller {
  // login register
  static landingpage(req, res) {
    res.render("landing");
  }

  static registerForm(req, res) {
    res.render("register");
  }

  static async postRegister(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static loginForm(req, res) {
    res.render("login");
  }

  static async postLogin(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }

  static logout(req, res) {}

  // Menu
  static async menuList(req, res) {
    try {
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
