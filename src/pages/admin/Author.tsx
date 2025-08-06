import React, { useRef, useState } from "react";
import {
  type ActionType,
  type ProColumns,
  ProTable,
} from "@ant-design/pro-components";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Col,
} from "antd";
const { useForm } = Form;
import toast from "react-hot-toast";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { authorService } from "@/services";
import type {
  Author,
  EditAuthorDTO,
  BaseRequestParams,
} from "@/types";
import dayjs from "dayjs";

// ProTable request 参数类型定义
interface AuthorRequestParams extends BaseRequestParams {
  name?: string;
}

const AuthorManagement: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [form] = useForm();
  const [editingAuthor, setEditingAuthor] = useState<Author | null>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // 表格列定义
  const columns: ProColumns<Author>[] = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      search: false,
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 1,
      },
    },
    {
      title: "作者姓名",
      dataIndex: "name",
      ellipsis: true,
      sorter: {
        compare: (a, b) => (a.name || "").localeCompare(b.name || ""),
        multiple: 2,
      },
    },
    {
      title: "简介",
      dataIndex: "biography",
      ellipsis: true,
      search: false,
      render: (text) => {
        if (!text) return "——";
        const biography = text as string;
        return biography.length > 50 ? `${biography.slice(0, 50)}...` : biography;
      },
    },
    {
      title: "作品数量",
      dataIndex: "books",
      width: 100,
      search: false,
      align: "center",
      render: (_, record) => {
        return record.books?.length || 0;
      },
      sorter: {
        compare: (a, b) => (a.books?.length || 0) - (b.books?.length || 0),
        multiple: 3,
      },
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
      width: 150,
      search: false,
      align: "center",
      sorter: {
        compare: (a, b) => {
          const aTime = a.createdTime ? new Date(a.createdTime).getTime() : 0;
          const bTime = b.createdTime ? new Date(b.createdTime).getTime() : 0;
          return aTime - bTime;
        },
        multiple: 4,
      },
      render: (text) =>
        text ? dayjs(text as string).format("YYYY-MM-DD HH:mm") : "——",
    },
    {
      title: "更新时间",
      dataIndex: "updatedTime",
      width: 150,
      search: false,
      align: "center",
      sorter: {
        compare: (a, b) => {
          const aTime = a.updatedTime ? new Date(a.updatedTime).getTime() : 0;
          const bTime = b.updatedTime ? new Date(b.updatedTime).getTime() : 0;
          return aTime - bTime;
        },
        multiple: 5,
      },
      render: (text) =>
        text ? dayjs(text as string).format("YYYY-MM-DD HH:mm") : "——",
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
            danger 
            icon={<DeleteOutlined />}
            className="text-red-600 hover:text-red-800"
          >
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  // 新增作者
  const handleAdd = () => {
    setEditingAuthor(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 编辑作者
  const handleEdit = (author: Author) => {
    setEditingAuthor(author);
    form.setFieldsValue({
      name: author.name,
      biography: author.biography || "",
    });
    setModalVisible(true);
  };

  // 批量删除处理
  const handleBatchDelete = async () => {
    try {
      await authorService.batchDelete(selectedRowKeys as number[]);
      toast.success(`批量删除成功，共删除 ${selectedRowKeys.length} 个作者`);
      setSelectedRowKeys([]);
      actionRef.current?.reload();
    } catch (error) {
      toast.error("批量删除失败: " + error);
    }
  };

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys);
    },
  };

  // 获取作者列表
  const fetchAuthors = async (params: AuthorRequestParams) => {
    try {
      const data = await authorService.getAll();

      // 根据搜索条件过滤数据
      let filteredData = data;
      if (params.name) {
        filteredData = filteredData.filter((item: Author) =>
          item.name?.toLowerCase().includes(params.name!.toLowerCase())
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

  // 删除作者
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

      const authorData: EditAuthorDTO = {
        name: values.name,
        biography: values.biography || null,
      };

      if (editingAuthor) {
        // 编辑
        await authorService.update(editingAuthor.id, authorData);
        toast.success("更新成功");
      } else {
        // 新增
        await authorService.create(authorData);
        toast.success("创建成功");
      }

      setModalVisible(false);
      actionRef.current?.reload();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // 检查是否有errorFields（Ant Design表单错误）
      if (error?.errorFields) {
        toast.error("请检查表单输入");
      } else {
        toast.error(editingAuthor ? "更新失败: " : "创建失败: " + error);
      }
    }
  };

  return (
    <div className="admin-container">
      <ProTable<Author>
        headerTitle="作者管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 80,
          span: { xs: 24, sm: 12, md: 8, lg: 6, xl: 6, xxl: 6 },
        }}
        rowSelection={rowSelection}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            className="btn-primary"
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
                className="btn-danger"
              >
                批量删除 ({selectedRowKeys.length})
              </Button>
            </Popconfirm>
          ),
        ]}
        request={fetchAuthors}
        columns={columns}
        // 分页
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        options={{
          reload: true, // 刷新
          density: true, // 密度调整
          fullScreen: true, // 全屏
          setting: true, // 列设置
        }}
      />

      {/*模态对话框：用于进行数据编辑*/}
      <Modal
        title={editingAuthor ? "编辑作者" : "新增作者"}
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        width={600}
        className="card-shadow"
      >
        <div className="form-container pt-4">
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="作者姓名"
                  rules={[
                    { required: true, message: "请输入作者姓名" },
                    { max: 100, message: "作者姓名不能超过100个字符" },
                  ]}
                >
                  <Input 
                    placeholder="请输入作者姓名" 
                    className="form-input"
                    maxLength={100}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="biography"
                  label="作者简介"
                  rules={[
                    { max: 1000, message: "作者简介不能超过1000个字符" },
                  ]}
                >
                  <Input.TextArea
                    placeholder="请输入作者简介（可选）"
                    className="form-textarea"
                    rows={4}
                    maxLength={1000}
                    showCount
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AuthorManagement;