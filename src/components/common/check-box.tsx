import check_box_styles from '@/styles/components/check-box.module.css';

export default function CheckBox() {
  return (
    <>
      <div className={check_box_styles.root_header}>
        {/* 라디오 체크 박스 */}
        <div className={check_box_styles.radio_check_box_wrapper}>
          <input type="checkbox" className={check_box_styles.check_input} />
          <label className={check_box_styles.radio_check_box_label}>
            <span className={check_box_styles.radio_check_box} />
          </label>
        </div>
        {/* 체크 박스 */}
        <div className={check_box_styles.check_box_wrapper}>
          <input type="checkbox" className={check_box_styles.check_input} />
          <label className={check_box_styles.check_box_label}>
            <svg
              width="10"
              height="6.8"
              viewBox="0 0 13 10"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
              className={check_box_styles.check_box_icon}
            >
              <path
                d="M4.15364 7.8347L0.859644 4.5427C0.813521 4.49494 0.758348 4.45685 0.697346 4.43065C0.636344 4.40444 0.570734 4.39065 0.504345 4.39007C0.437955 4.3895 0.372115 4.40215 0.310667 4.42729C0.249219 4.45243 0.193393 4.48956 0.146447 4.5365C0.0995002 4.58345 0.0623736 4.63927 0.0372332 4.70072C0.0120927 4.76217 -0.00055803 4.82801 1.88785e-05 4.8944C0.000595787 4.96079 0.0143889 5.0264 0.0405934 5.0874C0.0667979 5.1484 0.104889 5.20358 0.152644 5.2497L4.15264 9.2497L12.1526 1.2497C12.2437 1.1554 12.2941 1.0291 12.293 0.897999C12.2918 0.7669 12.2393 0.641495 12.1466 0.548791C12.0539 0.456086 11.9284 0.403502 11.7973 0.402363C11.6662 0.401223 11.5399 0.451621 11.4456 0.5427L4.15264 7.8347H4.15364Z"
                fill="currentColor"
              />
            </svg>
          </label>
        </div>
      </div>
    </>
  );
}
