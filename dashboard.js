// ─── GLOBAL CHART DEFAULTS ──────────────────────────────────────────────────
Chart.defaults.color = '#94a3b8';
Chart.defaults.borderColor = '#1a2540';
Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
Chart.defaults.font.size = 12;

const GRID = 'rgba(26,37,64,0.8)';
const TOOLTIP_BG = '#0d1420';

// ─── DATA ────────────────────────────────────────────────────────────────────

// 800k year ice core + modern CO2 (calendar year, ppm)
const iceCoreData = [
  [-798000,188],[-790000,195],[-780000,232],[-770000,208],[-760000,193],
  [-750000,213],[-740000,258],[-730000,218],[-720000,193],[-710000,198],
  [-700000,216],[-690000,272],[-680000,228],[-670000,176],[-660000,173],
  [-650000,192],[-640000,222],[-630000,202],[-620000,184],[-610000,198],
  [-600000,213],[-590000,283],[-580000,238],[-570000,198],[-560000,183],
  [-550000,203],[-540000,262],[-530000,228],[-520000,192],[-510000,188],
  [-500000,212],[-490000,258],[-480000,222],[-470000,196],[-460000,208],
  [-450000,268],[-440000,293],[-430000,262],[-420000,216],[-410000,232],
  [-400000,276],[-390000,296],[-380000,250],[-370000,216],[-360000,212],
  [-350000,232],[-340000,258],[-330000,278],[-320000,242],[-310000,208],
  [-300000,222],[-290000,242],[-280000,262],[-270000,232],[-260000,198],
  [-250000,212],[-240000,248],[-230000,258],[-220000,212],[-210000,198],
  [-200000,193],[-190000,218],[-180000,238],[-170000,262],[-160000,236],
  [-150000,198],[-140000,188],[-130000,212],[-120000,272],[-110000,238],
  [-100000,212],[-90000,192],[-80000,188],[-70000,183],[-60000,186],
  [-50000,188],[-40000,193],[-30000,198],[-20000,183],[-15000,193],
  [-12000,238],[-10000,258],[-8000,263],[-5000,263],[-3000,266],
  [-1000,273],[-500,276],[0,278],[500,278],[1000,278],
  [1500,279],[1700,277],[1750,280],[1800,284],[1850,288],
  [1900,296],[1920,304],[1940,308],[1950,311],[1960,317],
  [1970,325],[1980,338],[1990,354],[2000,369],[2010,389],
  [2015,401],[2020,414],[2022,419],[2023,421],[2024,424.6]
];

// Mauna Loa annual averages (1959–2024)
const co2Modern = [
  [1959,316.0],[1960,316.9],[1961,317.6],[1962,318.5],[1963,319.1],[1964,319.6],
  [1965,320.0],[1966,321.4],[1967,322.2],[1968,323.0],[1969,324.6],[1970,325.7],
  [1971,326.3],[1972,327.5],[1973,329.7],[1974,330.2],[1975,331.1],[1976,332.1],
  [1977,333.8],[1978,335.4],[1979,336.8],[1980,338.7],[1981,340.1],[1982,341.4],
  [1983,343.0],[1984,344.4],[1985,346.0],[1986,347.4],[1987,349.2],[1988,351.5],
  [1989,353.0],[1990,354.4],[1991,355.6],[1992,356.4],[1993,357.1],[1994,358.9],
  [1995,360.9],[1996,362.6],[1997,363.8],[1998,366.6],[1999,368.3],[2000,369.5],
  [2001,371.0],[2002,373.2],[2003,375.8],[2004,377.5],[2005,379.8],[2006,381.9],
  [2007,383.8],[2008,385.6],[2009,387.4],[2010,389.9],[2011,391.6],[2012,393.9],
  [2013,396.5],[2014,398.6],[2015,401.0],[2016,404.2],[2017,406.5],[2018,408.5],
  [2019,411.4],[2020,414.2],[2021,416.4],[2022,418.6],[2023,421.1],[2024,424.6],
  [2025,427.0] // 2025 annual avg (Scripps/NOAA; peak 430.2 ppm in May 2025)
];

// SSP projections from 2024 (added to CO2 modern chart)
const co2Projections = {
  ssp126: [[2024,424.6],[2030,435],[2040,442],[2050,440],[2060,430],[2070,415],[2080,400],[2090,390],[2100,380]],
  ssp245: [[2024,424.6],[2030,445],[2040,468],[2050,497],[2060,524],[2070,550],[2080,570],[2090,588],[2100,600]],
  ssp585: [[2024,424.6],[2030,460],[2040,510],[2050,575],[2060,660],[2070,755],[2080,840],[2090,920],[2100,1000]]
};

// NASA GISS temperature anomaly 1880–2024 (vs 1951-1980 baseline)
const tempData = [
  [1880,-0.16],[1881,-0.08],[1882,-0.11],[1883,-0.17],[1884,-0.28],[1885,-0.33],
  [1886,-0.31],[1887,-0.36],[1888,-0.17],[1889,-0.10],[1890,-0.35],[1891,-0.22],
  [1892,-0.27],[1893,-0.31],[1894,-0.32],[1895,-0.23],[1896,-0.11],[1897,-0.11],
  [1898,-0.27],[1899,-0.17],[1900,-0.08],[1901,-0.15],[1902,-0.28],[1903,-0.37],
  [1904,-0.47],[1905,-0.26],[1906,-0.22],[1907,-0.39],[1908,-0.43],[1909,-0.48],
  [1910,-0.43],[1911,-0.44],[1912,-0.36],[1913,-0.35],[1914,-0.15],[1915,-0.14],
  [1916,-0.36],[1917,-0.46],[1918,-0.30],[1919,-0.27],[1920,-0.27],[1921,-0.19],
  [1922,-0.28],[1923,-0.26],[1924,-0.27],[1925,-0.22],[1926,-0.06],[1927,-0.19],
  [1928,-0.22],[1929,-0.36],[1930,-0.09],[1931,-0.08],[1932,-0.11],[1933,-0.27],
  [1934,-0.13],[1935,-0.19],[1936,-0.14],[1937,-0.02],[1938,-0.00],[1939,-0.02],
  [1940,0.09],[1941,0.19],[1942,0.07],[1943,0.09],[1944,0.20],[1945,0.09],
  [1946,-0.01],[1947,-0.03],[1948,-0.05],[1949,-0.08],[1950,-0.17],[1951,0.01],
  [1952,0.02],[1953,0.08],[1954,-0.13],[1955,-0.14],[1956,-0.14],[1957,0.05],
  [1958,0.06],[1959,0.03],[1960,-0.03],[1961,0.06],[1962,0.03],[1963,0.05],
  [1964,-0.20],[1965,-0.11],[1966,-0.06],[1967,-0.02],[1968,-0.07],[1969,0.08],
  [1970,0.03],[1971,-0.08],[1972,0.01],[1973,0.16],[1974,-0.07],[1975,-0.01],
  [1976,-0.10],[1977,0.18],[1978,0.07],[1979,0.16],[1980,0.26],[1981,0.32],
  [1982,0.14],[1983,0.31],[1984,0.16],[1985,0.12],[1986,0.18],[1987,0.32],
  [1988,0.39],[1989,0.29],[1990,0.44],[1991,0.41],[1992,0.22],[1993,0.24],
  [1994,0.31],[1995,0.45],[1996,0.35],[1997,0.46],[1998,0.61],[1999,0.40],
  [2000,0.42],[2001,0.54],[2002,0.63],[2003,0.62],[2004,0.54],[2005,0.68],
  [2006,0.61],[2007,0.66],[2008,0.54],[2009,0.64],[2010,0.72],[2011,0.61],
  [2012,0.64],[2013,0.68],[2014,0.75],[2015,0.87],[2016,1.01],[2017,0.92],
  [2018,0.83],[2019,0.98],[2020,1.02],[2021,0.85],[2022,0.89],[2023,1.17],
  [2024,1.28]
];

// Ocean heat content anomaly (ZJ vs 1981-2010) - 0-2000m
const ohcData = [
  [1958,-90],[1962,-70],[1966,-55],[1970,-38],[1974,-22],[1978,-12],
  [1982,-5],[1986,10],[1990,28],[1994,52],[1998,85],[2002,115],
  [2006,148],[2010,178],[2014,215],[2016,250],[2018,272],[2019,285],
  [2020,296],[2021,310],[2022,320],[2023,335],[2024,351]
];

// Global mean sea level rise (mm above 1993 baseline)
const seaLevelData = [
  [1993,0],[1994,4],[1995,5],[1996,8],[1997,13],[1998,9],
  [1999,10],[2000,13],[2001,16],[2002,22],[2003,27],[2004,29],
  [2005,34],[2006,37],[2007,41],[2008,41],[2009,45],[2010,43],
  [2011,41],[2012,50],[2013,56],[2014,61],[2015,66],[2016,74],
  [2017,78],[2018,82],[2019,88],[2020,92],[2021,97],[2022,102],
  [2023,107],[2024,111]
];

// Ocean surface pH
const phData = [
  [1750,8.200],[1800,8.195],[1850,8.183],[1880,8.173],[1900,8.168],
  [1920,8.158],[1940,8.148],[1950,8.138],[1960,8.127],[1970,8.115],
  [1980,8.108],[1990,8.095],[2000,8.082],[2010,8.069],[2015,8.060],
  [2020,8.050],[2023,8.042],[2024,8.040]
];

// Scenario projections vs pre-industrial (combined historical + projections)
const historicalPI = [
  [1850,0.00],[1870,0.05],[1880,0.03],[1900,0.11],[1920,0.13],[1940,0.28],
  [1950,0.22],[1960,0.17],[1970,0.22],[1980,0.45],[1990,0.63],[2000,0.61],
  [2010,0.91],[2015,1.06],[2020,1.21],[2023,1.36],[2024,1.47]
];
const ssp126 = [[2024,1.47],[2030,1.60],[2040,1.72],[2050,1.78],[2060,1.78],[2070,1.77],[2080,1.79],[2090,1.79],[2100,1.80]];
const ssp245 = [[2024,1.47],[2030,1.62],[2040,1.82],[2050,2.05],[2060,2.22],[2070,2.38],[2080,2.55],[2090,2.62],[2100,2.70]];
const ssp370 = [[2024,1.47],[2030,1.65],[2040,1.93],[2050,2.25],[2060,2.68],[2070,3.06],[2080,3.28],[2090,3.52],[2100,3.60]];
const ssp585 = [[2024,1.47],[2030,1.72],[2040,2.14],[2050,2.55],[2060,3.06],[2070,3.55],[2080,3.85],[2090,4.18],[2100,4.40]];

// ─── CHART HELPERS ───────────────────────────────────────────────────────────
function toXY(arr){ return arr.map(d=>({x:d[0],y:d[1]})); }
function interpYearly(pts){
  const out=[];
  for(let i=0;i<pts.length-1;i++){
    const [x1,y1]=pts[i],[x2,y2]=pts[i+1];
    for(let x=x1;x<x2;x++) out.push([x, y1+(y2-y1)*(x-x1)/(x2-x1)]);
  }
  out.push(pts[pts.length-1]);
  return out;
}

const baseScaleOpts = {
  grid:{color:GRID},
  ticks:{color:'#94a3b8'},
  border:{color:'transparent'}
};

const baseTooltipOpts = {
  backgroundColor:TOOLTIP_BG,
  borderColor:GRID,
  borderWidth:1,
  titleColor:'#e2e8f0',
  bodyColor:'#94a3b8',
  padding:10,
  cornerRadius:6
};

// ─── CHART 1: 800k ICE CORE ──────────────────────────────────────────────────
new Chart(document.getElementById('chartIceCore').getContext('2d'), {
  type:'line',
  data:{datasets:[{
    label:'CO₂ (ppm)',
    data: toXY(iceCoreData),
    borderColor:'#f97316',
    backgroundColor:(ctx)=>{
      const g = ctx.chart.ctx.createLinearGradient(0,0,0,280);
      g.addColorStop(0,'rgba(239,68,68,0.25)');g.addColorStop(1,'rgba(239,68,68,0.0)');
      return g;
    },
    borderWidth:1.5,fill:true,tension:0.3,pointRadius:0,pointHoverRadius:4
  },{
    label:'Pre-industrial ceiling (300 ppm)',
    data:[{x:-800000,y:300},{x:2024,y:300}],
    borderColor:'rgba(234,179,8,0.4)',
    borderWidth:1,
    borderDash:[4,4],
    pointRadius:0,
    fill:false,
    tension:0
  },{
    label:'Current (424.6 ppm)',
    data:[{x:-800000,y:424.6},{x:2024,y:424.6}],
    borderColor:'rgba(239,68,68,0.5)',
    borderWidth:1,
    borderDash:[6,3],
    pointRadius:0,
    fill:false,
    tension:0
  }]},
  options:{
    responsive:true,maintainAspectRatio:false,
    animation:{duration:600},
    interaction:{mode:'index',intersect:false},
    scales:{
      x:{
        ...baseScaleOpts,type:'linear',min:-800000,max:2100,
        afterBuildTicks:(axis)=>{
          // Only label geological time — modern era (1750-2024) is <0.03% of x-range,
          // labels would overlap. Reference lines at 280/424.6 ppm convey modern context.
          axis.ticks=[{value:-800000},{value:-600000},{value:-400000},{value:-200000},{value:-100000},{value:0}];
        },
        ticks:{color:'#94a3b8',callback:(v)=>{
          const m={
            '-800000':'800k BCE','-600000':'600k BCE','-400000':'400k BCE',
            '-200000':'200k BCE','-100000':'100k BCE','0':'Present era →'
          };
          return m[String(v)]||'';
        },maxRotation:0,minRotation:0}
      },
      y:{
        ...baseScaleOpts,min:150,max:460,
        title:{display:true,text:'CO₂ (ppm)',color:'#64748b',font:{size:11}},
        ticks:{color:'#94a3b8',callback:v=>`${v} ppm`}
      }
    },
    plugins:{
      legend:{display:true,position:'top',labels:{boxWidth:12,padding:16,usePointStyle:true,color:'#94a3b8',font:{size:11}}},
      tooltip:{...baseTooltipOpts,callbacks:{
        title:items=>{const v=items[0].parsed.x; return v<0?`${Math.abs(Math.round(v/1000))}k years ago`:(v<1800?`~${Math.round(v)} CE`:`${v}`)},
        label:item=>`CO₂: ${item.parsed.y.toFixed(1)} ppm`
      }}
    }
  },
  // Inline plugin: annotate the modern spike in the far-right corner
  plugins:[{
    afterDraw:(chart)=>{
      const c=chart.ctx, xs=chart.scales.x, ys=chart.scales.y;
      const xP=xs.getPixelForValue(2024);
      c.save();
      // "TODAY" label above the spike
      c.fillStyle='rgba(239,68,68,0.92)';
      c.font='bold 10.5px Inter,sans-serif';
      c.textAlign='right';
      c.fillText('TODAY: 424 ppm',xP-5,ys.getPixelForValue(440));
      // Arrow line from label to spike
      c.strokeStyle='rgba(239,68,68,0.55)';
      c.lineWidth=1;
      c.setLineDash([3,3]);
      c.beginPath();
      c.moveTo(xP-5,ys.getPixelForValue(436));
      c.lineTo(xP-1,ys.getPixelForValue(427));
      c.stroke();
      c.setLineDash([]);
      // Pre-industrial label
      c.fillStyle='rgba(234,179,8,0.85)';
      c.fillText('Pre-industrial: 280 ppm',xP-5,ys.getPixelForValue(268));
      c.restore();
    }
  }]
});

