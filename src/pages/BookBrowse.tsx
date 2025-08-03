// 前台图书阅览系统主页
import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import {
  BookOutlined,
  CalendarOutlined,
  HomeOutlined,
  ReloadOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import type { BookSearchParams } from "@/services";
import { bookService, categoryService, publisherService } from "@/services";
import type { BookVO } from "@/types";
import './BookBrowse.scss';

const { Title, Text } = Typography;

/**
 * 前台图书阅览系统主页
 * 提供图书搜索和浏览功能
 */
const BookBrowse: React.FC = () => {
  // 搜索表单状态（用户输入）
  const [searchForm, setSearchForm] = useState({
    title: "",
    isbn: "",
    authorName: "",
    categoryId: undefined as number | undefined,
    publisherId: undefined as number | undefined,
    publishedDateBegin: "",
    publishedDateEnd: "",
  });

  // 实际搜索参数（触发查询）
  const [searchParams, setSearchParams] = useState<BookSearchParams>({});

  // 获取图书数据
  const { data: books = [], isLoading } = useQuery<BookVO[]>({
    queryKey: ["books", searchParams],
    queryFn: () => bookService.search(searchParams),
  });

  // 获取类别数据
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
  });

  // 获取出版社数据
  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: () => publisherService.getAll(),
  });

  // 执行搜索
  const handleSearch = () => {
    // 过滤掉空值，只传递有值的参数
    const params: BookSearchParams = {};
    if (searchForm.title?.trim()) params.title = searchForm.title.trim();
    if (searchForm.isbn?.trim()) params.isbn = searchForm.isbn.trim();
    if (searchForm.authorName?.trim())
      params.authorName = searchForm.authorName.trim();

    // 根据选择的ID查找对应的名称
    if (searchForm.categoryId) {
      const category = categories.find((c) => c.id === searchForm.categoryId);
      if (category) params.categoryName = category.name;
    }
    if (searchForm.publisherId) {
      const publisher = publishers.find((p) => p.id === searchForm.publisherId);
      if (publisher) params.publisherName = publisher.name;
    }

    if (searchForm.publishedDateBegin?.trim())
      params.publishedDateBegin = searchForm.publishedDateBegin.trim();
    if (searchForm.publishedDateEnd?.trim())
      params.publishedDateEnd = searchForm.publishedDateEnd.trim();

    setSearchParams(params);
  };

  // 重置搜索
  const handleReset = () => {
    setSearchForm({
      title: "",
      isbn: "",
      authorName: "",
      categoryId: undefined,
      publisherId: undefined,
      publishedDateBegin: "",
      publishedDateEnd: "",
    });
    setSearchParams({});
  };

  return (
    <div className="book-browse">
      {/* 页面标题 */}
      <div className="book-browse-header">
        <Title level={1} className="title">
          <BookOutlined /> 图书阅览系统
        </Title>
        <Text type="secondary" className="subtitle">
          发现知识的海洋，探索阅读的乐趣
        </Text>
      </div>

      {/* 搜索区域 */}
      <Card className="book-browse-search">
        <div className="search-body">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="search-label">
              <Text strong>图书名称</Text>
            </div>
            <Input
              placeholder="请输入图书名称"
              allowClear
              size="large"
              value={searchForm.title}
              onChange={(e) =>
                setSearchForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className="search-input"
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="search-label">
              <Text strong>作者</Text>
            </div>
            <Input
              placeholder="请输入作者名称"
              allowClear
              size="large"
              value={searchForm.authorName}
              onChange={(e) =>
                setSearchForm((prev) => ({
                  ...prev,
                  authorName: e.target.value,
                }))
              }
              className="search-input"
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="search-label">
              <Text strong>ISBN</Text>
            </div>
            <Input
              placeholder="请输入ISBN"
              allowClear
              size="large"
              value={searchForm.isbn}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // 只保留数字
                setSearchForm((prev) => ({ ...prev, isbn: value }));
              }}
              className="search-input"
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="search-label">
              <Text strong>类别</Text>
            </div>
            <Select
              placeholder="请选择类别"
              allowClear
              size="large"
              value={searchForm.categoryId}
              onChange={(value) =>
                setSearchForm((prev) => ({ ...prev, categoryId: value }))
              }
              className="search-select"
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="search-label">
              <Text strong>出版社</Text>
            </div>
            <Select
              placeholder="请选择出版社"
              allowClear
              size="large"
              value={searchForm.publisherId}
              onChange={(value) =>
                setSearchForm((prev) => ({ ...prev, publisherId: value }))
              }
              className="search-select"
              options={publishers.map((publisher) => ({
                label: publisher.name,
                value: publisher.id,
              }))}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="search-label">
              <Text strong>出版日期开始</Text>
            </div>
            <DatePicker
              placeholder="请选择开始日期"
              allowClear
              size="large"
              value={
                searchForm.publishedDateBegin
                  ? dayjs(searchForm.publishedDateBegin)
                  : null
              }
              onChange={(date) =>
                setSearchForm((prev) => ({
                  ...prev,
                  publishedDateBegin: date ? date.format("YYYY-MM-DD") : "",
                }))
              }
              className="search-datepicker"
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="search-label">
              <Text strong>出版日期结束</Text>
            </div>
            <DatePicker
              placeholder="请选择结束日期"
              allowClear
              size="large"
              value={
                searchForm.publishedDateEnd
                  ? dayjs(searchForm.publishedDateEnd)
                  : null
              }
              onChange={(date) =>
                setSearchForm((prev) => ({
                  ...prev,
                  publishedDateEnd: date ? date.format("YYYY-MM-DD") : "",
                }))
              }
              className="search-datepicker"
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="search-label">
              <Text strong>操作</Text>
            </div>
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                size="large"
                onClick={handleSearch}
                className="search-button"
              >
                搜索
              </Button>
              <Button
                icon={<ReloadOutlined />}
                size="large"
                onClick={handleReset}
                className="search-button"
              >
                重置
              </Button>
            </Space>
          </Col>
        </Row>
        </div>
      </Card>

      {/* 图书展示区域 */}
      <Card
        title={`图书列表 (共 ${books.length} 本)`}
        className="book-browse-list"
      >
        <div className="list-body">
          <Spin spinning={isLoading}>
            {books.length === 0 ? (
              <Empty description="暂无图书数据" className="empty-state" />
            ) : (
            <Row gutter={[16, 16]}>
              {books.map((book) => (
                <Col xs={24} sm={12} md={8} lg={6} key={book.id}>
                  <Card
                    hoverable
                    className="book-browse-card"
                  >
                    <div className="card-body">
                      <Title
                        level={5}
                        ellipsis={{ rows: 2 }}
                        className="card-title"
                      >
                        {book.title}
                      </Title>
                      <Text
                        type="secondary"
                        className="card-info"
                      >
                        <UserOutlined /> {book.authorName || "未知作者"}
                      </Text>
                      <Text
                        type="secondary"
                        className="card-info"
                      >
                        <HomeOutlined /> {book.publisherName || "未知出版社"}
                      </Text>
                      <Text
                        type="secondary"
                        className="card-date"
                      >
                        <CalendarOutlined />{" "}
                        {book.publishedDate
                          ? dayjs(book.publishedDate).format("YYYY-MM-DD")
                          : "未知日期"}
                      </Text>
                      <div className="card-tags">
                        {book.categoryNames?.map((categoryName, index) => (
                          <Tag key={index} color="blue">
                            {categoryName}
                          </Tag>
                        )) || <Tag color="blue">未分类</Tag>}
                        <Tag color={book.available > 0 ? "green" : "red"}>
                          可借: {book.available}/{book.stock}
                        </Tag>
                      </div>
                      <Text type="secondary" className="card-isbn">
                        ISBN: {book.isbn || "暂无"}
                      </Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            )}
          </Spin>
        </div>
      </Card>
    </div>
  );
};

export default BookBrowse;
