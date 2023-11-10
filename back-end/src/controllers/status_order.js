import StatusOrder from "../models/status_order";

export const list = async (req, res) => {
  try {
    const status_order = await StatusOrder.getAllStatusOrder();
    res.json(status_order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const showStatusOrderById = async (req, res) => {
  try {
    const status_order = await StatusOrder.getStatusOrderById(req.params.id);
    if (!status_order) {
      res.status(404).json({ error: "StatusOrder không tồn tại" });
    } else {
      res.json(status_order);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const create = async (req, res) => {
  try {
    const { name } = req.body;
    const status_orderId = await StatusOrder.createStatusOrder(name);
    res.json({ id: status_orderId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const update = async (req, res) => {
  try {
    const { id, name } = req.body;
    await StatusOrder.updateStatusOrder(id, name);
    res.json({ message: "StatusOrder updated thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteStatusOrder = async (req, res) => {
  try {
    await StatusOrder.deleteStatusOrder(req.params.id);
    res.json({ message: "Xóa status_order thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
