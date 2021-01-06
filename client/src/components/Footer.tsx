import React, { useState } from 'react';

const AddChart = () => { // 함수형 컴포넌트 시작~!
  const [value, setValue] = useState(0);
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <div>
      <p>
        <b>{value}</b> 만큼 사랑합니다...
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
      
      <button onClick={() => setIsModalActive(!isModalActive)}>
        modal btn
      </button>
    </div>
  );
};

export default AddChart;