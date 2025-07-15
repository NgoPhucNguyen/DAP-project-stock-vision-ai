import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import "../components/NewsTab.css";

export default function NewsTabs({ newsData }) {
  if (!newsData || Object.keys(newsData).length === 0) {
    return <div className="mt-4 text-muted">Không có dữ liệu tin tức.</div>;
  }

  const symbols = Object.keys(newsData);

  return (
    <div className="mt-4">
      <Tabs
        defaultActiveKey={symbols[0]}
        id="news-tabs"
        key={symbols.join("-")}
      >
        {symbols.map((symbol) => (
          <Tab eventKey={symbol} title={symbol} key={symbol}>
            {newsData[symbol] && newsData[symbol].length > 0 ? (
              <div className="news-list mt-3">
                {newsData[symbol]
                  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
                  .map((a, i) => {
                    const sentimentClass =
                      a.sentiment === "Positive"
                        ? "border-left-success"
                        : a.sentiment === "Negative"
                        ? "border-left-danger"
                        : "border-left-neutral";

                    const sentimentTextClass =
                      a.sentiment === "Positive"
                        ? "text-success"
                        : a.sentiment === "Negative"
                        ? "text-danger"
                        : "text-secondary";

                    const sentimentEmoji =
                      a.sentiment === "Positive"
                        ? "👍 "
                        : a.sentiment === "Negative"
                        ? "👎 "
                        : "😐 ";

                    return (
                      <div
                        key={i}
                        className={`news-card mb-3 p-3 shadow-sm rounded ${sentimentClass}`}
                      >
                        <a
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="fw-semibold text-decoration-none text-dark"
                        >
                          {a.title || a.headline}
                        </a>
                        <div className="text-muted small mt-1 d-flex justify-content-between">
                          <span>
                            {a.source} –{" "}
                            {new Date(a.publishedAt).toLocaleString()}
                          </span>
                          <span className={sentimentTextClass}>
                            {sentimentEmoji}
                            {a.sentiment}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="mt-3 text-muted">Không có bài viết nào.</div>
            )}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
