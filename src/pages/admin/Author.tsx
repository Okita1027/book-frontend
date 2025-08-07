import { authorService } from "@/services";
import type { Author, BaseRequestParams } from "@/types";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  type ActionType,
  type ProColumns,
  ProTable,
} from "@ant-design/pro-components";
import { Button, Form, Input, Modal, Popconfirm } from "antd";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
const { useForm } = Form;

// ProTable request 参数类型声明
interface AuthorRequestParams extends BaseRequestParams {
  name?: string;
}

const AuthorManagement: React.FC = () => {
  const actionRef = useRef<ActionType>(null); // 表格操作引用
  const [form] = useForm(); // 模态对话框中的表单数据
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(); // 新增/编辑状态
  const [modalVisible, setModalVisible] = useState(false); // 模态对话框的显示状态
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // 选中行的ID
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRows, setSelectedRows] = useState<Author[]>([]); // 选中行的完整数据

  // 表格列定义
  const columns: ProColumns<Author>[] = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      order: 1,
      search: false,
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 1,
      },
      render: (text) => (
        <span className="text-body font-mono">{text ?? ""}</span>
      ),
    },
    {
      title: "作者姓名",
      dataIndex: "name",
      ellipsis: true,
      order: 2,
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 2,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "请输入作者姓名",
          },
        ],
      },
      render: (text) => (
        <span className="text-body font-medium">
          {text ?? ""}
        </span>
      ),
    },
    {
      title: "作者简介",
      dataIndex: "biography",
      ellipsis: true,
      search: false,
      width: 300,
      render: (text) => (
        <span className="text-body text-gray-600">{text ?? "暂无简介"}</span>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
      valueType: "dateTime",
      align: "center",
      search: false,
      width: 180,
      order: 3,
      sorter: {
        compare: (a, b) =>
          new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime(),
        multiple: 3,
      },
      render: (text) => (
        <span className="text-muted">{text ?? ""}</span>
      ),
    },
    {
      title: "更新时间",
      dataIndex: "updatedTime",
      valueType: "dateTime",
      align: "center",
      search: false,
      width: 180,
      order: 4,
      sorter: {
        compare: (a, b) =>
          new Date(b.updatedTime).getTime() - new Date(a.updatedTime).getTime(),
        multiple: 4,
      },
      render: (text) => (
        <span className="text-muted">{text ?? ""}</span>
      ),
    },
    {
      title: "操作",
      valueType: "option",
      width: 150,
      align: "center",
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
          className="text-blue-600 hover:text-blue-800"
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确定要删除这个作者吗？"
          onConfirm={() => handleDelete(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button
            type="link"
            size="small"
            danger={true}
            icon={<DeleteOutlined />}
            className="text-red-600 hover:text-red-800"
          >
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  // 批量删除处理
  const handleBatchDelete = async () => {
    try {
      await authorService.batchDelete(selectedRowKeys as number[]);
      toast.success(`批量删除成功，共删除 ${selectedRowKeys.length} 个作者`);
      setSelectedRowKeys([]);
      setSelectedRows([]);
      actionRef.current?.reload();
    } catch (error) {
      toast.error("批量删除失败: " + error);
    }
  };

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[], rows: Author[]) => {
      setSelectedRowKeys(keys);
      setSelectedRows(rows);
    },
  };

  // 获取作者列表
  const fetchAuthors = async (params: AuthorRequestParams) => {
    try {
      const data = await authorService.getAll();

      // 根据搜索条件过滤数据
      let filteredData = data;
      if (params.name) {
        filteredData = data.filter((item: Author) =>
          item.name.toLowerCase().includes(params.name!.toLowerCase())
        );
      }

      return {
        data: filteredData,
        success: true,
        total: filteredData.length,
      };
    } catch (error) {
      toast.error("获取作者列表失败: " + error);
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };

  // 处理新增
  const handleAdd = () => {
    setEditingAuthor(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 处理编辑
  const handleEdit = (record: Author) => {
    setEditingAuthor(record);
    form.setFieldsValue({
      name: record.name,
      biography: record.biography,
    });
    setModalVisible(true);
  };

  // 处理删除
  const handleDelete = async (id: number) => {
    try {
      await authorService.delete(id);
      toast.success("删除成功");
      actionRef.current?.reload();
    } catch (error) {
      toast.error("删除失败: " + error);
    }
  };

  // 处理保存
  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (editingAuthor) {
        // 编辑
        await authorService.update(editingAuthor.id, values);
        toast.success("更新成功");
      } else {
        // 新增
        await authorService.create(values);
        toast.success("创建成功");
      }

      setModalVisible(false);
      actionRef.current?.reload();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Ant Design 表单错误
      if (error.errorFields) {
        const msg = error.errorFields[0].errors[0];
        toast.error(editingAuthor ? "更新失败: " + msg : "创建失败: " + msg);
      }
      // 普通错误
      else if (error.message) {
        toast.error(
          editingAuthor
            ? "更新失败: " + error.message
            : "创建失败: " + error.message
        );
      } else {
        toast.error(editingAuthor ? "更新失败" : "创建失败");
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <ProTable<Author>
          headerTitle={
            <span className="text-title flex-start space-x-2">作者管理</span>
          }
          actionRef={actionRef}
          rowKey="id"
          rowSelection={rowSelection}
          search={{
            labelWidth: "auto",
            span: 6,
            collapsed: false,
            collapseRender: false,
            searchText: "搜索",
            resetText: "重置",
          }}
          toolBarRender={() => [
            <Button
              key="add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              className="btn-primary flex-center space-x-2"
            >
              新增作者
            </Button>,
            selectedRowKeys.length > 0 && (
              <Popconfirm
                key="batchDelete"
                title={`确定要删除选中的 ${selectedRowKeys.length} 个作者吗？`}
                onConfirm={handleBatchDelete}
                okText="确定"
                cancelText="取消"
              >
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  className="btn-danger flex-center space-x-2"
                >
                  <span>批量删除 ({selectedRowKeys.length})</span>
                </Button>
              </Popconfirm>
            ),
          ]}
          request={fetchAuthors}
          columns={columns}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => (
              <span className="text-muted">
                第 {range[0]}-{range[1]} 条，共 {total} 条
              </span>
            ),
          }}
          options={{
            reload: true,
            density: true,
            fullScreen: true,
            setting: true,
          }}
          className="rounded-lg overflow-hidden"
        />
      </div>

      {/* 模态对话框：用于进行数据编辑 */}
      <Modal
        title={
          <span className="text-subtitle flex-start space-x-2">
            <span>{editingAuthor ? "✏️" : "➕"}</span>
            <span>{editingAuthor ? "编辑作者" : "新增作者"}</span>
          </span>
        }
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        width={600}
        okText="保存"
        cancelText="取消"
        className="rounded-lg"
      >
        <div className="space-y-4 pt-4">
          <Form form={form} layout="vertical" className="space-y-4">
            <Form.Item
              name="name"
              label={<span className="form-label">作者姓名</span>}
              rules={[
                { required: true, message: "请输入作者姓名" },
                { max: 50, message: "作者姓名不能超过50个字符" },
              ]}
            >
              <Input placeholder="请输入作者姓名" className="form-input" />
            </Form.Item>

            <Form.Item
              name="biography"
              label={<span className="form-label">作者简介</span>}
              rules={[{ max: 500, message: "作者简介不能超过500个字符" }]}
            >
              <Input.TextArea
                placeholder="请输入作者简介（可选）"
                rows={4}
                className="form-textarea"
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AuthorManagement;
