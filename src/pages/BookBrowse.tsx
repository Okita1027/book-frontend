import { SearchDatePicker, SearchInput } from "@/components/form";
import type { BookSearchParams } from "@/services";
import { bookService } from "@/services";
import type { PaginationRequest } from "@/types";
import {
  BookOutlined,
  CalendarOutlined,
  HomeOutlined,
  ReloadOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  Empty,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./BookBrowse.scss";

const { Title, Text } = Typography;

/**
 * 前台图书阅览系统主页
 * 提供图书搜索和浏览功能
 */
const BookBrowse: React.FC = () => {
  // 各个搜索框中的值
  const title = useRef<string>("");
  const isbn = useRef<string>("");
  const authorName = useRef<string>("");
  const categoryName = useRef<string>("");
  const publisherName = useRef<string>("");
  const publishedDateBegin = useRef<string>("");
  const publishedDateEnd = useRef<string>("");

  // 实际搜索参数
  const [searchParams, setSearchParams] = useState<BookSearchParams>({});

  // 使用无限查询获取图书数据
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["books-infinite", searchParams],
      queryFn: ({ pageParam = 1 }) => {
        const paginationParams: PaginationRequest & BookSearchParams = {
          pageIndex: pageParam,
          pageSize: 12,
          ...searchParams,
        };
        return bookService.searchPaginated(paginationParams);
      },
      getNextPageParam: (lastPage) => {
        const { pageIndex, pageSize, total } = lastPage;
        const totalPages = Math.ceil(total / pageSize);
        return pageIndex < totalPages ? pageIndex + 1 : undefined;
      },
      initialPageParam: 1,
    });

  /**
   * 合并所有页面的图书数据
   * flatMap 是数组的一个方法，它结合了 map 和 flat 的功能：
   * 1. map阶段 ：对数组中的每个元素执行回调函数
   * 2. flat阶段 ：将结果扁平化（降维）
   */
  const books = data?.pages.flatMap((page) => page.items) ?? [];
  const totalBooks = data?.pages[0]?.total ?? 0;

  // 执行搜索
  const handleSearch = () => {
    // 过滤掉空值，只传递有值的参数
    const params: BookSearchParams = {};
    if (title.current?.trim()) params.title = title.current.trim();
    if (isbn.current?.trim()) params.isbn = isbn.current.trim();
    if (authorName.current?.trim())
      params.authorName = authorName.current.trim();
    if (categoryName.current?.trim())
      params.categoryName = categoryName.current.trim();
    if (publisherName.current?.trim())
      params.publisherName = publisherName.current.trim();
    if (publishedDateBegin.current?.trim())
      params.publishedDateBegin = publishedDateBegin.current.trim();
    if (publishedDateEnd.current?.trim())
      params.publishedDateEnd = publishedDateEnd.current.trim();

    setSearchParams(params);
  };

  // 滚动加载更多数据
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 && // 提前1000px开始加载
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 添加滚动监听
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 用于强制重新渲染搜索表单的状态
  const [resetKey, setResetKey] = useState(0);

  // 重置搜索
  const handleReset = () => {
    // 重置所有值
    title.current = "";
    isbn.current = "";
    authorName.current = "";
    categoryName.current = "";
    publisherName.current = "";
    publishedDateBegin.current = "";
    publishedDateEnd.current = "";

    // 通过改变key值强制重新渲染搜索表单
    setResetKey((prev) => prev + 1);

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
        <div className="search-body" key={resetKey}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <SearchInput
                label="图书名称"
                placeholder="请输入图书名称"
                valueRef={title}
                onSearch={handleSearch}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <SearchInput
                label="作者"
                placeholder="请输入作者名称"
                valueRef={authorName}
                onSearch={handleSearch}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <SearchInput
                label="类别名称"
                placeholder="请输入类别名称"
                valueRef={categoryName}
                onSearch={handleSearch}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <SearchInput
                label="出版社名称"
                placeholder="请输入出版社名称"
                valueRef={publisherName}
                onSearch={handleSearch}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <SearchInput
                label="ISBN"
                placeholder="请输入ISBN"
                valueRef={isbn}
                onSearch={handleSearch}
                maxLength={13}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight" &&
                    e.key !== "Tab"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <SearchDatePicker
                label="出版日期开始"
                placeholder="请选择开始日期"
                valueRef={publishedDateBegin}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <SearchDatePicker
                label="出版日期结束"
                placeholder="请选择结束日期"
                valueRef={publishedDateEnd}
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
        title={`图书列表 (共 ${totalBooks} 本)`}
        className="book-browse-list"
      >
        <div className="list-body">
          <Spin spinning={isLoading}>
            {books.length === 0 ? (
              <Empty description="暂无图书数据" className="empty-state" />
            ) : (
              <Row gutter={[16, 16]}>
                {books.map((book) => (
                  <Col xs={24} sm={12} md={8} lg={4} xl={4} key={book.id}>
                    <Card hoverable className="book-browse-card">
                      <div className="card-body">
                        <Title
                          level={5}
                          ellipsis={{ rows: 2 }}
                          className="card-title"
                        >
                          {book.title}
                        </Title>
                        <Text type="secondary" className="card-info">
                          <UserOutlined /> {book.authorName || "未知作者"}
                        </Text>
                        <Text type="secondary" className="card-info">
                          <HomeOutlined /> {book.publisherName || "未知出版社"}
                        </Text>
                        <Text type="secondary" className="card-date">
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
                          ISBN: {book.isbn || "暂无ISBN"}
                        </Text>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
            {/* 加载更多指示器 */}
            {isFetchingNextPage && (
              <div className="book-browse-loading-indicator">
                <Spin size="large" />
                <div className="loading-text">正在加载更多图书...</div>
              </div>
            )}
            {/* 没有更多数据提示 */}
            {!hasNextPage && books.length > 0 && (
              <div className="book-browse-load-complete">已加载全部图书</div>
            )}
          </Spin>
        </div>
      </Card>
    </div>
  );
};

export default BookBrowse;