// ─── CHART 2: MODERN CO2 ─────────────────────────────────────────────────────
new Chart(document.getElementById('chartCO2Modern').getContext('2d'), {
  type:'line',
  data:{datasets:[
    {
      label:'Mauna Loa CO₂ (observed)',
      data:toXY(co2Modern),
      borderColor:'#ef4444',
      backgroundColor:(ctx)=>{
        const g=ctx.chart.ctx.createLinearGradient(0,0,0,260);
        g.addColorStop(0,'rgba(239,68,68,0.2)');g.addColorStop(1,'rgba(239,68,68,0.0)');
        return g;
      },
      borderWidth:2,fill:true,tension:0.3,pointRadius:0,pointHoverRadius:5
    },{
      label:'SSP1-2.6 (aggressive cuts)',
      data:toXY(co2Projections.ssp126),
      borderColor:'#22c55e',borderWidth:1.5,borderDash:[4,4],
      pointRadius:0,fill:false,tension:0.4
    },{
      label:'SSP2-4.5 (moderate action)',
      data:toXY(co2Projections.ssp245),
      borderColor:'#f59e0b',borderWidth:1.5,borderDash:[4,4],
      pointRadius:0,fill:false,tension:0.4
    },{
      label:'SSP5-8.5 (business as usual)',
      data:toXY(co2Projections.ssp585),
      borderColor:'#ef4444',borderWidth:1.5,borderDash:[4,4],
      pointRadius:0,fill:false,tension:0.4
    }
  ]},
  options:{
    responsive:true,maintainAspectRatio:false,animation:{duration:600},
    interaction:{mode:'index',intersect:false},
    scales:{
      x:{...baseScaleOpts,type:'linear',min:1959,max:2100,
        ticks:{color:'#94a3b8',maxTicksLimit:8,callback:v=>`${v}`}},
      y:{...baseScaleOpts,min:310,max:1050,
        title:{display:true,text:'CO₂ (ppm)',color:'#64748b',font:{size:11}},
        ticks:{color:'#94a3b8',callback:v=>`${v}`}}
    },
    plugins:{
      legend:{display:true,position:'top',labels:{boxWidth:12,padding:12,usePointStyle:true,color:'#94a3b8',font:{size:11}}},
      tooltip:{...baseTooltipOpts,callbacks:{label:item=>`${item.dataset.label}: ${item.parsed.y.toFixed(1)} ppm`}}
    }
  }
});

// ─── CHART 3: TEMPERATURE ANOMALY ────────────────────────────────────────────
function tempColor(v){
  if(v>=1.0)  return 'rgba(185,28,28,0.92)';
  if(v>=0.75) return 'rgba(220,38,38,0.88)';
  if(v>=0.5)  return 'rgba(239,68,68,0.84)';
  if(v>=0.25) return 'rgba(249,115,22,0.8)';
  if(v>=0.0)  return 'rgba(234,179,8,0.72)';
  if(v>=-0.2) return 'rgba(96,165,250,0.7)';
  return 'rgba(59,130,246,0.85)';
}
new Chart(document.getElementById('chartTemp').getContext('2d'), {
  type:'bar',
  data:{datasets:[
    {
      label:'Temperature Anomaly (°C)',
      data:toXY(tempData),
      backgroundColor:tempData.map(d=>tempColor(d[1])),
      borderWidth:0,borderRadius:1,
    },{
      type:'line',label:'1.5°C Paris Target',
      data:[{x:1880,y:1.23},{x:2024,y:1.23}],
      borderColor:'rgba(234,179,8,0.7)',borderWidth:1.5,borderDash:[5,4],
      pointRadius:0,fill:false
    },{
      type:'line',label:'2.0°C Upper Target',
      data:[{x:1880,y:1.73},{x:2024,y:1.73}],
      borderColor:'rgba(239,68,68,0.5)',borderWidth:1.5,borderDash:[5,4],
      pointRadius:0,fill:false
    },{
      type:'line',label:'Zero baseline',
      data:[{x:1880,y:0},{x:2024,y:0}],
      borderColor:'rgba(148,163,184,0.3)',borderWidth:1,
      pointRadius:0,fill:false
    }
  ]},
  options:{
    responsive:true,maintainAspectRatio:false,animation:{duration:800},
    interaction:{mode:'index',intersect:false},
    scales:{
      x:{...baseScaleOpts,type:'linear',min:1880,max:2024,
        ticks:{color:'#94a3b8',maxTicksLimit:15,callback:v=>`${v}`}},
      y:{...baseScaleOpts,min:-0.55,max:1.45,
        title:{display:true,text:'Anomaly vs. 1951–1980 baseline (°C)',color:'#64748b',font:{size:11}},
        ticks:{color:'#94a3b8',callback:v=>`${v>0?'+':''}${v.toFixed(2)}°C`}}
    },
    plugins:{
      legend:{display:true,position:'top',labels:{boxWidth:12,padding:12,usePointStyle:true,color:'#94a3b8',font:{size:11},
        filter:item=>item.text!=='Zero baseline'
      }},
      tooltip:{...baseTooltipOpts,callbacks:{
        label:item=>item.dataset.type==='line'?item.dataset.label:
          `Anomaly: ${item.parsed.y>=0?'+':''}${item.parsed.y.toFixed(2)}°C`
      }}
    }
  }
});

// ─── CHART 4: OCEAN HEAT CONTENT ─────────────────────────────────────────────
new Chart(document.getElementById('chartOHC').getContext('2d'), {
  type:'line',
  data:{datasets:[{
    label:'OHC Anomaly (ZJ)',
    data:toXY(ohcData),
    borderColor:'#06b6d4',
    backgroundColor:(ctx)=>{
      const g=ctx.chart.ctx.createLinearGradient(0,0,0,220);
      g.addColorStop(0,'rgba(6,182,212,0.25)');g.addColorStop(1,'rgba(6,182,212,0.0)');
      return g;
    },
    borderWidth:2.5,fill:true,tension:0.4,pointRadius:0,pointHoverRadius:5
  }]},
  options:{
    responsive:true,maintainAspectRatio:false,animation:{duration:600},
    scales:{
      x:{...baseScaleOpts,type:'linear',min:1958,max:2024,
        ticks:{color:'#94a3b8',maxTicksLimit:8,callback:v=>`${v}`}},
      y:{...baseScaleOpts,title:{display:true,text:'Anomaly (ZJ)',color:'#64748b',font:{size:11}},
        ticks:{color:'#94a3b8',callback:v=>`${v>0?'+':''}${v}`}}
    },
    plugins:{
      legend:{display:false},
      tooltip:{...baseTooltipOpts,callbacks:{label:item=>`OHC: ${item.parsed.y>0?'+':''}${item.parsed.y} ZJ`}}
    }
  }
});

// ─── CHART 5: SEA LEVEL ──────────────────────────────────────────────────────
new Chart(document.getElementById('chartSeaLevel').getContext('2d'), {
  type:'line',
  data:{datasets:[{
    label:'Sea Level Rise (mm)',
    data:toXY(seaLevelData),
    borderColor:'#3b82f6',
    backgroundColor:(ctx)=>{
      const g=ctx.chart.ctx.createLinearGradient(0,0,0,220);
      g.addColorStop(0,'rgba(59,130,246,0.2)');g.addColorStop(1,'rgba(59,130,246,0.0)');
      return g;
    },
    borderWidth:2.5,fill:true,tension:0.4,pointRadius:0,pointHoverRadius:5
  }]},
  options:{
    responsive:true,maintainAspectRatio:false,animation:{duration:600},
    scales:{
      x:{...baseScaleOpts,type:'linear',min:1993,max:2024,
        ticks:{color:'#94a3b8',maxTicksLimit:8,callback:v=>`${v}`}},
      y:{...baseScaleOpts,title:{display:true,text:'mm above 1993',color:'#64748b',font:{size:11}},
        ticks:{color:'#94a3b8',callback:v=>`+${v}mm`}}
    },
    plugins:{
      legend:{display:false},
      tooltip:{...baseTooltipOpts,callbacks:{label:item=>`Rise: +${item.parsed.y}mm above 1993`}}
    }
  }
});

// ─── CHART 6: OCEAN pH ───────────────────────────────────────────────────────
new Chart(document.getElementById('chartPH').getContext('2d'), {
  type:'line',
  data:{datasets:[{
    label:'Ocean Surface pH',
    data:toXY(phData),
    borderColor:'#a855f7',
    backgroundColor:(ctx)=>{
      const g=ctx.chart.ctx.createLinearGradient(0,0,0,220);
      g.addColorStop(0,'rgba(168,85,247,0.18)');g.addColorStop(1,'rgba(168,85,247,0.0)');
      return g;
    },
    borderWidth:2.5,fill:true,tension:0.4,pointRadius:2,pointHoverRadius:6,
    pointBackgroundColor:'#a855f7'
  }]},
  options:{
    responsive:true,maintainAspectRatio:false,animation:{duration:600},
    scales:{
      x:{...baseScaleOpts,type:'linear',min:1750,max:2024,
        ticks:{color:'#94a3b8',maxTicksLimit:8,callback:v=>`${v}`}},
      y:{...baseScaleOpts,min:8.02,max:8.22,reverse:false,
        title:{display:true,text:'pH (lower = more acidic)',color:'#64748b',font:{size:11}},
        ticks:{color:'#94a3b8',callback:v=>v.toFixed(3)}}
    },
    plugins:{
      legend:{display:false},
      tooltip:{...baseTooltipOpts,callbacks:{label:item=>`pH: ${item.parsed.y.toFixed(3)}`}}
    }
  }
});

// ─── CHART 7: SSP PROJECTIONS ────────────────────────────────────────────────
new Chart(document.getElementById('chartProjections').getContext('2d'), {
  type:'line',
  data:{datasets:[
    {
      label:'Historical record',
      data:toXY(interpYearly(historicalPI)),
      borderColor:'#e2e8f0',borderWidth:2.5,fill:false,tension:0.2,
      pointRadius:0,pointHoverRadius:5
    },{
      label:'SSP1-2.6: Aggressive cuts → ~1.8°C',
      data:toXY(interpYearly(ssp126)),
      borderColor:'#22c55e',borderWidth:2,borderDash:[4,3],fill:false,tension:0.2,
      pointRadius:0,pointHoverRadius:5
    },{
      label:'SSP2-4.5: Moderate action → ~2.7°C',
      data:toXY(interpYearly(ssp245)),
      borderColor:'#f59e0b',borderWidth:2,borderDash:[4,3],fill:false,tension:0.2,
      pointRadius:0,pointHoverRadius:5
    },{
      label:'SSP3-7.0: Current policies → ~3.6°C',
      data:toXY(interpYearly(ssp370)),
      borderColor:'#f97316',borderWidth:2,borderDash:[4,3],fill:false,tension:0.2,
      pointRadius:0,pointHoverRadius:5
    },{
      label:'SSP5-8.5: Business as usual → ~4.4°C',
      data:toXY(interpYearly(ssp585)),
      borderColor:'#ef4444',borderWidth:2.5,borderDash:[4,3],fill:false,tension:0.2,
      pointRadius:0,pointHoverRadius:5
    },{
      type:'line',label:'1.5°C Paris target',
      data:[{x:1850,y:1.5},{x:2100,y:1.5}],
      borderColor:'rgba(234,179,8,0.5)',borderWidth:1,borderDash:[6,4],
      pointRadius:0,fill:false
    },{
      type:'line',label:'2.0°C upper target',
      data:[{x:1850,y:2.0},{x:2100,y:2.0}],
      borderColor:'rgba(239,68,68,0.4)',borderWidth:1,borderDash:[6,4],
      pointRadius:0,fill:false
    }
  ]},
  options:{
    responsive:true,maintainAspectRatio:false,animation:{duration:800},
    interaction:{mode:'x',intersect:false},
    scales:{
      x:{...baseScaleOpts,type:'linear',min:1850,max:2100,
        ticks:{color:'#94a3b8',stepSize:25,callback:v=>`${v}`}},
      y:{...baseScaleOpts,min:-0.1,max:4.8,
        title:{display:true,text:'Warming above pre-industrial (°C)',color:'#64748b',font:{size:11}},
        ticks:{color:'#94a3b8',callback:v=>`+${v.toFixed(1)}°C`}}
    },
    plugins:{
      legend:{display:true,position:'top',labels:{boxWidth:12,padding:12,usePointStyle:true,color:'#94a3b8',font:{size:11},
        filter:item=>!item.text.includes('target')
      }},
      tooltip:{...baseTooltipOpts,callbacks:{
        label:item=>{
          const x=item.parsed.x,isHist=item.dataset.label==='Historical record',isTgt=item.dataset.label.includes('target');
          if(isTgt) return null;
          if(isHist && x>2024) return null;
          if(!isHist && !isTgt && x<=2024) return null;
          return `${item.dataset.label.split(':')[0]}: +${item.parsed.y.toFixed(2)}°C`;
        }
      }}
    }
  }
});


// ─── WORLD MAP (D3) ──────────────────────────────────────────────────────────

