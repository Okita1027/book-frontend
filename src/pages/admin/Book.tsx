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
  Select,
  DatePicker,
  InputNumber,
  Row,
  Col,
} from "antd";
import toast from "react-hot-toast";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { bookService } from "@/services";
import type {
  BookVO,
  EditBookDTO,
  RawBook,
  Publisher,
  Author,
  Category,
  BaseRequestParams,
} from "@/types";
import dayjs from "dayjs";
import "./Book.scss";

// ProTable request 参数类型定义
interface BookRequestParams extends BaseRequestParams {
  title?: string;
  isbn?: string;
  authorName?: string;
  publisherName?: string;
}

const Book: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [form] = Form.useForm();
  const [editingBook, setEditingBook] = useState<RawBook | null>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [rawBooksCache, setRawBooksCache] = useState<RawBook[]>([]);

  // 表格列定义
  const columns: ProColumns<BookVO>[] = [
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
      title: "书名",
      dataIndex: "title",
      ellipsis: true,
      sorter: {
        compare: (a, b) => (a.title || "").localeCompare(b.title || ""),
        multiple: 2,
      },
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      width: 150,
      ellipsis: true,
      align: "center",
      sorter: {
        compare: (a, b) => (a.isbn || "").localeCompare(b.isbn || ""),
        multiple: 5,
      },
      fieldProps: {
        maxLength: 13,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (
            !/[0-9]/.test(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "Tab"
          ) {
            e.preventDefault();
          }
        },
      },
    },
    {
      title: "作者",
      dataIndex: "authorName",
      width: 120,
      ellipsis: true,
      sorter: {
        compare: (a, b) =>
          (a.authorName || "").localeCompare(b.authorName || ""),
        multiple: 6,
      },
    },
    {
      title: "出版社",
      dataIndex: "publisherName",
      width: 120,
      ellipsis: true,
      sorter: {
        compare: (a, b) =>
          (a.publisherName || "").localeCompare(b.publisherName || ""),
        multiple: 7,
      },
    },
    {
      title: "分类",
      dataIndex: "categoryNames",
      width: 150,
      search: false,
      sorter: {
        compare: (a, b) => {
          const aCategories = a.categoryNames?.join(", ") || "";
          const bCategories = b.categoryNames?.join(", ") || "";
          return aCategories.localeCompare(bCategories);
        },
        multiple: 8,
      },
      render: (_, record) => {
        return record.categoryNames?.join(", ") || "——";
      },
    },
    {
      title: "出版日期",
      dataIndex: "publishedDate",
      width: 120,
      search: false,
      align: "center",
      sorter: {
        compare: (a, b) => {
          const aDate = a.publishedDate
            ? new Date(a.publishedDate).getTime()
            : 0;
          const bDate = b.publishedDate
            ? new Date(b.publishedDate).getTime()
            : 0;
          return aDate - bDate;
        },
        multiple: 9,
      },
      render: (text) =>
        text ? dayjs(text as string).format("YYYY-MM-DD") : "——",
    },
    {
      title: "库存数",
      dataIndex: "stock",
      width: 80,
      search: false,
      align: "center",
      sorter: {
        compare: (a, b) => a.stock - b.stock,
        multiple: 3,
      },
    },
    {
      title: "可借数",
      dataIndex: "available",
      width: 80,
      search: false,
      align: "center",
      sorter: {
        compare: (a, b) => a.available - b.available,
        multiple: 4,
      },
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
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确定要删除这本图书吗？"
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

  // 新增图书
  const handleAdd = () => {
    setEditingBook(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 编辑图书
  const handleEdit = (bookVO: BookVO) => {
    // 从缓存中查找对应的原始图书数据
    const rawBook = rawBooksCache.find((book) => book.id === bookVO.id);

    if (!rawBook) {
      toast.error("获取图书详细信息失败，请刷新页面重试");
      return;
    }

    setEditingBook(rawBook);

    // 将categoryDictionary转换为categoryIds数组
    const categoryIds = Object.keys(rawBook.categoryDictionary).map((id) =>
      parseInt(id)
    );

    form.setFieldsValue({
      title: rawBook.title,
      isbn: rawBook.isbn,
      publishedDate: rawBook.publishedDate
        ? dayjs(rawBook.publishedDate)
        : null,
      stock: rawBook.stock,
      available: rawBook.available,
      authorId: rawBook.authorId,
      publisherId: rawBook.publisherId,
      categoryIds: categoryIds,
    });
    setModalVisible(true);
  };

  // 批量删除处理
  const handleBatchDelete = async () => {
    try {
      await bookService.batchDelete(selectedRowKeys as number[]);
      toast.success(`批量删除成功，共删除 ${selectedRowKeys.length} 本图书`);
      setSelectedRowKeys([]);
      actionRef.current?.reload();
    } catch (error) {
      toast.error("批量删除失败" + error);
    }
  };

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
  };

  // 获取图书列表
  const fetchBooks = async (params: BookRequestParams) => {
    try {
      const rawData = await bookService.getRawBooks();

      // 缓存原始数据供编辑时使用
      setRawBooksCache(rawData);

      // 从RawBooks数据中提取下拉选项数据
      extractSelectOptionsFromRawBooks(rawData);

      // 将 RawBook 数据转换为 BookVO 格式用于表格显示
      const data: BookVO[] = rawData.map((book) => ({
        id: book.id,
        title: book.title,
        isbn: book.isbn,
        publishedDate: book.publishedDate,
        stock: book.stock,
        available: book.available,
        authorName: book.authorName,
        publisherName: book.publisherName,
        categoryNames: Object.values(book.categoryDictionary),
      }));

      // 根据搜索条件过滤数据
      let filteredData = data;
      if (params.title) {
        filteredData = filteredData.filter((item: BookVO) =>
          item.title?.toLowerCase().includes(params.title!.toLowerCase())
        );
      }
      if (params.isbn) {
        filteredData = filteredData.filter((item: BookVO) =>
          item.isbn?.toLowerCase().includes(params.isbn!.toLowerCase())
        );
      }
      if (params.authorName) {
        filteredData = filteredData.filter((item: BookVO) =>
          item.authorName
            ?.toLowerCase()
            .includes(params.authorName!.toLowerCase())
        );
      }
      if (params.publisherName) {
        filteredData = filteredData.filter((item: BookVO) =>
          item.publisherName
            ?.toLowerCase()
            .includes(params.publisherName!.toLowerCase())
        );
      }

      return {
        data: filteredData,
        success: true,
        total: filteredData.length,
      };
    } catch (error) {
      toast.error("获取图书列表失败" + error);
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };

  // 删除图书
  const handleDelete = async (id: number) => {
    try {
      await bookService.delete(id);
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

      const bookData: EditBookDTO = {
        title: values.title,
        isbn: values.isbn,
        publishedDate: values.publishedDate
          ? values.publishedDate.format("YYYY-MM-DD")
          : undefined,
        stock: values.stock,
        available: values.available,
        authorId: values.authorId,
        publisherId: values.publisherId,
        categoryIds: values.categoryIds || [],
      };

      if (editingBook) {
        // 编辑
        await bookService.update(editingBook.id, bookData);
        toast.success("更新成功");
      } else {
        // 新增
        await bookService.add(bookData);
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
        toast.error(editingBook ? "更新失败" : "创建失败" + error);
      }
    }
  };

  // 从RawBooks数据中提取下拉选项数据
  const extractSelectOptionsFromRawBooks = (rawBooks: RawBook[]) => {
    // 提取作者数据
    const authorsMap = new Map<number, Author>();
    rawBooks.forEach((book) => {
      if (!authorsMap.has(book.authorId)) {
        authorsMap.set(book.authorId, {
          id: book.authorId,
          name: book.authorName,
          createdTime: "",
          updatedTime: "",
        });
      }
    });

    // 提取出版社数据
    const publishersMap = new Map<number, Publisher>();
    rawBooks.forEach((book) => {
      if (!publishersMap.has(book.publisherId)) {
        publishersMap.set(book.publisherId, {
          id: book.publisherId,
          name: book.publisherName,
          createdTime: "",
          updatedTime: "",
        });
      }
    });

    // 提取分类数据
    const categoriesMap = new Map<number, Category>();
    rawBooks.forEach((book) => {
      Object.entries(book.categoryDictionary).forEach(([id, name]) => {
        const categoryId = parseInt(id);
        if (!categoriesMap.has(categoryId)) {
          categoriesMap.set(categoryId, {
            id: categoryId,
            name: name,
            createdTime: "",
            updatedTime: "",
          });
        }
      });
    });

    setAuthors(Array.from(authorsMap.values()));
    setPublishers(Array.from(publishersMap.values()));
    setCategories(Array.from(categoriesMap.values()));
  };

  return (
    <div className="book-management">
      <ProTable<BookVO>
        headerTitle="图书管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 50,
          span: { xs: 24, sm: 12, md: 8, lg: 6, xl: 6, xxl: 6 },
        }}
        rowSelection={rowSelection}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            新增图书
          </Button>,
          selectedRowKeys.length > 0 && (
            <Popconfirm
              key="batchDelete"
              title={`确定要删除选中的 ${selectedRowKeys.length} 本图书吗？`}
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
        request={fetchBooks}
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
        title={editingBook ? "编辑图书" : "新增图书"}
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="书名"
                rules={[{ required: true, message: "请输入书名" }]}
              >
                <Input placeholder="请输入书名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="isbn"
                label="ISBN"
                rules={[
                  { required: true, message: "请输入ISBN" },
                  {
                    pattern: /^[0-9]{1,13}$/,
                    message: "ISBN只能包含数字，最多13位",
                  },
                ]}
              >
                <Input
                  placeholder="请输入ISBN"
                  maxLength={13}
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="authorId"
                label="作者"
                rules={[{ required: true, message: "请选择作者" }]}
              >
                <Select
                  placeholder="请选择作者"
                  showSearch
                  // 在 React 中，组件的子元素统一称为 children
                  optionFilterProp="children"
                >
                  {authors.map((author) => (
                    <Select.Option key={author.id} value={author.id}>
                      {author.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="publisherId"
                label="出版社"
                rules={[{ required: true, message: "请选择出版社" }]}
              >
                <Select
                  placeholder="请选择出版社"
                  showSearch
                  optionFilterProp="children"
                >
                  {publishers.map((publisher) => (
                    <Select.Option key={publisher.id} value={publisher.id}>
                      {publisher.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="categoryIds" label="分类">
                <Select
                  mode="multiple"
                  placeholder="请选择分类"
                  showSearch
                  optionFilterProp="children"
                >
                  {categories.map((category) => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="publishedDate"
                label="出版日期"
                rules={[{ required: true, message: "请选择出版日期" }]}
              >
                <DatePicker
                  placeholder="请选择出版日期"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="stock"
                label="库存数量"
                rules={[
                  { type: "number", min: 0, message: "库存数量不能小于0" },
                ]}
                // dependencies={["available"]}
              >
                <InputNumber
                  placeholder="请输入库存数量"
                  style={{ width: "100%" }}
                  min={0}
                  defaultValue={0}
                  // onChange={() => {
                  //   // 当库存数量变化时，重新验证可借数量
                  //   form.validateFields(["available"]);
                  // }}
                />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item
                name="available"
                label="可借数量"
              >
                <InputNumber
                  placeholder="请输入可借数量"
                  style={{ width: "100%" }}
                  disabled
                />
              </Form.Item>
            </Col> */}
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Book;
