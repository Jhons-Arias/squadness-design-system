"use client";

import React, { useState } from "react";

// ── Components ────────────────────────────────────────────────────────────────
import { Checkbox, CheckboxStyles }                 from "./checkbox";
import { RadioGroup, RadioButton, RadioButtonStyles } from "./radio-button";
import { Switch, SwitchStyles }                     from "./switch";
import { Input, InputStyles }                       from "./input";
import { Textarea, TextareaStyles }                 from "./textarea";
import { Sidebar, SidebarStyles }                   from "./sidebar";
import { Pagination, PaginationStyles }             from "./pagination";
import { Button, IconButton, ButtonStyles }         from "./button";
import { Badge, BadgeStyles }                       from "./badge";
import { DateFilterDropdown, DateFilterDropdownStyles } from "./date-filter-dropdown";

// ── Inject all component CSS once ─────────────────────────────────────────────
const ALL_STYLES = [
  CheckboxStyles, RadioButtonStyles, SwitchStyles,
  InputStyles, TextareaStyles, SidebarStyles,
  PaginationStyles, ButtonStyles, BadgeStyles,
  DateFilterDropdownStyles,
].join("\n");

// ── Mini icons for demos ──────────────────────────────────────────────────────
const PlusIcon  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
const HomeIcon  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 7l6-5 6 5v7H2V7z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/></svg>;
const GridIcon  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/></svg>;
const MapIcon   = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 2l4 2 4-2v10l-4 2-4-2-4 2V4l4-2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/></svg>;
const TrashIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 5h10M6 5V3h4v2M5 5l.5 8h5L11 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const EditIcon  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/></svg>;

// ── Section wrapper ───────────────────────────────────────────────────────────
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="sq-showcase-section">
    <h2 className="sq-showcase-title">{title}</h2>
    <div className="sq-showcase-grid">{children}</div>
  </section>
);