const impactEvents = [
  {id:1,type:'heatwave',name:'Western US Mega-Drought & Heat',lat:36,lon:-115,sev:'extreme',year:'2000–2024',
    desc:'Driest 20-year period in 1,200 years of tree-ring records. 2021 Pacific Northwest heat dome killed 1,400+ people. Lake Mead hit record lows. Colorado River over-allocated and failing. 2024 LA wildfires destroyed thousands of structures.'},
  {id:2,type:'heatwave',name:'South Asian Extreme Heat Crisis',lat:27,lon:78,sev:'extreme',year:'2022–2024',
    desc:'India & Pakistan recorded 50°C+ temperatures in 2022 — heatwave arrived 45 days early. Wet-bulb temperatures approaching human physiological survivability limits in parts of the Indo-Gangetic plain. 2023–2024 continued record-breaking heat.'},
  {id:3,type:'heatwave',name:'European Heat Emergencies',lat:46,lon:8,sev:'severe',year:'2003–2024',
    desc:'2003 heatwave killed 70,000+ people. UK exceeded 40°C for the first time ever in July 2022. Mediterranean routinely 5–8°C above average in summer. Southern Europe experiencing 5× more frequent extreme heat events.'},
  {id:4,type:'heatwave',name:'Middle East Extreme Heat',lat:27,lon:47,sev:'extreme',year:'2021–2024',
    desc:'Kuwait, Iran, Iraq recording 53°C+. Wet-bulb events near the 35°C human survival limit. Outdoor work becoming physiologically impossible for weeks per year. Gulf states facing existential water and cooling energy crises.'},
  {id:5,type:'heatwave',name:'Sub-Saharan Africa Heat & Food Crisis',lat:12,lon:20,sev:'severe',year:'2021–2024',
    desc:'Sub-Saharan Africa experiencing heatwaves 5× more common than in the pre-industrial era. Sahel increasingly uninhabitable. Combined heat and drought collapsing food systems. 36M+ facing acute food insecurity in the Horn of Africa.'},
  {id:6,type:'flood',name:'Pakistan Catastrophic Floods',lat:28,lon:68,sev:'extreme',year:'2022',
    desc:'One-third of Pakistan submerged under water. 1,700+ deaths, 33 million people displaced. $30 billion in damages. Climate attribution research found this event was made 75× more likely by anthropogenic climate change.'},
  {id:7,type:'flood',name:'European Flash Flooding',lat:51,lon:7,sev:'severe',year:'2021–2024',
    desc:'2021 Germany/Belgium floods: 220+ deaths, $13B damage. October 2024 Valencia, Spain: 231 deaths, $12 billion in damage — Spain\'s costliest weather disaster on record, caused by a flash flood that dumped a year\'s worth of rain in hours.'},
  {id:8,type:'flood',name:'Southeast Asia Flooding Crisis',lat:17,lon:105,sev:'severe',year:'2020–2024',
    desc:'Bangladesh, Thailand, Vietnam, Myanmar facing intensifying annual flooding. Mekong Delta communities facing permanent inundation. Typhoon-driven flooding becoming more destructive. 50M+ people at chronic high flood risk.'},
  // id:9 removed — duplicate of id:48 (same event, more detailed)
  {id:10,type:'flood',name:'East Africa Flash Flooding',lat:-1,lon:37,sev:'severe',year:'2023–2024',
    desc:'Kenya, Tanzania, Somalia: exceptional flooding following historic drought — a whiplash pattern becoming increasingly common. Lake Victoria and other lakes surging to record levels. 100,000+ displaced. Infrastructure collapse.'},
  // id:11 removed — duplicate of id:44 (same event, more detailed)
  {id:12,type:'drought',name:'Mediterranean Persistent Drought',lat:37,lon:22,sev:'severe',year:'2017–2024',
    desc:'Greece, Spain, Italy, Morocco in chronic water crisis. Water rationing in Catalonia. Sicily declared drought state of emergency in 2024. Mediterranean drying is one of the most robust climate signals — the region is warming 20% faster than the global average.'},
  {id:13,type:'drought',name:'Horn of Africa Multi-Year Drought',lat:8,lon:44,sev:'extreme',year:'2020–2024',
    desc:'Five consecutive failed rainy seasons — worst drought in 40 years. 36M+ facing acute food insecurity in Ethiopia, Somalia, Kenya, Djibouti. Pastoral livelihoods collapsing. Internal displacement accelerating as water sources dry up permanently.'},
  {id:14,type:'drought',name:'Central Asia: Disappearing Glaciers',lat:39,lon:72,sev:'severe',year:'Ongoing',
    desc:'Hindu Kush-Karakoram-Himalayan glaciers — "Asia\'s water towers" — supplying freshwater to 2 billion people are losing mass at accelerating rates. Glacier loss 2022–2024: worst 3-year period on record. Glacial lake outburst floods increasing.'},
  {id:15,type:'drought',name:'China Yangtze River Drought',lat:32,lon:112,sev:'severe',year:'2022–2024',
    desc:'Yangtze River hit record-low water levels in summer 2022 — worst drought in 60 years. Hydroelectric power collapsed. Crops failed across vast regions. 2023-2024 extreme heat continued to stress water systems across eastern China.'},
  {id:16,type:'storm',name:'Atlantic: Hurricane Intensification',lat:26,lon:-70,sev:'severe',year:'2020–2024',
    desc:'2020: record 30 named storms. 2024: Hurricanes Helene and Milton caused catastrophic damage to southeastern USA. Rapid intensification events — hurricanes jumping categories within hours — becoming dramatically more common as ocean surface temperatures hit record highs.'},
  {id:17,type:'storm',name:'Western Pacific Super Typhoons',lat:17,lon:138,sev:'extreme',year:'2019–2024',
    desc:'Super Typhoon Haiyan (2013) killed 6,300+ people. Warming seas fueling more intense, rapid intensification typhoons threatening the Philippines, Japan, Vietnam, Taiwan, and China. Category 5 equivalent storms increasingly common.'},
  {id:18,type:'storm',name:'Indian Ocean Cyclone Intensification',lat:-15,lon:55,sev:'severe',year:'2019–2024',
    desc:'Cyclone Idai (2019) devastated Mozambique and Zimbabwe (1,000+ deaths). Arabian Sea cyclone activity increasing dramatically as Indian Ocean temperatures hit records. Madagascar repeatedly struck. Intensity records being broken.'},
  {id:19,type:'wildfire',name:'Canadian Wildfire Crisis',lat:55,lon:-115,sev:'extreme',year:'2023–2024',
    desc:'2023: Canada\'s worst wildfire season in modern history — over 18 million hectares burned (an area larger than Greece). Smoke blanketed US cities for weeks. 2024: Town of Jasper largely destroyed. Permafrost regions burning, releasing ancient carbon stores.'},
  {id:20,type:'wildfire',name:'Australian Black Summer',lat:-33,lon:148,sev:'extreme',year:'2019–2020',
    desc:'18.6 million hectares burned. Approximately 3 billion animals killed or displaced — described as the largest mammal population collapse from a single event in modern history. 33 human deaths. Smoke plumes circled the entire globe. Koalas listed as endangered.'},
  {id:21,type:'wildfire',name:'Mediterranean Wildfires',lat:39,lon:23,sev:'severe',year:'2021–2024',
    desc:'2023: Evros fire in Greece became the largest single wildfire ever recorded in EU history. Turkey, Algeria, Tunisia: simultaneous record-breaking fires. Extreme drought priming forests for ignition months earlier each year.'},
  {id:22,type:'wildfire',name:'Siberian Permafrost Fires',lat:65,lon:115,sev:'severe',year:'2019–2024',
    desc:'Unprecedented Arctic fires burning carbon-rich peatlands and permafrost that took thousands of years to accumulate. 2019–2021: exceptional burning seasons. Smoke plumes crossing the Arctic Ocean. Positive feedback: fire releases carbon → more warming → more fire.'},
  {id:23,type:'wildfire',name:'California: Escalating Fires',lat:37,lon:-120,sev:'severe',year:'2018–2024',
    desc:'2018 Camp Fire: deadliest wildfire in California history (85 deaths, destroyed Paradise). 2024 Palisades & Eaton fires: devastated LA neighborhoods, destroyed 17,000+ structures. Home insurance market collapsing across fire zones.'},
  {id:24,type:'sealevel',name:'Pacific Island Existential Crisis',lat:5,lon:173,sev:'extreme',year:'Ongoing',
    desc:'Kiribati, Tuvalu, Marshall Islands, and other low-lying atoll nations face complete inundation within decades. Saltwater intrusion has destroyed freshwater lenses and agricultural land. Tuvalu has established legal plans for a digital nation as land disappears. Unprecedented human displacement underway.'},
  {id:25,type:'sealevel',name:'Arctic Sea Ice Collapse',lat:82,lon:10,sev:'extreme',year:'Ongoing',
    desc:'Arctic summer sea ice extent declining at 12.4% per decade. 2025: record low winter maximum extent. Arctic is warming approximately 4× faster than the global average. Scientists warn a "Blue Ocean Event" (virtually ice-free Arctic summer) may occur by the 2030s, triggering additional albedo feedback.'},
  {id:26,type:'sealevel',name:'Greenland Ice Sheet: Irreversible Melt',lat:73,lon:-40,sev:'extreme',year:'Ongoing',
    desc:'Net annual mass loss every year since 1998. Cumulative loss contributing ~1.5cm to sea level rise. Research suggests irreversible melt may begin at 1.5°C sustained warming — a threshold likely already breached. Full melt would raise seas 6–7 meters.'},
  {id:27,type:'sealevel',name:'Bangladesh Delta: 17M at Risk',lat:23,lon:90,sev:'extreme',year:'Ongoing',
    desc:'17 million Bangladeshis live in coastal zones at direct sea level rise risk. Cyclone storm surges increasingly catastrophic as the Bay of Bengal warms. Saltwater intrusion destroying agricultural land. Internal climate migration to Dhaka accelerating — the city may become unmanageable.'},
  {id:28,type:'sealevel',name:'Thwaites Glacier: Doomsday Glacier',lat:-80,lon:-107,sev:'extreme',year:'Ongoing',
    desc:'Thwaites Glacier — nicknamed the "Doomsday Glacier" — is the size of Florida and holds enough ice to raise global sea levels by 60cm alone. If it destabilizes the broader West Antarctic Ice Sheet, the contribution could reach 3+ meters. Grounding line retreat is accelerating.'},

  // 2026 EVENTS
  {id:29,type:'heatwave',name:'🆕 2026 Southwest US Record Heat Wave',lat:35,lon:-114,sev:'extreme',year:'March 2026',
    desc:'One of the most astonishing weather events of the 21st century. March 2026 became the warmest March in US records (1895–present), beating 2012 by half a degree Fahrenheit. 112°F (44°C) recorded at sites in California — within 1°F of the all-time April record. Over 1,100 daily temperature records and 700+ monthly records broken across the country since March 1. World Weather Attribution confirmed: this event was "virtually impossible without human-induced climate change," which added 4.7–7.2°F (2.6–4°C) to the temperatures experienced.'},
  {id:31,type:'storm',name:'🆕 Category 5 Cyclone Narelle — Queensland, Australia',lat:-22,lon:150,sev:'extreme',year:'March 2026',
   desc:'Category 5 Cyclone Narelle made landfall in Queensland with gusts reaching 315 km/h (196 mph), cutting power to thousands of homes. Copernicus Sentinel-3 satellite imagery confirmed its intensity. Part of an intensifying pattern of more powerful cyclones in warming Australian waters.',
   impacts:['Gusts 315 km/h — one of strongest on record for Queensland','Power cut to thousands of homes','Warming seas increasing cyclone intensity','Rapid intensification observed offshore']},
  {id:32,type:'wildfire',name:'🆕 Nebraska Mega-Wildfire — 800,000+ Acres',lat:42,lon:-101,sev:'extreme',year:'March 2026',
   desc:'Nebraska\'s largest wildfire on record burned more than 800,000 acres — nearly the size of the island of Socotra — forcing a state of emergency declaration. Combined with two additional smaller fires burning simultaneously, the event underscored how wildfire risk is expanding well beyond the American West.',
   impacts:['800,000+ acres burned — Nebraska\'s largest on record','State of emergency declared','Two additional simultaneous wildfires','Expanding wildfire risk zone beyond traditional Western states']},
  {id:33,type:'flood',name:'🆕 Hawaii Worst Flooding in 20+ Years',lat:20.5,lon:-157,sev:'high',year:'March 2026',
   desc:'Continuous flooding in Hawaii — the state\'s worst in over 20 years — forced repeated evacuations with an estimated cost around $1 billion. Maui broke a 70+ year record for daily rainfall. The events reflect intensifying atmospheric rivers and moisture as ocean temperatures rise.',
   impacts:['State\'s worst flooding in 20+ years','Estimated cost: ~$1 billion','Maui: broke 70+ year daily rainfall record','Repeated evacuation orders across multiple weeks']},
  {id:34,type:'flood',name:'🆕 Kenya Flooding — 80+ Dead in March 2026',lat:1,lon:37,sev:'high',year:'March 2026',
   desc:'Successive weeks of severe flooding across Kenya killed 80+ people in March 2026, with 62 deaths in just a fortnight. East Africa has been experiencing intensifying rainfall extremes as Indian Ocean sea surface temperatures rise. The flooding followed a prolonged drought period, exemplifying climate whiplash.',
   impacts:['80+ deaths in March 2026','62 killed in a single two-week period','Intensifying Indian Ocean moisture','Classic climate whiplash pattern: drought then extreme flood']},
  {id:35,type:'flood',name:'🆕 Southern Africa Floods — 280+ Dead, 1M Affected',lat:-19,lon:34,sev:'extreme',year:'Dec 2025–Feb 2026',
   desc:'Catastrophic flooding struck Mozambique, South Africa, Madagascar, and neighboring countries from December 2025 through February 2026. South Africa declared a national disaster on January 18, 2026. Over 400,000 people were displaced in Mozambique alone. The floods are consistent with the intensifying Indian Ocean Dipole and La Niña patterns amplified by climate change, which are projected to bring increasingly severe wet seasons to southern Africa.',
   impacts:['280+ dead across the region','~1 million people affected','400,000+ displaced in Mozambique alone','South Africa national disaster declaration January 18, 2026','Infrastructure and crops destroyed across multiple countries']},
  {id:36,type:'drought',name:'🆕 East Africa Mega-Drought — 26M Facing Hunger',lat:7,lon:46,sev:'extreme',year:'2025–2026',
   desc:'The Horn of Africa is experiencing one of its most severe drought crises on record, with 20–26 million people affected across Ethiopia, Somalia, Kenya, and Djibouti. In Somalia alone, 6.5 million people face acute hunger — double the number from early 2025. Research by the World Weather Attribution group finds droughts of this severity are now 100 times more likely due to climate change. The Sahel faces additional lean-season food insecurity for 42–53 million people by June–August 2026.',
   impacts:['20–26 million people affected across Horn of Africa','6.5M in Somalia facing acute hunger — doubled in one year','Drought 100× more likely due to climate change (WWA)','Sahel: 42–53M at risk during 2026 lean season (WFP)','Cascading displacement and conflict risk']},
  {id:37,type:'storm',name:'🆕 Storm Kristin — Portugal\'s Most Damaging Windstorm Since 1999',lat:39,lon:-9,sev:'extreme',year:'January 2026',
   desc:'Storm Kristin struck Portugal and Spain in January 2026 with gusts reaching 208.8 km/h — a new Portuguese national record. The storm was described by insurers and meteorologists as the most damaging European windstorm since the catastrophic December 1999 storms. Over 1 million people lost power. An estimated 15 million trees were felled across the Iberian Peninsula. Floods simultaneously struck Spain, forcing 12,400+ evacuations; Grazalema recorded 500mm of rain in 24 hours.',
   impacts:['208.8 km/h gusts — new Portuguese national record','€7.2 billion in damage','1 million+ power outages','15 million trees felled across Iberian Peninsula','12,400+ evacuated in Spain; Grazalema 500mm in 24 hours']},
  {id:38,type:'storm',name:'🆕 Cyclone Horacio — Earth\'s First Cat 5 of 2026',lat:-18,lon:68,sev:'extreme',year:'February 2026',
   desc:'Tropical Cyclone Horacio became Earth\'s first Category 5 storm of 2026 in the Southwest Indian Ocean, reaching sustained winds of 260 km/h (162 mph) between February 18–24. The storm intensified rapidly over record-warm Indian Ocean waters. It is part of a global pattern of more intense tropical cyclones as sea surface temperatures rise — the same warming that drove 2024\'s record-breaking Atlantic hurricane season and the 2025–2026 Australian cyclone season.',
   impacts:['260 km/h sustained winds — Category 5 intensity','Rapid intensification over record-warm Indian Ocean','Part of global trend: more intense cyclones in warmer seas','2026 season tracking as one of the most active on record']},
  {id:30,type:'drought',name:'🆕 2026 Western US Snow Drought Crisis',lat:39,lon:-107,sev:'extreme',year:'March–April 2026',
    desc:'Colorado just recorded its worst snowpack since statewide measurement began in 1941. The Sierra Nevada measured just 18% of its average snow water equivalent — a catastrophic shortfall for summer water supply and wildfire risk. Across the West, snowpack SWE on March 30, 2026, was less than 50% of median at the vast majority of NRCS monitoring stations. The Lower and Upper Colorado River Basins both hit period-of-record lows. The crisis was driven by a combination of one of the warmest and driest winters on record, followed by the record March heat wave that rapidly melted remaining snowpack.'},

  /* ── 2023 EVENTS ── */
  {id:39,type:'wildfire',name:'🆕 Canada Wildfires 2023 — Worst Season in History',lat:54,lon:-115,sev:'extreme',year:'2023',
   desc:'Canada\'s 2023 wildfire season shattered all records: 18.4 million hectares burned — more than 10 times the 20-year average. Some 235,000 Canadians were evacuated at peak, with over 1,000 communities under evacuation orders. Smoke blanketed much of North America for weeks, triggering air quality emergencies from New York to Chicago. Fire-generated CO₂ exceeded 290 megatonnes — equivalent to Canada\'s entire annual fossil fuel emissions.',
   impacts:['18.4 million hectares burned — 10× the 20-year average (Canadian Interagency Forest Fire Centre)','235,000+ evacuated; 1,000+ communities issued evacuation orders simultaneously','Air quality emergencies across eastern Canada and US cities including New York and Chicago','~2,700 simultaneous fires at peak; nearly 1,200 classified as out of control','CO₂ emissions from fires: ~290 megatonnes — equal to Canada\'s total annual fossil fuel output']},

  {id:40,type:'flood',name:'🆕 Libya — Storm Daniel Destroys Derna, 10,000+ Dead',lat:32.7,lon:22.6,sev:'extreme',year:'September 2023',
   desc:'Mediterranean Storm Daniel struck northeastern Libya on September 10–11, 2023, causing the simultaneous collapse of two upstream dams. A wall of water 3–7 meters high swept through the coastal city of Derna in minutes. Some 10,000–11,000 people were killed — the deadliest climate disaster in Libya\'s modern history. The entire lower quarter of Derna was washed into the sea. Climate attribution: this event was made 50× more likely by climate change (World Weather Attribution).',
   impacts:['10,000–11,000 deaths — Libya\'s deadliest natural disaster in modern history','Two dams (Abu Mansour & Derna) collapsed simultaneously; 3–7m wall of water struck in minutes','~25% of Derna washed into the Mediterranean; thousands of bodies never recovered','40,000+ displaced; entire neighborhoods erased from the map within hours','Climate attribution: Storm Daniel made 50× more likely by climate change (WWA, Sept 2023)']},

  {id:41,type:'wildfire',name:'🆕 Maui Wildfires — Lahaina Destroyed, 100+ Dead',lat:20.9,lon:-156.7,sev:'extreme',year:'August 2023',
   desc:'The August 2023 Maui wildfires were the deadliest in the United States in over a century. Driven by Hurricane Dora\'s offshore winds and severe drought, the historic town of Lahaina was almost entirely destroyed in hours. Over 100 people were killed — many found sheltering in homes with no warning. 2,200+ structures were destroyed and $5.5B+ in damage recorded. Emergency sirens failed to activate, exposing critical infrastructure gaps.',
   impacts:['100+ deaths — deadliest US wildfire in over 100 years (National Weather Service)','Historic Lahaina town ~85% destroyed; 2,200+ structures burned to the ground','$5.5B+ in property damage — most costly disaster in Hawaii\'s history','Hurricane Dora\'s offshore winds (60 mph+) drove fire through drought-desiccated landscape','Emergency warning sirens failed to sound; post-disaster investigation found systemic failures']},

  {id:42,type:'wildfire',name:'🆕 Greece & Mediterranean Wildfires — Record EU Season',lat:38.5,lon:23,sev:'extreme',year:'July–August 2023',
   desc:'The summer of 2023 produced the worst wildfire season in European Union recorded history. Greece bore the brunt: 96,000+ hectares burned, 80,000+ evacuated, and 20+ killed. The island of Rhodes was partially evacuated in a historic first. Concurrent fires burned in Portugal, Spain, Italy, Canary Islands, and Algeria. The season was supercharged by the record July 2023 European heatwave, which peaked at 47°C in Sicily.',
   impacts:['Greece: 96,000+ hectares burned — worst wildfire season since records began','Rhodes island partially evacuated — historic first for a major Greek island','EU-wide 2023 wildfire carbon emissions hit all-time record (Copernicus CAMS)','Sicily: 47°C during peak heatwave that drove fire spread across Southern Europe','Concurrent fires in Portugal, Spain, Italy, Algeria stretched EU emergency response to limit']},

  {id:43,type:'heatwave',name:'🆕 European Heatwave 2023 — 61,000 Excess Deaths',lat:43,lon:13,sev:'extreme',year:'July 2023',
   desc:'July 2023 was the hottest month ever recorded globally at that time, anchored by a devastating Southern European heatwave. Spain, Portugal, Italy, and Greece all exceeded 45°C. Sicily reached 47°C — near the European all-time record. A peer-reviewed study in Nature Medicine estimated 61,000 excess deaths across Europe during summer 2023. The heat drove wildfires and crop failures simultaneously across the region.',
   impacts:['61,000+ excess deaths from heat across Europe in summer 2023 (Vicedo-Cabrera et al., Nature Medicine)','Sicily, Italy: 47°C — near-European record; Spain: 45°C+; Greece: 45°C+ across multiple days','July 2023 confirmed as globally hottest month ever recorded (Copernicus Climate Change Service)','Major crop failures across Southern Europe; wine, olive, and wheat harvests severely cut','Heat simultaneously drove record wildfires across Greece, Portugal, Spain, and North Africa']},

  {id:44,type:'drought',name:'🆕 Amazon Drought 2023–24 — Worst in 120 Years',lat:-4,lon:-63,sev:'extreme',year:'2023–2024',
   desc:'The Amazon basin experienced its worst drought in 120 years of recorded history. The Amazon River fell to its lowest-ever level in October 2023 — surpassing the previous 2015 record. In Amazonas state, 500,000+ people lost access to drinking water. River temperatures exceeded 39°C, killing hundreds of river dolphins and triggering mass fish die-offs. The drought was amplified by El Niño interacting with climate warming and continued deforestation reducing regional rainfall.',
   impacts:['Amazon River at lowest-ever recorded level (October 2023) — 120-year record broken','500,000+ people in Amazonas state, Brazil, lost access to clean drinking water','River water temperature exceeded 39°C — over 200 river dolphins found dead in a single week','Mass fish die-offs; fishing communities cut off from subsistence food source','Deforestation-drought feedback loop accelerating: forest loss reducing rainfall that normally sustains the basin']},

  {id:45,type:'storm',name:'🆕 Super Typhoon Mawar — Most Intense Global Cyclone of 2023',lat:13.5,lon:144.8,sev:'extreme',year:'May–June 2023',
   desc:'Super Typhoon Mawar was the most intense tropical cyclone anywhere on Earth in 2023. It made a direct strike on Guam with sustained winds of 185 mph — the strongest typhoon to hit the island since Super Typhoon Pongsona in 2002. 160,000 residents lost power; widespread structural damage was reported across Guam. Mawar was fueled by record-warm western Pacific sea surface temperatures that have been progressively elevated by climate change.',
   impacts:['185 mph (160 kt) sustained winds — most intense global tropical cyclone of 2023','Strongest typhoon to strike Guam since 2002; 160,000+ residents without power','Widespread infrastructure and structural damage across the island; extended recovery period','Fueled by record-warm western Pacific SSTs of 28–30°C — a direct climate change fingerprint','Subsequently struck Philippines as tropical storm, causing additional flooding and fatalities']},

  /* ── 2024 EVENTS ── */
  {id:46,type:'heatwave',name:'🆕 India Heatwave 2024 — 52.3°C in New Delhi',lat:28.6,lon:77.2,sev:'extreme',year:'May–June 2024',
   desc:'India experienced its most intense pre-monsoon heat on record in 2024. New Delhi reached 52.3°C on May 28 — the highest temperature ever recorded in the capital. Rajasthan and Uttar Pradesh regularly exceeded 50°C for days at a time. Heat-related deaths are estimated at 40,000+ for the May–June period (Lancet Countdown / health ministry reports). India\'s national elections were held during peak heat, with voter turnout in affected states significantly reduced.',
   impacts:['52.3°C in New Delhi (May 28, 2024) — highest temperature ever recorded in the capital city','40,000+ heat-related deaths estimated for May–June 2024 (Lancet Countdown India tracking)','Rajasthan, Uttar Pradesh: repeated 50°C+ days; cattle losses, crop failures, well dry-ups','1 billion+ people exposed to dangerous heat levels (≥40°C) at some point during the event','National elections disrupted; hospital systems overwhelmed; outdoor workers ordered to stay home']},

  {id:47,type:'flood',name:'🆕 Dubai & UAE 2024 — 2 Years of Rain in 24 Hours',lat:25.2,lon:55.3,sev:'extreme',year:'April 2024',
   desc:'On April 16, 2024, the UAE and Oman were struck by an unprecedented rainfall event. Dubai received 254mm of rain in 24 hours — 2.5× its annual average in a single storm. Dubai International Airport (the world\'s busiest by international traffic) was partially flooded and operations severely disrupted. Highways became rivers across the UAE. Oman\'s Muscat saw flash floods kill 18+ people. The event underscored the growing vulnerability of desert infrastructure to climate-intensified extreme rainfall.',
   impacts:['Dubai: 254mm in 24 hours — more than 2.5× the city\'s entire annual average rainfall','Dubai International Airport partially flooded; worldwide flight disruptions for 24+ hours','Highways and underpasses submerged across UAE; cars swept into floodwaters, then abandoned','Oman (Muscat, Musandam): 18+ deaths; multiple provinces declared disaster zones','Persian Gulf SSTs exceeding 33°C in 2024 intensifying moisture loading in storm systems (climate attribution)']},

  {id:48,type:'flood',name:'🆕 Brazil — Rio Grande do Sul, Brazil\'s Worst Climate Disaster',lat:-30,lon:-51.5,sev:'extreme',year:'April–May 2024',
   desc:'Catastrophic flooding in Brazil\'s Rio Grande do Sul state beginning late April 2024 became the worst climate disaster in Brazilian history. Successive extreme rainfall events — driven by record South Atlantic sea surface temperatures — overwhelmed 500+ municipalities. Porto Alegre\'s airport, downtown, and port were flooded for weeks. 150+ people died; 400,000+ homes were damaged or destroyed; 2.4 million people were affected.',
   impacts:['150+ deaths; 400,000+ homes damaged or destroyed; 2.4 million people affected across 500 municipalities','Porto Alegre airport closed for months; city center submerged; water supply system compromised','$7B+ in direct economic damage — single costliest natural disaster in Brazilian history','Record-warm South Atlantic SSTs (+1.5°C above average) amplified precipitation (WWA attribution confirmed)','Recovery severely hampered: 18 months after 2022 floods, RS struck again before prior damage repaired']},

  {id:49,type:'flood',name:'🆕 Afghanistan Flash Floods 2024 — 1,000+ Dead',lat:35,lon:69,sev:'extreme',year:'May 2024',
   desc:'Afghanistan experienced devastating flash floods in May 2024. A single event in Baghlan province on May 10 killed over 400 people — entire villages were erased. Total flood deaths across Afghanistan in 2024 exceeded 1,000. The world\'s most climate-vulnerable country by the ND-GAIN index, Afghanistan\'s crumbling humanitarian situation made relief operations nearly impossible. The disaster received minimal international attention despite its extraordinary scale.',
   impacts:['1,000+ total flood deaths across Afghanistan in 2024; single May 10 event killed 400+ in Baghlan','Baghlan province: entire villages swept away; most bodies were never recovered','UN called Baghlan floods among the worst disasters in Afghan history','Afghanistan ranked most climate-vulnerable country globally; emergency response capacity near zero','Simultaneous drought-flood extremes: arid south experiencing severe drought while north floods — both climate signals']},

  {id:50,type:'storm',name:'🆕 Super Typhoon Yagi 2024 — Deadliest Asian Typhoon of 2024',lat:17.5,lon:106,sev:'extreme',year:'September 2024',
   desc:'Super Typhoon Yagi was the strongest tropical cyclone in Asia in 2024. After killing 50+ in the Philippines, it crossed the South China Sea and intensified further over record-warm waters, then struck Vietnam with 155 mph sustained winds — the most powerful typhoon to affect the country in decades. Vietnam suffered 345 deaths, 1,900+ injuries, and $3.3B in economic losses. China\'s Hainan island also suffered severe impacts.',
   impacts:['345 dead in Vietnam — most from inland flooding and landslides triggered by Yagi\'s rainfall bands','$3.3B in economic damage in Vietnam alone; hundreds of thousands of homes destroyed','50+ deaths in Philippines before intensification over South China Sea; 400,000+ evacuated','155 mph peak winds — most powerful typhoon to directly impact Vietnam in the modern record','Rapidly intensified over South China Sea SSTs of 30–31°C; direct climate change fingerprint']},

  {id:51,type:'flood',name:'🆕 Bangladesh & India Flooding 2024 — 5.5M Affected',lat:23.5,lon:90.5,sev:'extreme',year:'August–September 2024',
   desc:'Severe monsoon flooding struck Bangladesh and northeast India in August–September 2024. In Bangladesh it was the worst flooding in decades, with 5.5 million people affected across 11 districts, 1M+ homes flooded, and 70+ deaths. India\'s Tripura and Assam states saw 3M+ displaced. The flooding followed a record monsoon season driven by anomalously warm Bay of Bengal waters. Agricultural losses ran into hundreds of millions of dollars across both countries.',
   impacts:['5.5 million people affected in Bangladesh across 11 districts — worst flooding in decades','1M+ homes flooded; 70+ dead in Bangladesh; millions without safe drinking water','India (Tripura, Assam): 3M+ displaced; major bridges, roads, and crops destroyed','Dhaka partially flooded; food distribution and emergency response severely hampered','Record Bay of Bengal SSTs (+1°C above average) intensified monsoon moisture — clear climate attribution (IPCC AR6 Ch.11)']},

  {id:52,type:'storm',name:'🆕 Hurricane Helene 2024 — Deadliest US Hurricane Since Katrina',lat:35.5,lon:-82.5,sev:'extreme',year:'September 2024',
   desc:'Hurricane Helene made landfall in Florida as a Category 4 storm on September 26, 2024. Though it weakened over land, it delivered catastrophic inland flooding to western North Carolina, Tennessee, and Virginia. Asheville, NC saw rivers exceed their 500-year flood stage. The death toll of 230+ makes it the deadliest US hurricane since Katrina in terms of inland flood fatalities. Record-warm Gulf of Mexico temperatures fueled Helene\'s explosive intensification before landfall.',
   impacts:['230+ deaths — deadliest US hurricane since Katrina (2005); majority from inland flooding, not storm surge','Asheville, NC: French Broad River exceeded 500-year flood stage; downtown and infrastructure devastated','$47B+ in insured damage across 7 states; communities isolated for weeks with no road or cell access','Gulf SSTs 2–4°C above average fueled rapid intensification from Cat 1 to Cat 4 in 24 hours','NOAA attribution study: climate change made Helene\'s extreme rainfall 50% more intense']},

  {id:53,type:'storm',name:'🆕 Hurricane Milton 2024 — Record Gulf Intensification',lat:27.5,lon:-82,sev:'extreme',year:'October 2024',
   desc:'Hurricane Milton rapidly intensified from a tropical storm to a Category 5 hurricane in just 24 hours over the Gulf of Mexico — one of the fastest intensifications in Atlantic hurricane history. It reached 180 mph sustained winds and set a new Gulf of Mexico record minimum pressure of 897 mbar. Striking Florida as a Category 3 just two weeks after Helene, it spawned 33+ tornadoes and caused $34B in damage, compounding Florida\'s ongoing disaster recovery.',
   impacts:['Category 5 at peak: 180 mph winds, 897 mbar — new Gulf of Mexico record minimum pressure','One of the fastest intensification events in Atlantic history; reached Cat 5 from Cat 1 in ~24 hours','33+ tornadoes spawned ahead of landfall; St. Lucie County EF-3 tornado killed 4','$34B+ in damage in Florida — struck just 13 days after Hurricane Helene compound disaster','Gulf SSTs 2–3°C above historical average provided exceptional energy; NOAA links rapid intensification to warming']},

  {id:54,type:'flood',name:'🆕 Spain Valencia Flooding 2024 — Worst in 50 Years, 230+ Dead',lat:39.5,lon:-0.4,sev:'extreme',year:'October 2024',
   desc:'A DANA (cold drop) atmospheric system triggered catastrophic flash flooding across the Valencia region of Spain on October 29, 2024. Some areas received 400–500mm of rain — a full year\'s average — in 8 hours. 230+ people were killed, making it Spain\'s deadliest natural disaster in over 50 years. Entire communities were swept away. Criticism of delayed emergency warnings intensified public anger and political fallout.',
   impacts:['230+ deaths — Spain\'s deadliest natural disaster in over 50 years','400–500mm of rain in 8 hours in hardest-hit areas; a full year\'s average in one storm','Entire towns and neighborhoods swept away; roads and bridges obliterated across Valencia','$10B+ in damage; Spain\'s largest citrus-producing region suffered devastating crop and infrastructure losses','Climate attribution: warmer Mediterranean SSTs (+1.3°C in 2024) made DANA more intense and moisture-laden (WWA)']},

  {id:55,type:'flood',name:'🆕 Central Europe Flooding 2024 — Storm Boris',lat:50.5,lon:16.5,sev:'extreme',year:'September 2024',
   desc:'Storm Boris brought record rainfall to Central Europe in mid-September 2024, triggering the worst regional flooding since 2002. Austria, Poland, Czech Republic, Romania, and Slovakia were all severely affected. Poland\'s Kłodzko district was devastated and 24,000+ were evacuated. The Czech Republic recorded its worst flooding in more than two decades. Warmer atmospheric temperatures held significantly more moisture, making the event more extreme than similar historical patterns.',
   impacts:['Poland: Kłodzko and Nysa areas devastated; 24,000+ evacuated; historic buildings and bridges destroyed','Czech Republic: worst flooding since 2002; major rivers exceeded all-time records at multiple gauges','Austria: 6 dead; multiple towns evacuated in worst flooding in decades','Romania and Slovakia: severe river flooding; critical infrastructure losses','Climate attribution: atmosphere holds 7% more moisture per °C of warming — Boris estimated 2–7× more intense due to warming (Copernicus)']},

  {id:56,type:'flood',name:'🆕 China Southern Flooding 2024 — 3M+ Evacuated',lat:29,lon:112,sev:'extreme',year:'June–July 2024',
   desc:'Southern China experienced severe and prolonged flooding during June–July 2024, driven by a more intense monsoon season amplified by warming Indo-Pacific ocean temperatures. Hunan, Guangdong, Guangxi, and Fujian provinces saw rivers reach historic levels. The Yangtze River and its tributaries repeatedly exceeded flood stage. Over 3 million people were evacuated and 100+ died, with $6B+ in direct economic losses recorded.',
   impacts:['3M+ people evacuated across Hunan, Guangdong, Guangxi, and Fujian provinces','100+ deaths; $6B+ in direct economic damage across affected provinces','Yangtze River tributaries at record or near-record flood stages at multiple monitoring points','Dongting Lake basin flooding severely impacted China\'s largest freshwater lake ecosystem and surrounding agriculture','Intensified monsoon driven by warmer South China Sea and broader Indo-Pacific circulation shift (IPCC AR6 attribution)']},

  /* ── 2025 EVENTS ── */
  {id:57,type:'wildfire',name:'🆕 Los Angeles Wildfires 2025 — Most Destructive in LA History',lat:34.1,lon:-118.5,sev:'extreme',year:'January 2025',
   desc:'The January 2025 Los Angeles wildfires were the most destructive in the city\'s history and among the costliest natural disasters ever recorded in the United States. The Palisades Fire and Eaton Fire burned simultaneously, driven by extreme Santa Ana winds gusting to 100+ mph and the driest autumn–winter in LA\'s recorded history. 12,000+ structures were destroyed. Historic neighborhoods — Pacific Palisades, Altadena, Pasadena — were largely erased. 27+ people died.',
   impacts:['12,000+ structures destroyed — most destructive urban wildfire event in California history','27+ deaths; 180,000+ people under simultaneous evacuation orders at peak','$50B+ in estimated insured losses — potentially the largest insured loss from a natural disaster in California history','Pacific Palisades and Altadena neighborhoods largely burned; multi-generational communities permanently erased','Driven by record drought + 100+ mph Santa Ana winds; climate change extending dangerous fire-weather conditions year-round']},

  /* ── CENTRAL & SOUTH AMERICA EVENTS ── */
  {id:58,type:'storm',name:'🆕 Hurricane Beryl 2024 — Earliest Cat 5 in Atlantic History',lat:18,lon:-77,sev:'extreme',year:'July 2024',
   desc:'Hurricane Beryl became the earliest Category 5 hurricane ever recorded in the Atlantic on July 2, 2024 — beating the previous record by over two weeks. Fueled by abnormally warm Caribbean SSTs (+1–2°C above average), Beryl devastated the Windward Islands, struck Jamaica as the strongest hurricane in 15+ years, then hit Mexico and Texas. The storm underscored how warming oceans are extending peak-strength hurricane conditions far earlier in the season.',
   impacts:['Earliest Category 5 Atlantic hurricane on record — July 2, 2024','Windward Islands devastated: Carriacou and Petite Martinique nearly flattened','Jamaica: strongest direct hit in 15+ years; widespread infrastructure damage','Caribbean SSTs 1–2°C above average — direct climate change fingerprint fueling early-season intensity','Subsequently struck Mexico\'s Yucatán and Texas; $6B+ total estimated losses']},

  {id:59,type:'wildfire',name:'🆕 Chile Wildfires 2024 — 136 Dead, Deadliest in Century',lat:-33,lon:-71.5,sev:'extreme',year:'February 2024',
   desc:'Wildfires in Chile\'s Valparaíso region in February 2024 killed 136 people — the deadliest wildfire event in Chile\'s history and one of the deadliest globally in over a century. A 10–15°C heatwave above weekly averages combined with Chile\'s ongoing mega-drought (worst in 1,000+ years) created catastrophic fire conditions. Nearly 160,000 acres burned; 16,000+ homes were destroyed or damaged. The fires overwhelmed firefighting capacity within hours.',
   impacts:['136 deaths — Chile\'s deadliest wildfire in recorded history','160,000 acres burned; 16,000+ homes destroyed or damaged in Valparaíso region','Heatwave: temperatures 10–15°C above weekly average primed fire conditions','Chile\'s mega-drought (since 2010) — longest in 1,000+ years — left vegetation critically dry','Among deadliest wildfires globally in over 100 years (UNICEF/SENAPRED)']},

  {id:60,type:'wildfire',name:'🆕 South America Wildfires 2024 — Worst Season on Record',lat:-15,lon:-60,sev:'extreme',year:'2024',
   desc:'South America experienced its worst wildfire season on record in 2024. Over 60 million hectares burned across Brazil, Bolivia, Paraguay, and Peru — an area larger than France. The Amazon and Pantanal saw their worst fires in almost two decades. Bolivia alone lost 10 million hectares (9% of its territory) and set all-time emissions records. A 3,910% increase in Pantanal fires in August 2024 vs August 2023 was driven by record drought and El Niño aftermath.',
   impacts:['60M+ hectares burned across South America — worst season on record (Copernicus CAMS)','346,000+ fire hotspots detected — surpassing 2007 record (satellite data since 1998)','Bolivia: 10M hectares burned — 9% of national territory; record carbon emissions of 76 megatonnes','Amazon & Pantanal: worst fires in ~20 years; Pantanal saw 3,910% increase Aug 2024 vs Aug 2023','Smoke plume stretched from Ecuador to São Paulo; degraded air quality for 200M+ people']},

  {id:61,type:'storm',name:'🆕 Hurricanes Eta & Iota 2020 — Back-to-Back Cat 4/5 in Central America',lat:15,lon:-86,sev:'extreme',year:'November 2020',
   desc:'In November 2020, Hurricanes Eta (Category 4) and Iota (Category 5) struck Central America within two weeks of each other — an unprecedented back-to-back disaster. Honduras, Guatemala, Nicaragua, and Costa Rica were devastated. 7.5 million people were affected, 163+ killed, and $6.8 billion in damage recorded. 88% of agricultural losses were in coffee, bananas, plantains, and sugar cane — destroying livelihoods for subsistence farmers across the region.',
   impacts:['7.5 million people affected across Guatemala, Honduras, Nicaragua, Costa Rica','163+ deaths; $6.8 billion in total damage','Two hurricanes struck same region within 14 days — unprecedented in modern record','88% of agricultural damage in coffee (49%), bananas (27%), plantains (7%), and sugar cane','Triggered massive displacement and migration surge northward from Central America']},

  {id:62,type:'drought',name:'🆕 Paraná River Drought 2020–2022 — Lowest Levels in 77 Years',lat:-26,lon:-57,sev:'extreme',year:'2020–2022',
   desc:'South America\'s second-longest river, the Paraná, fell to its lowest water levels since 1944 during a multi-year drought affecting Brazil, Argentina, and Paraguay. Flow rates plummeted from 17,000 to 6,200 cubic meters per second. The Itaipú Dam — supplying 88.5% of Paraguay\'s energy and 10.8% of Brazil\'s — lost 28% of its power generation. In Argentina alone, 3.5 million hectares of crops and 18.5 million cattle were at risk. 40 million people depend on the Paraná basin for freshwater.',
   impacts:['Lowest Paraná River levels since 1944 — 77-year record broken','Itaipú Dam output fell 28%; Paraguay derives 88.5% of its electricity from Itaipú','Argentina: 3.5M hectares of crops and 18.5M cattle at risk from water shortages','40 million people across Brazil, Argentina, Paraguay affected by reduced water supply','Indigenous communities lost 70–80% of crops including corn, beans, sesame, and rice']},

  {id:63,type:'drought',name:'🆕 Mexico Mega-Drought 2022–2024 — 76% of Country in Drought',lat:23,lon:-102,sev:'extreme',year:'2022–2024',
   desc:'By May 2024, 76% of Mexico was experiencing moderate to exceptional drought — the most widespread since 2011. The country\'s 210 major reservoirs were at just 37% average capacity, with over 150 below 50%. Mexico City — population 22 million — came close to a "Day Zero" water shutoff as the Cutzamala system dropped to ~25% capacity. Monterrey (5 million people) rationed water for months in 2022–2023. The drought threatened agriculture, hydropower, and drinking water for 130 million people.',
   impacts:['76% of Mexico in moderate-to-exceptional drought by May 2024 — most widespread since 2011','210 major reservoirs at 37% average capacity; 153 below 50%','Mexico City (22M people): Cutzamala system at ~25% capacity; "Day Zero" warnings issued','Monterrey (5M people): months of water rationing in 2022–2023','Agriculture, hydropower, and drinking water supply for 130M people under stress']},

  {id:64,type:'heatwave',name:'🆕 South America Winter Heat Wave 2023 — 38°C in Midwinter',lat:-33,lon:-60,sev:'extreme',year:'August 2023',
   desc:'In August 2023, South America experienced a remarkable winter heatwave. Temperatures in Argentina reached 38°C — in the middle of winter (Southern Hemisphere). World Weather Attribution analysis found this event was "virtually impossible in a world without human-caused climate change." Paraguay, Uruguay, and southern Brazil also recorded extreme winter warmth. 61 cities in central-north Argentina logged heatwave conditions. Nine of South America\'s 10 warmest years have occurred since 2015.',
   impacts:['Argentina: 38°C in midwinter — virtually impossible without climate change (WWA)','61 cities in central-north Argentina in heatwave conditions simultaneously','Paraguay, Uruguay, and southern Brazil also recorded exceptional winter heat','9 of South America\'s 10 warmest years have occurred since 2015','South America warming rate since 1981 is double the rate since 1901']},

  {id:65,type:'flood',name:'🆕 Colombia Flooding 2024 — National Emergency Twice in One Year',lat:6,lon:-76,sev:'high',year:'2024',
   desc:'Colombia declared a national state of emergency twice in 2024 due to severe flooding. In Chocó, the Atrato, San Juan, and Baudó rivers overflowed, affecting 188,000+ people. In La Guajira, 195,000+ were impacted including displaced migrants. A June 2025 landslide in Granizal near Medellín — triggered by heavy rains on saturated soils — killed 27 people. Colombia is one of the three most disaster-affected countries in Latin America alongside Mexico and Brazil.',
   impacts:['National state of emergency declared twice in 2024 due to extreme rainfall','Chocó: 188,000+ affected by Atrato/San Juan/Baudó river flooding','La Guajira: 195,000+ affected including migrants and refugees','June 2025 Granizal landslide: 27 dead from rain-triggered slide near Medellín','Colombia is one of the three most disaster-affected countries in Latin America (Frontiers, 2025)']}
];

