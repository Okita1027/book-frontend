import React, { useRef, useState } from "react";
import {
  type ActionType,
  type ProColumns,
  ProTable,
} from "@ant-design/pro-components";
import { Button, Form, Input, Modal, Popconfirm } from "antd";
import toast from "react-hot-toast";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { publisherService } from "@/services";
import type { Publisher } from "@/types";
import "./PublisherManagement.scss";

const PublisherManagement: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [form] = Form.useForm();
  const [editingPublisher, setEditingPublisher] = useState<Publisher | null>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<Publisher[]>([]);

  // 表格列定义
  const columns: ProColumns<Publisher>[] = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      order: 1,
      search: false,
      sorter: {
        multiple: 1, // 排序优先级,数字越小优先级越高
      },
      render: (text) => (text != null ? text : ""),
    },
    {
      title: "出版社名称",
      dataIndex: "name",
      ellipsis: true,
      order: 2,
      sorter: {
        multiple: 2,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "请输入出版社名称",
          },
        ],
      },
      render: (text) => (text != null ? text : ""),
    },
    {
      title: "图书数量",
      dataIndex: "books",
      hideInTable: true,
      search: false,
      /* render第一个参数代表字段值,第二个代表完整的行数据对象,第三个代表行索引;可以用_代表不使用该参数 */
      render: (_, record) => record.books?.length || 0,
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
      valueType: "dateTime",
      search: false,
      width: 180,
      order: 3,
      sorter: {
        compare: (a, b) =>
          new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime(),
        multiple: 3,
      },
      render: (text) => (text != null ? text : ""),
    },
    {
      title: "更新时间",
      dataIndex: "updatedTime",
      valueType: "dateTime",
      search: false,
      width: 180,
      order: 4,
      sorter: {
        compare: (a, b) =>
          new Date(b.updatedTime).getTime() - new Date(a.updatedTime).getTime(),
        multiple: 4,
      },
      render: (text) => (text != null ? text : ""),
    },
    {
      title: "操作",
      valueType: "option",
      width: 150,
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确定要删除这个出版社吗？"
          onConfirm={() => handleDelete(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  // 批量删除处理
  const handleBatchDelete = async () => {
    try {
      await publisherService.batchDelete(selectedRowKeys as number[]);
      toast.success(`批量删除成功，共删除 ${selectedRowKeys.length} 个出版社`);
      setSelectedRowKeys([]);
      setSelectedRows([]);
      actionRef.current?.reload();
    } catch (error) {
      toast.error("批量删除失败" + error);
    }
  };

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[], rows: Publisher[]) => {
      setSelectedRowKeys(keys);
      setSelectedRows(rows);
    },
  };

  // 获取出版社列表
  const fetchPublishers = async (params: any) => {
    try {
      const data = await publisherService.getAll();

      // 根据搜索条件过滤数据
      let filteredData = data;
      if (params.name) {
        filteredData = data.filter((item: Publisher) =>
          item.name.toLowerCase().includes(params.name.toLowerCase())
        );
      }

      return {
        data: filteredData,
        success: true,
        total: filteredData.length,
      };
    } catch (error) {
      toast.error("获取出版社列表失败" + error);
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };

  // 处理新增
  const handleAdd = () => {
    setEditingPublisher(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 处理编辑
  const handleEdit = (record: Publisher) => {
    setEditingPublisher(record);
    form.setFieldsValue({
      name: record.name,
    });
    setModalVisible(true);
  };

  // 删除出版社
  const handleDelete = async (id: number) => {
    try {
      await publisherService.delete(id);
      toast.success("删除成功");
      actionRef.current?.reload();
    } catch (error) {
      toast.error("删除失败" + error);
    }
  };

  // 处理保存
  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (editingPublisher) {
        // 编辑
        await publisherService.update(editingPublisher.id, values);
        toast.success("更新成功");
      } else {
        // 新增
        await publisherService.create(values);
        toast.success("创建成功");
      }

      setModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      toast.error(editingPublisher ? "更新失败" + error : "创建失败" + error);
    }
  };

  return (
    <div className="publisher-management">
      <ProTable<Publisher>
        headerTitle="出版社管理"
        actionRef={actionRef}
        rowKey="id"
        // 启用复选框
        rowSelection={rowSelection}
        // 自动生成搜索表单
        search={{
          labelWidth: "auto", // 标签宽度
          span: 6, // 每个搜索项占用的栅格数
          collapsed: false, // 是否默认收起
          collapseRender: false, // 是否显示收起按钮
          searchText: "搜索", // 搜索按钮文本
          resetText: "重置", // 重置按钮文本
        }}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            新增出版社
          </Button>,
          selectedRowKeys.length > 0 && (
            <Popconfirm
              key="batchDelete"
              title={`确定要删除选中的 ${selectedRowKeys.length} 个出版社吗？`}
              onConfirm={handleBatchDelete}
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary" danger icon={<DeleteOutlined />}>
                批量删除 ({selectedRowKeys.length})
              </Button>
            </Popconfirm>
          ),
        ]}
        request={fetchPublishers}
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

      <Modal
        title={editingPublisher ? "编辑出版社" : "新增出版社"}
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        width={600}
        destroyOnHidden={true}
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            name="name"
            label="出版社名称"
            rules={[
              { required: true, message: "请输入出版社名称" },
              { max: 100, message: "出版社名称不能超过100个字符" },
            ]}
          >
            <Input placeholder="请输入出版社名称" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PublisherManagement;
