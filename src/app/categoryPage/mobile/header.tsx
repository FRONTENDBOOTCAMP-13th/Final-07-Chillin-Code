'use client';

import styles from '@/styles/categoryPage/mobile/categoryHeader.module.css';

interface CategoryHeaderProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  onFilterClick: () => void;
  totalProducts: number;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export default function CategoryHeader({
  sortBy,
  setSortBy,
  itemsPerPage,
  setItemsPerPage,
  onFilterClick,
  viewMode,
  setViewMode,
}: CategoryHeaderProps) {
  const handleViewToggle = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <button className={styles.filter_button} onClick={onFilterClick}>
          <div className={styles.filter_icon}>
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9V1M17 17V14M3 17V13M17 10V1M10 4V1M10 17V8"
                stroke="black"
                strokeLinecap="round"
              />
              <path
                d="M3 13C4.10457 13 5 12.1046 5 11C5 9.89543 4.10457 9 3 9C1.89543 9 1 9.89543 1 11C1 12.1046 1.89543 13 3 13Z"
                stroke="black"
                strokeLinecap="round"
              />
              <path
                d="M10 8C11.1046 8 12 7.10457 12 6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6C8 7.10457 8.89543 8 10 8Z"
                stroke="black"
                strokeLinecap="round"
              />
              <path
                d="M17 14C18.1046 14 19 13.1046 19 12C19 10.8954 18.1046 10 17 10C15.8954 10 15 10.8954 15 12C15 13.1046 15.8954 14 17 14Z"
                stroke="black"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className={styles.filter_text}>필터</span>
        </button>
      </div>

      <div className={styles.header_center}>
        <select
          className={styles.sort_select}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="신상품순">신상품순</option>
          <option value="인기순">인기순</option>
          <option value="낮은가격순">낮은가격순</option>
          <option value="높은가격순">높은가격순</option>
        </select>

        <select
          className={styles.count_select}
          value={`${itemsPerPage}개씩`}
          onChange={(e) => setItemsPerPage(Number(e.target.value.replace('개씩', '')))}
        >
          <option value="20개씩">20개씩</option>
          <option value="40개씩">40개씩</option>
          <option value="60개씩">60개씩</option>
        </select>

        <div className={styles.header_right}>
          <button className={styles.view_toggle} onClick={handleViewToggle}>
            {viewMode === 'grid' ? (
              <svg
                width="20"
                height="16"
                viewBox="0 0 23 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.48242 0.976562H21.4824M1.48242 8.97656H21.4824M1.48242 16.9766H21.4824"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4.75C1 2.982 1 2.098 1.55 1.55C2.097 1 2.981 1 4.75 1C6.519 1 7.402 1 7.95 1.55C8.5 2.098 8.5 2.982 8.5 4.75C8.5 6.518 8.5 7.402 7.95 7.95C7.402 8.5 6.518 8.5 4.75 8.5C2.982 8.5 2.098 8.5 1.55 7.95C1 7.403 1 6.519 1 4.75ZM1 15.257C1 13.489 1 12.605 1.55 12.057C2.098 11.507 2.982 11.507 4.75 11.507C6.518 11.507 7.402 11.507 7.95 12.057C8.5 12.605 8.5 13.489 8.5 15.257C8.5 17.025 8.5 17.909 7.95 18.457C7.402 19.007 6.518 19.007 4.75 19.007C2.982 19.007 2.098 19.007 1.55 18.457C1 17.91 1 17.025 1 15.257ZM11.5 4.75C11.5 2.982 11.5 2.098 12.05 1.55C12.598 1 13.482 1 15.25 1C17.018 1 17.902 1 18.45 1.55C19 2.098 19 2.982 19 4.75C19 6.518 19 7.402 18.45 7.95C17.902 8.5 17.018 8.5 15.25 8.5C13.482 8.5 12.598 8.5 12.05 7.95C11.5 7.402 11.5 6.518 11.5 4.75ZM11.5 15.257C11.5 13.489 11.5 12.605 12.05 12.057C12.598 11.507 13.482 11.507 15.25 11.507C17.018 11.507 17.902 11.507 18.45 12.057C19 12.605 19 13.489 19 15.257C19 17.025 19 17.909 18.45 18.457C17.902 19.007 17.018 19.007 15.25 19.007C13.482 19.007 12.598 19.007 12.05 18.457C11.5 17.909 11.5 17.025 11.5 15.257Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