const typeColors = {
  heatwave:'#ef4444',drought:'#f59e0b',flood:'#3b82f6',
  storm:'#a855f7',wildfire:'#f97316',sealevel:'#06b6d4'
};
const typeLabels = {
  heatwave:'🌡️ Heatwave',drought:'🏜️ Drought',flood:'🌊 Flooding',
  storm:'🌀 Storm/Cyclone',wildfire:'🔥 Wildfire',sealevel:'🧊 Ice & Sea Level'
};

let currentFilter = 'all';

// Vulnerability lookup (ISO 3166-1 numeric)
const vuln = {
  // 5 - Extreme
  '50':5,'706':5,'231':5,'562':5,'466':5,'508':5,'716':5,'800':5,
  '296':5,'798':5,'584':5,'520':5,'90':5,'548':5,'626':5,'729':5,
  '694':5,'678':5,'148':5,'104':5,'116':5,'418':5,'388':5,'332':5,
  // 4 - High
  '356':4,'586':4,'288':4,'682':4,'368':4,'646':4,'686':4,'566':4,
  '144':4,'214':4,'192':4,'887':4,'760':4,'422':4,'818':4,'434':4,
  '504':4,'788':4,'12':4,'404':4,'44':4,'28':4,'308':4,'670':4,
  '659':4,'662':4,'340':4,'558':4,'591':4,'180':4,'266':4,'894':4,
  // 3 - Moderate-high
  '76':3,'360':3,'764':3,'704':3,'458':3,'608':3,'710':3,'792':3,
  '300':3,'724':3,'380':3,'32':3,'152':3,'170':3,'604':3,'156':3,
  '840':3,'36':3,'862':3,'218':3,'484':3,'643':3,'620':3,'8':3,
  // 2 - Lower
  '276':2,'250':2,'826':2,'528':2,'124':2,'392':2,'410':2,'756':2,
  '40':2,'56':2,'208':2,'246':2,'578':2,'752':2,'703':2,'705':2,
  '191':2,'348':2,'642':2,'804':2,'616':2,'372':2,'554':2,'352':2,
};