const Group: React.FC<{ label: string; children: React.ReactNode; vertical?: boolean }> = ({ label, children, vertical }) => (
  <div className="sq-showcase-group">
    <span className="sq-showcase-group-label">{label}</span>
    <div className={`sq-showcase-group-content ${vertical ? "flex-column align-items-start" : ""} d-flex gap-3 flex-wrap align-items-center`}>
      {children}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ComponentShowcase
// ─────────────────────────────────────────────────────────────────────────────

export const ComponentShowcase: React.FC = () => {
  // ── State for interactive demos ──────────────────────────────────────────
  const [checkA, setCheckA] = useState(false);
  const [checkB, setCheckB] = useState(true);
  const [radioVal, setRadioVal] = useState("b");
  const [switchOn, setSwitchOn] = useState(false);
  const [switchLoading, setSwitchLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [taVal, setTaVal] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarActive, setSidebarActive] = useState("home");
  const [page, setPage] = useState(3);
  const [rows, setRows] = useState(10);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const handleSwitchLoading = () => {
    setSwitchLoading(true);
    setTimeout(() => {
      setSwitchOn((v) => !v);
      setSwitchLoading(false);
    }, 1800);
  };

  const navItems = [
    { id: "home", label: "Inicio", icon: <HomeIcon /> },
    {
      id: "inventory",
      label: "Inventario",
      icon: <GridIcon />,
      children: [
        { id: "inv-banos", label: "Baños Portátiles" },
        { id: "inv-equipos", label: "Equipos" },
        { id: "inv-rutas", label: "Rutas" },
      ],
    },
    { id: "map", label: "Mapa", icon: <MapIcon /> },
  ];

  return (
    <>
      {/* ── Global styles ────────────────────────────────────────────── */}
      <style>{ALL_STYLES}</style>
      <style>{SHOWCASE_STYLES}</style>

      <div className="sq-showcase">
        <header className="sq-showcase-header">
          <h1>Squadness Design System</h1>
          <p>Galería de componentes — todos los estados</p>
        </header>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  1. CHECKBOX                                                */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section title="1 · Checkbox">
          <Group label="Estados">
            <Checkbox label="Unselected" checked={false} />
            <Checkbox label="Selected" checked={true} />
            <Checkbox label="Indeterminate" checked="indeterminate" />
            <Checkbox label="Disabled unchecked" disabled />
            <Checkbox label="Disabled checked" checked={true} disabled />
          </Group>
          <Group label="Interactivo">
            <Checkbox
              label={checkA ? "Checked ✓" : "Click me"}
              checked={checkA}
              onCheckedChange={(v) => setCheckA(v === true)}
            />
            <Checkbox
              label="Con error"
              checked={checkB}
              onCheckedChange={(v) => setCheckB(v === true)}
              hasError
              helperText="Este campo es requerido"
            />
          </Group>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  2. RADIO BUTTON                                            */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section title="2 · Radio Button">
          <Group label="Estados" vertical>
            <RadioGroup value={radioVal} onValueChange={setRadioVal}>
              <RadioButton value="a" label="Opción A" />
              <RadioButton value="b" label="Opción B (seleccionado)" />
              <RadioButton value="c" label="Opción C — disabled" disabled />
            </RadioGroup>
          </Group>
          <Group label="Standalone">
            <RadioGroup value="">
              <RadioButton value="x" label="Unselected" />
            </RadioGroup>
            <RadioGroup value="y">
              <RadioButton value="y" label="Selected" />
            </RadioGroup>
          </Group>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  3. SWITCH                                                  */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section title="3 · Switch">
          <Group label="Estados">
            <Switch label="Off" checked={false} />
            <Switch label="On" checked={true} />
            <Switch label="Disabled off" disabled checked={false} />
            <Switch label="Disabled on" disabled checked={true} />
          </Group>
          <Group label="Interactivo">
            <Switch
              label={switchOn ? "Activado" : "Desactivado"}
              checked={switchOn}
              onCheckedChange={setSwitchOn}
            />
            <Switch
              label="Loading (click)"
              checked={switchOn}
              loading={switchLoading}
              onCheckedChange={handleSwitchLoading}
            />
          </Group>
          <Group label="Label positions">
            <Switch label="Light" labelPosition="left" checked={false} />
            <Switch label="Dark" labelPosition="right" checked={true} />
          </Group>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  4. INPUT                                                   */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section title="4 · Input">
          <Group label="Estados" vertical>
            <Input placeholder="Placeholder (empty)" label="Email" style={{ maxWidth: 280 }} />
            <Input value="valor ingresado" label="Filled" readOnly style={{ maxWidth: 280 }} />
            <Input
              label="Interactivo"
              placeholder="Escribe algo…"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{ maxWidth: 280 }}
            />
            <Input label="Success" state="success" value="john@example.com" successMessage="Email disponible" style={{ maxWidth: 280 }} readOnly />
            <Input label="Error" state="error" value="bad-email" errorMessage="Formato de email inválido" style={{ maxWidth: 280 }} readOnly />
            <Input label="Disabled" value="bloqueado@example.com" disabled style={{ maxWidth: 280 }} />
            <Input label="Read-only" value="readonly@example.com" readOnly style={{ maxWidth: 280 }} />
          </Group>
          <Group label="Sizes">
            <Input inputSize="sm" placeholder="Small" style={{ maxWidth: 180 }} />
            <Input inputSize="md" placeholder="Medium" style={{ maxWidth: 200 }} />
            <Input inputSize="lg" placeholder="Large" style={{ maxWidth: 220 }} />
          </Group>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  5. TEXTAREA                                                */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section title="5 · Textarea">
          <Group label="Estados" vertical>
            <Textarea placeholder="Escribe tu mensaje…" label="Mensaje" style={{ maxWidth: 360 }} />
            <Textarea
              label="Interactivo (200 chars)"
              placeholder="Escribe algo…"
              value={taVal}
              onChange={(e) => setTaVal(e.target.value)}
              maxLength={200}
              showCount
              style={{ maxWidth: 360 }}
            />
            <Textarea label="Error" state="error" errorMessage="El campo es requerido." value="" style={{ maxWidth: 360 }} readOnly />
            <Textarea label="Success" state="success" successMessage="Mensaje guardado." value="Texto validado correctamente." style={{ maxWidth: 360 }} readOnly />
            <Textarea label="Disabled" value="Contenido bloqueado" disabled style={{ maxWidth: 360 }} />
            <Textarea label="Read-only" value="No editable, sólo lectura" readOnly style={{ maxWidth: 360 }} />
          </Group>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  6. SIDEBAR                                                 */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section title="6 · Sidebar">
          <Group label={`Sidebar (${sidebarCollapsed ? "Collapsed" : "Expanded"})`}>
            <div style={{ height: 320, border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", display: "flex" }}>
              <Sidebar
                items={navItems}
                activeId={sidebarActive}
                collapsed={sidebarCollapsed}
                onCollapsedChange={setSidebarCollapsed}
                onItemClick={(item) => setSidebarActive(item.id)}
                logo={
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#374151" }}>
                    {sidebarCollapsed ? "SQ" : "Squadness"}
                  </span>
                }
              />
              <div style={{ padding: 20, fontSize: "0.8125rem", color: "#6b7280" }}>
                Activo: <strong>{sidebarActive}</strong>
              </div>
            </div>
          </Group>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  7. PAGINATION                                              */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section title="7 · Pagination">
          <Group label="Completa (con rows per page)" vertical>
            <Pagination
              currentPage={page}
              totalPages={10}
              totalItems={97}
              onPageChange={setPage}
              showRowsPerPage
              rowsPerPage={rows}
              onRowsPerPageChange={setRows}
              style={{ width: "100%", maxWidth: 680 } as React.CSSProperties}
            />
          </Group>
          <Group label="Compacta (solo páginas)">
            <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
            <Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />
            <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
          </Group>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  8. BUTTON & ICON BUTTON                                   */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section title="8 · Button & Icon Button">
          <Group label="Variantes">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </Group>
          <Group label="Estados">
            <Button variant="primary" startIcon={<PlusIcon />}>Con icono</Button>
            <Button variant="primary" loading>Loading</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="outline" loading>Guardando…</Button>
          </Group>
          <Group label="Tamaños">
            <Button variant="primary" size="xs">XS</Button>
            <Button variant="primary" size="sm">SM</Button>
            <Button variant="primary" size="md">MD</Button>
            <Button variant="primary" size="lg">LG</Button>
          </Group>
          <Group label="Icon Buttons">
            <IconButton aria-label="Add" icon={<PlusIcon />} variant="primary" />
            <IconButton aria-label="Edit" icon={<EditIcon />} variant="outline" />
            <IconButton aria-label="Delete" icon={<TrashIcon />} variant="danger" />
            <IconButton aria-label="Loading" icon={<PlusIcon />} loading variant="ghost" />
            <IconButton aria-label="Disabled" icon={<EditIcon />} disabled variant="ghost" />
          </Group>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  9. BADGE                                                   */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section title="9 · Badge">
          <Group label="Variantes semánticas">
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </Group>
          <Group label="Con dot">
            <Badge variant="success" dot>Activo</Badge>
            <Badge variant="warning" dot>Pendiente</Badge>
            <Badge variant="error" dot>Crítico</Badge>
            <Badge variant="neutral" dot>Inactivo</Badge>
          </Group>
          <Group label="Removable">
            <Badge variant="neutral" removable onRemove={() => alert("Removed!")}>React</Badge>
            <Badge variant="info" removable onRemove={() => alert("Removed!")}>TypeScript</Badge>
            <Badge variant="success" removable onRemove={() => alert("Removed!")}>Tailwind</Badge>
          </Group>
          <Group label="Tamaños">
            <Badge variant="primary" size="sm">SM Badge</Badge>
            <Badge variant="primary" size="md">MD Badge</Badge>
          </Group>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  10. DATE FILTER DROPDOWN                                   */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section title="10 · Date Filter Dropdown">
          <Group label="Single date">
            <DateFilterDropdown
              placeholder="Seleccionar fecha"
              value={selectedDate}
              onValueChange={setSelectedDate}
            />
            <DateFilterDropdown
              placeholder="Disabled"
              disabled
            />
          </Group>
          <Group label="Date range">
            <DateFilterDropdown
              mode="range"
              placeholder="Rango de fechas"
              range={dateRange}
              onRangeChange={setDateRange}
            />
          </Group>
          <Group label="Pre-filled">
            <DateFilterDropdown
              value={new Date(2026, 3, 25)}
              onValueChange={() => {}}
            />
          </Group>
        </Section>
      </div>
    </>
  );
};

// ─── Showcase-specific styles ─────────────────────────────────────────────────

const SHOWCASE_STYLES = `
  .sq-showcase {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #f9fafb;
    min-height: 100vh;
    padding: 32px 24px;
    max-width: 960px;
    margin: 0 auto;
  }

  .sq-showcase-header {
    margin-bottom: 40px;
  }

  .sq-showcase-header h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 4px;
  }

  .sq-showcase-header p {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
  }

  .sq-showcase-section {
    margin-bottom: 48px;
  }

  .sq-showcase-title {
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 20px;
  }

  .sq-showcase-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .sq-showcase-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sq-showcase-group-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .sq-showcase-group-content {
    padding: 16px;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }
`;

export default ComponentShowcase;
