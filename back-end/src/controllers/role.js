import Role from "../models/role";

export const list = async (req, res) => {
  try {
    const role = await Role.getAllRole();
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const showRoleById = async (req, res) => {
  try {
    const role = await Role.getRoleById(req.params.id);
    if (!role) {
      res.status(404).json({ error: "Role không tồn tại" });
    } else {
      res.json(role);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const create = async (req, res) => {
  try {
    const { name } = req.body;
    const roleId = await Role.createRole(name);
    res.json({ id: roleId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const update = async (req, res) => {
  try {
    const { id, name } = req.body;
    await Role.updateRole(id, name);
    res.json({ message: "Role updated thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRo = async (req, res) => {
  try {
    await Role.deleteRole(req.params.id);
    res.json({ message: "Xóa role thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