function getVulnColor(id){
  const level = vuln[String(id)] || 2;
  return ['#0c1a30','#1e3a5f','#243b3b','#3d2e0a','#6b2011','#5c0a0a'][level] || '#1a2535';
}

let cachedWorldData = null;

function initMap(){
  const container = document.getElementById('world-map');
  const W = container.clientWidth || 800;
  const H = Math.round(W * 0.52);
  const svg = d3.select('#map-svg').attr('viewBox',`0 0 ${W} ${H}`);

  // Clear previous content on resize
  svg.selectAll('*').remove();

  const proj = d3.geoNaturalEarth1().scale(W/6.28).translate([W/2,H/2]);
  const path = d3.geoPath().projection(proj);

  // Ocean background
  svg.append('rect').attr('width',W).attr('height',H).attr('fill','#040d18');

  function renderMap(world){
    const countries = topojson.feature(world, world.objects.countries);

    // Countries
    svg.selectAll('path.country')
      .data(countries.features)
      .enter().append('path')
      .attr('class','country')
      .attr('d',path)
      .attr('fill',d=>getVulnColor(d.id))
      .attr('stroke','#0d1a2e')
      .attr('stroke-width',0.5);

    // Graticule
    svg.append('path')
      .datum(d3.geoGraticule()())
      .attr('class','graticule')
      .attr('d',path)
      .attr('fill','none')
      .attr('stroke','rgba(255,255,255,0.03)')
      .attr('stroke-width',0.5);

    drawMarkers(svg, proj);
  }

  if(cachedWorldData){
    renderMap(cachedWorldData);
  } else {
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(world=>{
        cachedWorldData = world;
        renderMap(world);
      })
      .catch(()=>{
        svg.append('text').attr('x',W/2).attr('y',H/2)
          .attr('text-anchor','middle').attr('fill','#64748b').attr('font-size',14)
          .text('Map requires an internet connection to load');
      });
  }
}

function drawMarkers(svg, proj){
  svg.selectAll('.ev-marker').remove();
  svg.selectAll('.ev-pulse').remove();

  const filtered = currentFilter==='all'
    ? impactEvents
    : impactEvents.filter(e=>e.type===currentFilter);

  const sizePx = {extreme:7,severe:5,moderate:3};

  // Pulse for extreme events
  filtered.filter(e=>e.sev==='extreme').forEach(e=>{
    const [x,y] = proj([e.lon,e.lat]);
    if(!x||!y) return;
    const pulse = svg.append('circle')
      .attr('class','ev-pulse')
      .attr('cx',x).attr('cy',y)
      .attr('r',sizePx[e.sev]||7)
      .attr('fill','none')
      .attr('stroke',typeColors[e.type])
      .attr('stroke-width',1)
      .attr('opacity',0.4);
    function pulsate(){
      pulse.transition().duration(1400).attr('r',(sizePx[e.sev]||7)+5).attr('opacity',0)
        .transition().duration(0).attr('r',sizePx[e.sev]||7).attr('opacity',0.4)
        .on('end',pulsate);
    }
    pulsate();
  });

  // Markers
  filtered.forEach(e=>{
    const [x,y] = proj([e.lon,e.lat]);
    if(!x||!y) return;
    const g = svg.append('g').attr('class','ev-marker').style('cursor','pointer')
      .attr('tabindex','0').attr('role','button')
      .attr('aria-label',`${e.name} — ${e.sev} severity ${typeLabels[e.type]} (${e.year})`);
    g.append('circle')
      .attr('cx',x).attr('cy',y)
      .attr('r',sizePx[e.sev]||5)
      .attr('fill',typeColors[e.type])
      .attr('fill-opacity',0.8)
      .attr('stroke',typeColors[e.type])
      .attr('stroke-width',0.5)
      .attr('stroke-opacity',1);
    g.on('mouseover',function(){
      d3.select(this).select('circle').attr('fill-opacity',1).attr('r',(sizePx[e.sev]||5)+3);
    }).on('mouseout',function(){
      d3.select(this).select('circle').attr('fill-opacity',0.8).attr('r',sizePx[e.sev]||5);
    }).on('focus',function(){
      d3.select(this).select('circle').attr('fill-opacity',1).attr('r',(sizePx[e.sev]||5)+3).attr('stroke-width',2);
    }).on('blur',function(){
      d3.select(this).select('circle').attr('fill-opacity',0.8).attr('r',sizePx[e.sev]||5).attr('stroke-width',0.5);
    }).on('click',()=>showEventPanel(e))
      .on('keydown',function(event){ if(event.key==='Enter'||event.key===' '){ event.preventDefault(); showEventPanel(e); }});
  });
}

function showEventPanel(e){
  const panel = document.getElementById('map-panel');
  const color = typeColors[e.type];
  const sevClass = `sev-${e.sev}`;
  panel.innerHTML = `
    <div class="fade-in">
      <div class="ev-type" style="color:${color}">${typeLabels[e.type]}</div>
      <div class="ev-name">${e.name}</div>
      <div class="ev-year">Active period: ${e.year}</div>
      <span class="sev-badge ${sevClass}">${e.sev} severity</span>
      <div class="ev-desc">${e.desc}</div>
      <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
        <div style="font-size:11px;color:var(--muted);margin-bottom:8px">OTHER ACTIVE EVENTS IN THIS CATEGORY</div>
        ${impactEvents.filter(x=>x.type===e.type&&x.id!==e.id).slice(0,3).map(x=>
          `<div onclick="showEventPanel(impactEvents.find(ev=>ev.id===${x.id}))"
            style="font-size:12px;color:var(--text2);padding:6px 0;border-bottom:1px solid var(--border);cursor:pointer;transition:color 0.15s"
            onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text2)'">
            ▸ ${x.name} <span style="color:var(--muted)">(${x.year})</span>
          </div>`
        ).join('')}
      </div>
    </div>`;
}

function filterMap(type){
  currentFilter = type;
  document.querySelectorAll('.fbtn').forEach(b=>{
    b.className='fbtn';
    const id=b.id.replace('btn-','');
    if(id===type) b.className=`fbtn active-${type==='all'?'all':type}`;
  });
  const svg = d3.select('#map-svg');
  const container = document.getElementById('world-map');
  const W = container.clientWidth || 800;
  const H = Math.round(W * 0.52);
  const proj = d3.geoNaturalEarth1().scale(W/6.28).translate([W/2,H/2]);
  drawMarkers(svg, proj);
}

// ─── CHART 8: INDOOR vs OUTDOOR CO2 ─────────────────────────────────────────
// Projects outdoor CO2 and modeled indoor (occupied classroom) levels over time
const outdoorCO2Timeline = [
  [1750,280],[1900,296],[1950,311],[1980,338],[2000,369],[2010,389],
  [2020,414],[2025,427],[2030,435],[2040,455],[2050,480],[2060,510],
  [2070,560],[2080,620],[2090,700],[2100,800] // intermediate trajectory
];
// Indoor = outdoor + ~400ppm (typical occupied classroom, standard ventilation)
// But at higher outdoor levels, urban CO2 dome adds ~15-20 ppm, and indoor generation stays constant
const indoorCO2Timeline = outdoorCO2Timeline.map(d=>[d[0], Math.min(d[1]+420, 2100)]);
// BAU outdoor (SSP5-8.5)
const outdoorBAU = [
  [2024,424],[2030,460],[2040,510],[2050,575],[2060,660],[2070,755],[2080,840],[2090,920],[2100,930]
];
const indoorBAU = outdoorBAU.map(d=>[d[0], Math.min(d[1]+450, 2200)]);

new Chart(document.getElementById('chartIndoorCO2').getContext('2d'),{
  type:'line',
  data:{datasets:[
    {
      label:'Outdoor CO₂ (observed + intermediate projection)',
      data:toXY(outdoorCO2Timeline),
      borderColor:'#94a3b8',borderWidth:2,fill:false,tension:0.4,
      pointRadius:0,pointHoverRadius:5,borderDash:[3,3]
    },{
      label:'Indoor CO₂ — typical occupied building (intermediate)',
      data:toXY(indoorCO2Timeline),
      borderColor:'#f59e0b',borderWidth:2.5,fill:false,tension:0.4,
      pointRadius:0,pointHoverRadius:5
    },{
      label:'Indoor CO₂ — business as usual (SSP5-8.5)',
      data:toXY(indoorBAU),
      borderColor:'#ef4444',borderWidth:2.5,fill:false,tension:0.4,
      pointRadius:0,pointHoverRadius:5,borderDash:[4,3]
    },{
      type:'line',label:'Cognitive impairment begins (~1,000 ppm)',
      data:[{x:1750,y:1000},{x:2100,y:1000}],
      borderColor:'rgba(168,85,247,0.5)',borderWidth:1.5,borderDash:[5,4],
      pointRadius:0,fill:false
    },{
      type:'line',label:'Significant impairment (~1,400 ppm)',
      data:[{x:1750,y:1400},{x:2100,y:1400}],
      borderColor:'rgba(239,68,68,0.45)',borderWidth:1.5,borderDash:[5,4],
      pointRadius:0,fill:false
    }
  ]},
  options:{
    responsive:true,maintainAspectRatio:false,animation:{duration:600},
    interaction:{mode:'index',intersect:false},
    scales:{
      x:{...baseScaleOpts,type:'linear',min:1750,max:2100,
        ticks:{color:'#94a3b8',maxTicksLimit:8,callback:v=>`${v}`}},
      y:{...baseScaleOpts,min:250,max:2200,
        title:{display:true,text:'CO₂ concentration (ppm)',color:'#64748b',font:{size:11}},
        ticks:{color:'#94a3b8',callback:v=>`${v} ppm`}}
    },
    plugins:{
      legend:{display:true,position:'top',labels:{boxWidth:12,padding:10,usePointStyle:true,color:'#94a3b8',font:{size:11}}},
      tooltip:{...baseTooltipOpts,callbacks:{label:item=>`${item.dataset.label}: ${item.parsed.y.toFixed(0)} ppm`}}
    }
  }
});

// ─── CHART 9: COGNITIVE PERFORMANCE vs CO2 ───────────────────────────────────
// Based on Allen et al. 2016 and Karnauskas et al. 2020 data
const cogBasicDecision = [
  {x:600,y:100},{x:700,y:97},{x:800,y:94},{x:945,y:88},{x:1000,y:85},
  {x:1200,y:80},{x:1400,y:75},{x:1600,y:70},{x:1800,y:65},{x:2000,y:60}
];
const cogComplexThinking = [
  {x:600,y:100},{x:700,y:98},{x:800,y:93},{x:945,y:85},{x:1000,y:78},
  {x:1200,y:68},{x:1400,y:55},{x:1600,y:47},{x:1800,y:40},{x:2000,y:35}
];
const cogSimpleTask = [
  {x:600,y:100},{x:700,y:99},{x:800,y:98},{x:945,y:96},{x:1000,y:95},
  {x:1200,y:92},{x:1400,y:89},{x:1600,y:86},{x:1800,y:83},{x:2000,y:80}
];

new Chart(document.getElementById('chartCognition').getContext('2d'),{
  type:'line',
  data:{datasets:[
    {
      label:'Simple tasks (reading, basic math)',
      data:cogSimpleTask,
      borderColor:'#22c55e',borderWidth:2,fill:false,tension:0.4,
      pointRadius:2,pointHoverRadius:5,pointBackgroundColor:'#22c55e'
    },{
      label:'Basic decision-making &amp; engagement',
      data:cogBasicDecision,
      borderColor:'#f59e0b',borderWidth:2.5,fill:false,tension:0.4,
      pointRadius:2,pointHoverRadius:5,pointBackgroundColor:'#f59e0b'
    },{
      label:'Complex strategic thinking',
      data:cogComplexThinking,
      borderColor:'#ef4444',borderWidth:2.5,fill:false,tension:0.4,
      pointRadius:2,pointHoverRadius:5,pointBackgroundColor:'#ef4444'
    },{
      type:'line',label:'Typical office today (~800 ppm indoor)',
      data:[{x:800,y:30},{x:800,y:107}],
      borderColor:'rgba(148,163,184,0.4)',borderWidth:1.5,borderDash:[4,4],
      pointRadius:0,fill:false
    },{
      type:'line',label:'BAU 2100 office (~1,600 ppm indoor)',
      data:[{x:1600,y:30},{x:1600,y:107}],
      borderColor:'rgba(239,68,68,0.35)',borderWidth:1.5,borderDash:[4,4],
      pointRadius:0,fill:false
    }
  ]},
  options:{
    responsive:true,maintainAspectRatio:false,animation:{duration:600},
    interaction:{mode:'index',intersect:false},
    scales:{
      x:{...baseScaleOpts,type:'linear',min:550,max:2050,
        title:{display:true,text:'Indoor CO₂ concentration (ppm)',color:'#64748b',font:{size:11}},
        ticks:{color:'#94a3b8',maxTicksLimit:8,callback:v=>`${v} ppm`}},
      y:{...baseScaleOpts,min:30,max:108,
        title:{display:true,text:'Relative cognitive performance (%)',color:'#64748b',font:{size:11}},
        ticks:{color:'#94a3b8',callback:v=>`${v}%`}}
    },
    plugins:{
      legend:{display:true,position:'top',labels:{boxWidth:12,padding:10,usePointStyle:true,color:'#94a3b8',font:{size:11},
        filter:item=>!item.text.includes('ppm indoor')
      }},
      tooltip:{...baseTooltipOpts,callbacks:{
        title:items=>`At ${items[0].parsed.x} ppm indoor CO₂`,
        label:item=>item.dataset.label.includes('ppm indoor')?null:`${item.dataset.label}: ${item.parsed.y.toFixed(0)}%`
      }}
    }
  }
});

// Init map after DOM load
window.addEventListener('load', ()=>{
  setTimeout(initMap, 100);
});

// ─── SEA LEVEL RISE INTERACTIVE ──────────────────────────────────────────────
const slScenarios = [
  { value:0.5, label:'Near-Term Committed Rise', when:'~2050–2100', emission:'Low Emissions',
    pop:'~150M', land:'~0.2%',
    cause:'Thermal expansion from ocean heat already absorbed + current Greenland and West Antarctic melt rates — locked in regardless of further emission cuts',
    warning:'0.5m of rise is unavoidable under any scenario. Pacific islands (Maldives, Tuvalu, Kiribati, Marshall Islands) face existential threat as storm surges regularly overtop minimal land elevation.',
    desc:'<strong style="color:#06b6d4">Already locked in.</strong> Thermal expansion from heat already absorbed by oceans, combined with current Greenland and Antarctic melt rates, makes ~0.5m of additional rise effectively inevitable by 2100 — even under aggressive emissions cuts. Pacific island nations face existential flooding now from storm surges on top of this baseline.',
    color:'#06b6d4' },
  { value:1, label:'Moderate 21st Century Rise', when:'~2100', emission:'SSP2-4.5 Moderate',
    pop:'~250–300M', land:'~0.5%',
    cause:'Accelerated Greenland surface melt + West Antarctic glacier retreat — under moderate-emissions pathway',
    warning:'At 1m, Kulp & Strauss 2019 (CoastalDEM) estimate 300M+ people currently live on land below this elevation — concentrated heavily in coastal Asia. Miami, Ho Chi Minh City, Jakarta, and Bangladesh delta face severe inundation.',
    desc:'<strong style="color:#22d3ee">Moderate scenario for 2100.</strong> Under SSP2-4.5, 1m is within the plausible range. Kulp & Strauss 2019 (<em>Nature Communications</em>) estimate 300M+ people occupy land below 1m elevation worldwide — with the heaviest exposure across China, Bangladesh, India, and Vietnam.',
    color:'#22d3ee' },
  { value:2, label:'High-End 2100 / Mid-22nd Century', when:'2100–2200', emission:'SSP5-8.5 High',
    pop:'~400M', land:'~1%',
    cause:'Significant ice-sheet destabilization — Greenland accelerating, WAIS marine sectors retreating — under high-emissions pathway',
    warning:'IPCC AR6 SSP5-8.5 upper range approaches 2m by 2100. London, NYC, Tokyo, Mumbai, and Osaka face repeated severe flooding. Every major river delta city confronts crisis-level inundation.',
    desc:'<strong style="color:#f59e0b">High-end 2100 scenario.</strong> IPCC AR6 WGI projects up to ~2m by 2100 at the 95th percentile under SSP5-8.5. Some researchers argue ice-sheet models underestimate instability. At 2m, every major low-lying delta city — Ganges, Mekong, Yangtze, Nile, Mississippi — faces a new normal of severe flooding.',
    color:'#f59e0b' },
  { value:3, label:'WAIS Partial Destabilization', when:'~2200–2300', emission:'High Emissions + WAIS',
    pop:'~600M', land:'~1.5%',
    cause:'West Antarctic Ice Sheet marine ice-sheet instability — potentially irreversible above 1.5–2°C, a threshold likely already breached',
    warning:"Hansen et al. 2023 warns 3–5m is locked in if WAIS destabilizes — a process likely already underway. Thwaites Glacier alone holds 60cm; the broader WAIS holds 3m+. This is not a distant prospect — it may be today's commitment.",
    desc:"<strong style=\"color:#f97316\">WAIS destabilization threshold.</strong> The West Antarctic Ice Sheet sits on bedrock below sea level — making it vulnerable to runaway retreat. Hansen et al. 2023 concludes 3–5m is likely locked in on centennial timescales under current warming trajectories. Thwaites Glacier's grounding line is already retreating faster than modeled.",
    color:'#f97316' },
  { value:5, label:'Greenland + WAIS Major Melt', when:'~2300–2500', emission:'Continued High Emissions',
    pop:'~800M–1B', land:'~2.5%',
    cause:'Combined major Greenland Ice Sheet decay (7m total potential) + near-complete West Antarctic Ice Sheet collapse (3m+)',
    warning:'Florida is largely submerged — built on porous limestone, sea walls cannot stop groundwater infiltration. The Netherlands requires mass abandonment of coastal zones. Bangladesh loses its delta. Hundreds of port cities are abandoned over generations.',
    desc:"<strong style=\"color:#ef4444\">Partial ice-sheet collapse.</strong> At 5m, South Florida (avg elevation ~2m, built on karst limestone) becomes largely uninhabitable — seawalls are futile as water rises through the ground. Bangladesh loses most of its delta, displacing tens of millions. The Netherlands — where 26% of land is already below sea level — faces impossible engineering challenges.",
    color:'#ef4444' },
  { value:10, label:'High-End Multi-Century Projection', when:'~2300+ (van de Wal 2022)', emission:'IPCC Extreme / Tail Risk',
    pop:'~2B', land:'~5%',
    cause:'Substantial Greenland Ice Sheet disintegration + near-complete West Antarctic Ice Sheet loss — IPCC high-end and tail-risk scenarios',
    warning:'Van de Wal et al. 2022 (Earth\'s Future) estimates up to 10.4m by 2300 as a plausible high-end. At 10m, most of the world\'s major river deltas — Ganges-Brahmaputra, Mekong, Yangtze, Nile, Mississippi — are submerged. ~2 billion people currently occupy land below this level.',
    desc:"<strong style=\"color:#dc2626\">IPCC 2300 high-end + tail risk.</strong> Van de Wal et al. 2022 puts 10.4m as a plausible high-end estimate for 2300 under continued high emissions. Most of the world's major river deltas become permanent shallow seas. The global economic and agricultural loss would be incalculable.",
    color:'#dc2626' },
  { value:20, label:'Multi-Millennial Partial Collapse', when:'~3000–5000 CE', emission:'Clark et al. 2016 Millennial',
    pop:'~3B', land:'~10%',
    cause:'Clark et al. 2016 (Nature Climate Change): multi-millennial consequences of 21st-century policy — projects 25–52m over 10,000 years from our current carbon budget',
    warning:"Clark et al. found that choices made by our generation will lock in sea-level rise affecting 1.3 billion people's land over 10,000 years. At 20m, coastal civilization as we know it is gone. No human institution has ever planned on this timescale.",
    desc:"<strong style=\"color:#b91c1c\">Multi-millennial collapse scenario.</strong> Clark et al. 2016 (<em>Nature Climate Change</em>) showed that under continued high emissions, sea level will rise 25–52m over the next 10,000 years — at rates comparable to the fastest deglaciation events in Earth's history. Our current ~580 PgC of cumulative emissions already commits roughly 20m+ over millennia.",
    color:'#b91c1c' },
  { value:58, label:'Full Antarctic Ice Sheet Eliminated', when:'Millennia — all fossil fuels burned', emission:'Winkelmann 2015 Worst Case',
    pop:'~5B', land:'~15%',
    cause:"Winkelmann et al. 2015 (Science Advances): combustion of all available fossil fuel resources eliminates the entire Antarctic Ice Sheet — +58m from Antarctica alone, ~70m total with Greenland",
    warning:"If humanity burns all known fossil fuel reserves, Winkelmann et al. calculate sufficient warming over millennia to eliminate Antarctica entirely — contributing 58m of sea level rise. Washington D.C., London, Paris, and thousands of coastal cities become seafloor. Most of human civilization has been built within 60m of sea level.",
    desc:"<strong style=\"color:#7f1d1d\">Civilizational endpoint.</strong> Winkelmann et al. 2015 (<em>Science Advances</em>) calculated that combustion of all available fossil fuel resources produces sufficient warming to eliminate the Antarctic Ice Sheet over millennia — adding 58m of sea level rise. Combined with Greenland's 7m, total rise approaches 65–70m. The continents would be fundamentally reshaped.",
    color:'#7f1d1d' }
];

const slLocations = [
  // 0.5m — existential risk now
  { name:'Maldives', lat:3.2, lon:73.2, threshold:0.5, pop:'500K', emoji:'🏝',
    desc:'Average elevation ~1.5m. Storm surges already flood inhabited islands regularly. Government purchasing land in Fiji for future relocation.' },
  { name:'Tuvalu & Kiribati', lat:-8, lon:179, threshold:0.5, pop:'110K', emoji:'🏝',
    desc:'Maximum elevation under 4m across entire island chain. Most land lost at 0.5–1m rise. Government of Tuvalu has declared it will cease to exist as a physical state.' },
  { name:'Marshall Islands', lat:7.1, lon:171.2, threshold:0.5, pop:'42K', emoji:'🏝',
    desc:'Most land below 2m above sea level. Capital Majuro already floods regularly at high tide.' },
  { name:'New Orleans', lat:29.95, lon:-90.07, threshold:0.5, pop:'1.4M', emoji:'🌊',
    desc:'Much of the city is already below sea level — protected only by aging levees. Even 0.5m additional rise dramatically increases storm-surge catastrophe risk.' },
  // 1m
  { name:'Miami Metro', lat:25.77, lon:-80.2, threshold:1, pop:'6.2M', emoji:'🌴',
    desc:'Average elevation ~1–2m on porous limestone karst. Tidal flooding already occurs on sunny days. Sea walls are useless as water rises through the ground.' },
  { name:'Ho Chi Minh City', lat:10.82, lon:106.63, threshold:1, pop:'9M', emoji:'🌊',
    desc:'Large portions below 1m elevation. The Mekong Delta — Vietnam\'s rice bowl — faces existential salinization and inundation at 1m+.' },
  { name:'Jakarta', lat:-6.21, lon:106.85, threshold:1, pop:'10M', emoji:'🏙',
    desc:'40% already below sea level; sinking 50–100mm/yr from groundwater extraction on top of sea level rise. Indonesia is relocating its capital.' },
  { name:'Bangladesh Delta', lat:22.5, lon:90.5, threshold:1, pop:'17M', emoji:'🌊',
    desc:'17 million people in coastal zones at direct risk. Cyclone storm surges increasingly catastrophic as the Bay of Bengal warms.' },
  { name:'Netherlands Coast', lat:52.37, lon:4.89, threshold:1, pop:'4.5M', emoji:'🌷',
    desc:'26% of Netherlands already below sea level — maintained only by constant pumping and dykes. 1m rise pushes the engineering challenge beyond current capacity.' },
  { name:'Shanghai', lat:31.22, lon:121.47, threshold:1, pop:'8M', emoji:'🏙',
    desc:'Low-lying Yangtze Delta. Urban land subsidence + sea level rise puts coastal districts at compounding flood risk.' },
  // 2m
  { name:'Bangkok', lat:13.75, lon:100.52, threshold:2, pop:'10.5M', emoji:'🏙',
    desc:'Average ~1.5m above MSL and sinking from groundwater extraction. Already floods seasonally; 2m rise makes much of the city permanently inundated.' },
  { name:'Mumbai', lat:19.08, lon:72.88, threshold:2, pop:'20M', emoji:'🏙',
    desc:'Low-lying coastal peninsula. Dharavi and coastal slums flood first; the entire city faces crisis-level flooding at 2m.' },
  { name:'London (Thames)', lat:51.5, lon:-0.12, threshold:2, pop:'3M', emoji:'🏛',
    desc:'The Thames Barrier provides temporary protection, but 2m overwhelms eastern London. Canary Wharf and the Thames estuary become permanently inundated.' },
  { name:'Alexandria', lat:31.2, lon:29.92, threshold:2, pop:'5.2M', emoji:'🏛',
    desc:'UNESCO warns that 30% of Alexandria is submerged at 0.5m of rise — and most of the historic city at 2m. Ancient Mediterranean civilization ends.' },
  { name:'Osaka Bay', lat:34.69, lon:135.5, threshold:2, pop:'8M', emoji:'🏙',
    desc:'Low-lying bay area; some wards already below sea level. Major urban and industrial infrastructure — including Kansai Airport — at existential risk.' },
  { name:'NYC (Lower Manhattan)', lat:40.71, lon:-74.01, threshold:2, pop:'3M', emoji:'🗽',
    desc:'Lower Manhattan, Red Hook, Hoboken face repeated severe flooding. Superstorm Sandy (2012) previewed what 2m of mean rise makes routine.' },
  // 3m
  { name:'Tokyo Bay', lat:35.65, lon:139.77, threshold:3, pop:'9M', emoji:'🏙',
    desc:'Much of Tokyo Bay area below 3m. Koto ward and all reclaimed islands at extreme risk; Tokyo\'s flood defenses are designed for the old normal.' },
  { name:'Guangzhou Delta', lat:22.99, lon:113.31, threshold:3, pop:'15M', emoji:'🏭',
    desc:'Pearl River Delta — one of the world\'s most economically productive and most at-risk megadeltas per IPCC AR6.' },
  { name:'Venice', lat:45.44, lon:12.32, threshold:3, pop:'300K', emoji:'🛶',
    desc:'The MOSE barrier is operational but overwhelmed at 3m of sustained rise. UNESCO World Heritage city faces permanent submersion.' },
  { name:'US Mid-Atlantic Coast', lat:38.9, lon:-76.0, threshold:3, pop:'5M', emoji:'🌊',
    desc:'Washington D.C. area, Virginia Beach, Baltimore. Sea level here rises 3–4x the global average due to land subsidence — a double threat.' },
  // 5m
  { name:'South Florida', lat:26.5, lon:-81.0, threshold:5, pop:'21M', emoji:'🌴',
    desc:'Built on porous karst limestone — sea walls cannot stop groundwater infiltration from below. Most of Florida south of Orlando becomes permanently inundated.' },
  { name:'Nile Delta', lat:30.8, lon:31.2, threshold:5, pop:'30M', emoji:'🌾',
    desc:'One of the world\'s most densely populated and agriculturally critical deltas. 5m inundates most of it, destroying Egypt\'s breadbasket and displacing tens of millions.' },
  { name:'Eastern England', lat:52.7, lon:1.2, threshold:5, pop:'4M', emoji:'🌾',
    desc:'The Fens, Norfolk Broads, Humberside. Much of this historically reclaimed agricultural land returns to sea, with major food-security implications.' },
  { name:'N. Germany / Denmark', lat:54.5, lon:9.5, threshold:5, pop:'5M', emoji:'🌊',
    desc:'Hamburg low districts, Schleswig-Holstein coast, Wadden Sea islands. Much of Denmark\'s west coast and the North European Plain severely impacted.' },
  // 10m
  { name:'South Vietnam', lat:10.0, lon:106.0, threshold:10, pop:'20M', emoji:'🌾',
    desc:'Most of the Mekong Delta — Vietnam\'s rice bowl — submerged. 20 million people displaced from one of the world\'s most productive agricultural zones.' },
  { name:'Iraq / Kuwait Lowlands', lat:30.5, lon:47.5, threshold:10, pop:'5M', emoji:'🌊',
    desc:'Tigris-Euphrates delta and Gulf coast submerged. Ancient Mesopotamia — the cradle of civilization — returns permanently to water.' },
  { name:'N. Poland / Baltic Coast', lat:54.2, lon:18.0, threshold:10, pop:'3M', emoji:'🌊',
    desc:'Gdańsk, Szczecin, and the North European coastal plain. Broad swathes of Poland, Germany, and the Baltic states permanently inundated.' },
  { name:'Yangtze / East China', lat:31.0, lon:120.5, threshold:10, pop:'50M', emoji:'🏙',
    desc:'Much of the Yangtze Delta — including core Shanghai and surrounding Jiangsu and Zhejiang provinces — submerged under 10m of rise.' },
  // 20m
  { name:'Mississippi Basin', lat:30.2, lon:-90.5, threshold:20, pop:'8M', emoji:'🌊',
    desc:'A vast inland sea fills the lower Mississippi Basin. Coastal penetration reaches hundreds of km inland. New Orleans and Baton Rouge are gone entirely.' },
  { name:'Amazon Estuary', lat:-2.0, lon:-51.0, threshold:20, pop:'2M', emoji:'🌿',
    desc:'The Amazon floodplain greatly expanded. Belém and surrounding lowlands submerged. Massive ecosystem and freshwater disruption.' },
  // 58m
  { name:'Washington D.C.', lat:38.9, lon:-77.04, threshold:58, pop:'700K', emoji:'🏛',
    desc:'Much of D.C. submerged. At 58m the US East Coast loses enormous swaths of land — the Atlantic reaches well inland toward the Appalachians.' },
  { name:'London (Central)', lat:51.51, lon:-0.13, threshold:58, pop:'9M', emoji:'🎡',
    desc:'London\'s elevation of ~10–15m provides safety until extreme scenarios. At 58m the entire Thames basin becomes a broad estuary — London becomes seafloor.' },
  { name:'Paris Basin', lat:48.86, lon:2.35, threshold:58, pop:'12M', emoji:'🗼',
    desc:'Paris sits at ~35m — safe until extreme scenarios. At 58m the Seine basin floods and the Atlantic encroaches far inland into France.' }
];

let slMapReady = false;

function initSeaLevelMap() {
  const svgEl = document.getElementById('sl-svg');
  if (!svgEl) return;
  const W = svgEl.parentElement.clientWidth || 700;
  const H = Math.round(W * 0.50);
  const svg = d3.select('#sl-svg').attr('viewBox', `0 0 ${W} ${H}`).attr('height', H);
  svg.selectAll('*').remove();
  slMapReady = false;

  svg.append('rect').attr('width', W).attr('height', H).attr('fill','#050c1a');

  const proj = d3.geoNaturalEarth1().scale(W / 6.28).translate([W / 2, H / 2]);
  const pathGen = d3.geoPath().projection(proj);

  d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(world => {
    const countries = topojson.feature(world, world.objects.countries);
    const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);

    svg.append('path').datum(d3.geoGraticule()())
      .attr('d', pathGen).attr('stroke','rgba(6,182,212,0.08)')
      .attr('fill','none').attr('stroke-width',0.4);

    svg.selectAll('.slc').data(countries.features).enter().append('path')
      .attr('class','slc').attr('d', pathGen)
      .attr('fill','#111e30').attr('stroke','none');

    svg.append('path').datum(borders).attr('d', pathGen)
      .attr('fill','none').attr('stroke','#1c2f45').attr('stroke-width',0.5);

    const idx = parseInt(document.getElementById('sl-slider').value, 10);
    const numVal = slScenarios[idx].value;
    const sc = slScenarios[idx];
    const tooltip = document.getElementById('sl-tip');

    slLocations.forEach((loc, i) => {
      const coords = proj([loc.lon, loc.lat]);
      if (!coords) return;
      const [x, y] = coords;
      const flooded = numVal >= loc.threshold;

      const g = svg.append('g')
        .attr('class', `sl-loc sl-loc-${i}`)
        .attr('transform', `translate(${x},${y})`)
        .style('cursor','pointer');

      // Outer pulse ring (always present, opacity changes)
      g.append('circle').attr('class','sl-ring')
        .attr('r', 10).attr('fill','none')
        .attr('stroke', sc.color).attr('stroke-width',1.5)
        .attr('opacity', flooded ? 0.45 : 0);

      // Core dot
      g.append('circle').attr('class','sl-dot')
        .attr('r', flooded ? 6 : 4)
        .attr('fill', flooded ? sc.color : '#1a2e42')
        .attr('stroke', flooded ? '#ffffff' : '#2a4255')
        .attr('stroke-width', flooded ? 1 : 0.8)
        .attr('opacity', flooded ? 0.92 : 0.55);

      g.on('mouseover', function(event) {
        tooltip.style.display = 'block';
        const px = Math.min(x + 12, W - 250);
        const py = Math.max(y - 60, 5);
        tooltip.style.left = px + 'px';
        tooltip.style.top = py + 'px';
        tooltip.innerHTML = `<strong style="color:${flooded ? sc.color : 'var(--text)'}">${loc.emoji} ${loc.name}</strong><br>` +
          `<span style="font-size:11px;color:${flooded ? '#f87171' : '#4ade80'}">${flooded ? '&#9888; INUNDATED at this level' : '&#10003; Above water at this level'}</span><br>` +
          `<span style="color:#94a3b8;font-size:11px">Population at risk: ${loc.pop}</span><br>` +
          `<span style="font-size:11px;color:var(--text2)">${loc.desc}</span>`;
      }).on('mouseout', function() {
        tooltip.style.display = 'none';
      });
    });

    slMapReady = true;
  }).catch(() => {
    svg.append('text').attr('x', W/2).attr('y', H/2)
      .attr('text-anchor','middle').attr('fill','#475569').attr('font-size',13)
      .text('Map unavailable — check connection');
  });
}

function updateSeaLevel(idx) {
  const sc = slScenarios[idx];
  const numVal = sc.value;
  const prevVal = idx > 0 ? slScenarios[idx - 1].value : -1;

  // Header
  document.getElementById('sl-value-display').textContent = '+' + numVal + 'm';
  document.getElementById('sl-value-display').style.color = sc.color;
  document.getElementById('sl-label-display').textContent = sc.label;
  document.getElementById('sl-pop-display').textContent = sc.pop;
  document.getElementById('sl-land-display').textContent = sc.land + ' global land';
  document.getElementById('sl-when-badge').textContent = sc.when;
  document.getElementById('sl-emission-badge').textContent = sc.emission;
  document.getElementById('sl-scenario-desc').innerHTML = sc.desc;

  // Sidebar
  document.getElementById('sl-stat-when').textContent = sc.when + ' — ' + sc.emission;
  document.getElementById('sl-stat-pop2').textContent = sc.pop;
  document.getElementById('sl-stat-land2').textContent = sc.land;
  document.getElementById('sl-stat-cause').textContent = sc.cause;
  document.getElementById('sl-warning-hd').style.color = sc.color;
  document.getElementById('sl-warning-box').style.borderColor = sc.color + '55';
  document.getElementById('sl-warning-text').textContent = sc.warning;

  // Map markers
  if (slMapReady) {
    slLocations.forEach((loc, i) => {
      const flooded = numVal >= loc.threshold;
      const g = d3.select('.sl-loc-' + i);
      if (g.empty()) return;
      g.select('.sl-ring')
        .attr('stroke', sc.color)
        .attr('opacity', flooded ? 0.45 : 0);
      g.select('.sl-dot')
        .attr('r', flooded ? 6 : 4)
        .attr('fill', flooded ? sc.color : '#1a2e42')
        .attr('stroke', flooded ? '#ffffff' : '#2a4255')
        .attr('stroke-width', flooded ? 1 : 0.8)
        .attr('opacity', flooded ? 0.92 : 0.55);
    });
  }

  // Cities row
  const newly = slLocations.filter(loc => numVal >= loc.threshold && prevVal < loc.threshold);
  const citiesRow = document.getElementById('sl-cities-row');
  const heading = document.getElementById('sl-cities-heading');

  if (newly.length > 0) {
    heading.textContent = 'Areas Newly Inundated at This Level (+' + numVal + 'm)';
    citiesRow.innerHTML = newly.map(loc =>
      `<div style="background:rgba(6,182,212,0.08);border:1px solid ${sc.color}55;border-radius:8px;padding:8px 13px;font-size:12px;line-height:1.4">` +
      `<span style="color:${sc.color};font-weight:600">${loc.emoji} ${loc.name}</span>` +
      `<span style="color:var(--text2);font-size:10px;display:block;margin-top:2px">Pop. at risk: ${loc.pop}</span>` +
      `</div>`
    ).join('');
  } else if (idx === 0) {
    heading.textContent = 'Already at Existential Risk at This Level (+' + numVal + 'm)';
    citiesRow.innerHTML = slLocations.filter(loc => numVal >= loc.threshold).map(loc =>
      `<div style="background:rgba(6,182,212,0.08);border:1px solid ${sc.color}55;border-radius:8px;padding:8px 13px;font-size:12px;line-height:1.4">` +
      `<span style="color:${sc.color};font-weight:600">${loc.emoji} ${loc.name}</span>` +
      `<span style="color:var(--text2);font-size:10px;display:block;margin-top:2px">Pop. at risk: ${loc.pop}</span>` +
      `</div>`
    ).join('');
  } else {
    heading.textContent = 'Newly Inundated at This Level';
    citiesRow.innerHTML = `<span style="font-size:12px;color:var(--text2);font-style:italic">Same regions as previous level — all prior areas now more severely flooded. Impacts worsen dramatically with each additional meter.</span>`;
  }
}

// Slider event
const slSlider = document.getElementById('sl-slider');
if (slSlider) {
  slSlider.addEventListener('input', function() {
    updateSeaLevel(parseInt(this.value, 10));
  });
}

// Init sea level map on load
window.addEventListener('load', () => {
  setTimeout(() => {
    initSeaLevelMap();
    updateSeaLevel(0);
  }, 300);
});

// Resize: re-init sea level map
window.addEventListener('resize', () => {
  clearTimeout(window._slResizeTimer);
  window._slResizeTimer = setTimeout(initSeaLevelMap, 350);
});

// Resize handling
let resizeTimer;
window.addEventListener('resize',()=>{
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initMap, 300);
});

// ─── NDC GAP CHART ────────────────────────────────────────────────────────────
(function(){
  const el = document.getElementById('chartNDCGap');
  if(!el) return;
  // Year labels 2020–2100 every 10yrs
  const yrs = [2020,2025,2026,2030,2040,2050,2060,2070,2080,2090,2100];
  const toXY = arr => arr.map(([x,y])=>({x,y}));
  // Current policies: 3.1°C by 2100 — approximately linear from 2026
  const curPol = toXY([[2020,1.2],[2026,1.55],[2030,1.75],[2040,2.2],[2050,2.55],[2060,2.75],[2070,2.90],[2080,3.00],[2090,3.05],[2100,3.10]]);
  // Full NDC implementation: ~2.5°C by 2100
  const fullNDC = toXY([[2020,1.2],[2026,1.55],[2030,1.65],[2040,1.95],[2050,2.15],[2060,2.28],[2070,2.37],[2080,2.43],[2090,2.48],[2100,2.50]]);
  // Net-zero pledges: ~1.9°C (peaks ~2050 then slowly declines)
  const netZero = toXY([[2020,1.2],[2026,1.55],[2030,1.65],[2040,1.80],[2050,1.92],[2060,1.95],[2070,1.93],[2080,1.92],[2090,1.91],[2100,1.90]]);
  // 1.5°C horizontal target
  const t15 = toXY([[2020,1.5],[2100,1.5]]);
  // 2°C horizontal target
  const t20 = toXY([[2020,2.0],[2100,2.0]]);

  new Chart(el.getContext('2d'), {
    type:'line',
    data:{datasets:[
      {label:'Current Policies (~3.1°C)',data:curPol,borderColor:'#ef4444',borderWidth:3,fill:false,tension:0.4,pointRadius:0,pointHoverRadius:5,pointBackgroundColor:'#ef4444'},
      {label:'Full NDC Implementation (~2.5°C)',data:fullNDC,borderColor:'#f97316',borderWidth:2.5,fill:false,tension:0.4,pointRadius:0,pointHoverRadius:5,pointBackgroundColor:'#f97316'},
      {label:'Net-Zero Pledges Kept (~1.9°C)',data:netZero,borderColor:'#f59e0b',borderWidth:2,fill:false,tension:0.4,pointRadius:0,pointHoverRadius:5,pointBackgroundColor:'#f59e0b'},
      {label:'2°C Paris Limit',data:t20,borderColor:'rgba(6,182,212,0.5)',borderWidth:1.5,borderDash:[6,4],fill:false,tension:0,pointRadius:0},
      {label:'1.5°C Paris Target',data:t15,borderColor:'rgba(34,197,94,0.5)',borderWidth:1.5,borderDash:[6,4],fill:false,tension:0,pointRadius:0},
    ]},
    options:{
      responsive:true,maintainAspectRatio:false,animation:{duration:600},
      interaction:{mode:'index',intersect:false},
      scales:{
        x:{...baseScaleOpts,type:'linear',min:2020,max:2100,
          title:{display:true,text:'Year',color:'#64748b',font:{size:11}},
          ticks:{color:'#94a3b8',maxTicksLimit:9,callback:v=>v%10===0?v:''}},
        y:{...baseScaleOpts,min:1.0,max:3.5,
          title:{display:true,text:'Warming above pre-industrial (°C)',color:'#64748b',font:{size:11}},
          ticks:{color:'#94a3b8',callback:v=>`+${v}°C`}}
      },
      plugins:{
        legend:{display:true,position:'top',labels:{boxWidth:14,padding:10,usePointStyle:true,color:'#94a3b8',font:{size:11}}},
        tooltip:{...baseTooltipOpts,callbacks:{
          title:items=>`Year ${Math.round(items[0].parsed.x)}`,
          label:item=>`${item.dataset.label}: +${item.parsed.y.toFixed(2)}°C`
        }}
      }
    }
  });
})();

// ─── ECONOMIC LOSS CHART ──────────────────────────────────────────────────────
(function(){
  const el = document.getElementById('chartEconLoss');
  if(!el) return;
  // Decade average losses (inflation-adjusted to 2024 USD, Munich Re)
  const labels = ['1980s','1990s','2000s','2010s','2020–2024'];
  const totalLoss = [55, 105, 170, 220, 270];  // avg annual total losses
  const insuredLoss = [13, 31, 57, 84, 115];   // avg annual insured losses
  const uninsured = totalLoss.map((t,i) => t - insuredLoss[i]);

  new Chart(el.getContext('2d'), {
    type:'bar',
    data:{
      labels,
      datasets:[
        {label:'Insured Losses',data:insuredLoss,backgroundColor:'rgba(59,130,246,0.7)',borderColor:'rgba(59,130,246,0.9)',borderWidth:1},
        {label:'Uninsured Losses',data:uninsured,backgroundColor:'rgba(239,68,68,0.6)',borderColor:'rgba(239,68,68,0.8)',borderWidth:1},
      ]
    },
    options:{
      responsive:true,maintainAspectRatio:false,animation:{duration:600},
      interaction:{mode:'index',intersect:false},
      scales:{
        x:{...baseScaleOpts,stacked:true,grid:{display:false},
          ticks:{color:'#94a3b8',font:{size:12}}},
        y:{...baseScaleOpts,stacked:true,min:0,max:350,
          title:{display:true,text:'Average annual losses (USD billions, 2024-adjusted)',color:'#64748b',font:{size:11}},
          ticks:{color:'#94a3b8',callback:v=>`$${v}B`}}
      },
      plugins:{
        legend:{display:true,position:'top',labels:{boxWidth:14,padding:12,usePointStyle:false,color:'#94a3b8',font:{size:11}}},
        tooltip:{...baseTooltipOpts,callbacks:{
          title:items=>`${items[0].label} — Decade Average`,
          label:item=>`${item.dataset.label}: $${item.parsed.y}B/yr`,
          afterBody:items=>{
            const i = items[0].dataIndex;
            return `Total: $${totalLoss[i]}B/yr avg`;
          }
        }}
      }
    },
    plugins:[{
      afterDraw(chart){
        const {ctx,data,chartArea,scales:{x,y}} = chart;
        ctx.save();
        // Label the 2024 actual value above the last bar
        const lastIdx = labels.length - 1;
        const xPos = x.getPixelForValue(lastIdx);
        const yPos = y.getPixelForValue(totalLoss[lastIdx]);
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillStyle = '#f87171';
        ctx.textAlign = 'center';
        ctx.fillText('avg $270B/yr', xPos, yPos - 22);
        ctx.fillText('2024: $320B', xPos, yPos - 9);
        ctx.restore();
      }
    }]
  });
})();

// ─── SCROLL SPY — highlight active nav link ───────────────────────────────
(function(){
  const sections = [
    {id:'synopsis',    el:null},
    {id:'atmosphere',  el:null},
    {id:'temperature', el:null},
    {id:'ocean',       el:null},
    {id:'sealevel',    el:null},
    {id:'map',         el:null},
    {id:'projections', el:null},
    {id:'ndcgap',      el:null},
    {id:'tipping',     el:null},
    {id:'compoundcrises', el:null},
    {id:'humanhealth', el:null},
    {id:'collapse',    el:null},
    {id:'carbonbudget',el:null},
    {id:'displacement',el:null},
    {id:'economicloss',el:null},
    {id:'feedbackloops',el:null},
    {id:'sources',     el:null},
  ];
  const navLinks = {};
  sections.forEach(s => {
    s.el = document.getElementById(s.id);
    const a = document.querySelector(`nav a[href="#${s.id}"]`);
    if(a) navLinks[s.id] = a;
  });

  let ticking = false;
  window.addEventListener('scroll', ()=>{
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(()=>{
      const scrollY = window.scrollY + 90;
      let active = sections[0].id;
      sections.forEach(s => {
        if(s.el && s.el.offsetTop <= scrollY) active = s.id;
      });
      Object.entries(navLinks).forEach(([id, a]) => {
        a.classList.toggle('nav-active', id === active);
      });
      ticking = false;
    });
  });
})();

